/**
 * Google Apps Script 코드
 * 
 * 사용 방법:
 * 1. Google Sheet를 엽니다
 * 2. 확장 프로그램 > Apps Script 클릭
 * 3. 아래 코드를 붙여넣습니다
 * 4. 저장 후 배포 > 새 배포 클릭
 * 5. 유형: 웹 앱 선택
 * 6. 다음 사용자로 실행: 나 자신
 * 7. 액세스 권한: 모든 사용자
 * 8. 배포 클릭
 * 9. 웹 앱 URL 복사 (이 URL을 Vercel 환경 변수에 추가)
 */

function doPost(e) {
  try {
    // 로깅 추가
    Logger.log('doPost 호출됨');
    Logger.log('postData:', e.postData);
    Logger.log('postData.contents:', e.postData ? e.postData.contents : '없음');
    
    // 요청 데이터 파싱
    if (!e.postData || !e.postData.contents) {
      Logger.log('postData가 없습니다');
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: '요청 데이터가 없습니다' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    const action = data.action; // 'trackVisit' 또는 'submitEmail'
    const visitorId = data.visitorId;
    const email = data.email;
    const survey = data.survey || {};
    
    Logger.log('액션:', action);
    Logger.log('방문자 ID:', visitorId);
    Logger.log('이메일:', email);
    Logger.log('설문 조사 데이터:', survey);
    
    // 현재 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log('시트 이름:', sheet.getName());
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '방문자 ID',
        '방문 시간',
        '이메일',
        '등록일시',
        '소속 기관 유형',
        '연구 분야',
        '연구팀 규모',
        '관심도',
        '추가 의견'
      ]);
      Logger.log('헤더 추가됨');
    }
    
    // 현재 시간 (한국 시간)
    const now = new Date();
    const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    const timestamp = Utilities.formatDate(koreaTime, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    Logger.log('타임스탬프:', timestamp);
    
    // 방문자 ID로 기존 행 찾기
    const visitorIdColumn = 1; // A열이 방문자 ID
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let existingRowIndex = -1;
    
    // 헤더를 제외하고 방문자 ID 검색 (2행부터)
    for (let i = 1; i < values.length; i++) {
      if (values[i][visitorIdColumn - 1] === visitorId) {
        existingRowIndex = i + 1; // 시트 행 번호는 1부터 시작
        Logger.log('기존 방문자 발견, 행 번호:', existingRowIndex);
        break;
      }
    }
    
    // 액션에 따라 처리
    if (action === 'trackVisit') {
      // 방문 카운트
      if (existingRowIndex > 0) {
        // 이미 존재하는 방문자면 업데이트하지 않음 (중복 방지)
        Logger.log('이미 존재하는 방문자, 업데이트하지 않음:', visitorId);
        return ContentService.createTextOutput(
          JSON.stringify({ 
            success: true, 
            message: '방문자가 이미 기록되었습니다',
            visitorId: visitorId
          })
        ).setMimeType(ContentService.MimeType.JSON);
      } else {
        // 새 방문자 추가
        sheet.appendRow([
          visitorId,
          timestamp,
          '', // 이메일 (나중에 업데이트)
          '', // 등록일시 (나중에 업데이트)
          '', // 소속 기관 유형
          '', // 연구 분야
          '', // 연구팀 규모
          '', // 관심도
          ''  // 추가 의견
        ]);
        Logger.log('새 방문자 추가 완료:', visitorId, timestamp);
        return ContentService.createTextOutput(
          JSON.stringify({ 
            success: true, 
            message: '방문자가 성공적으로 기록되었습니다',
            visitorId: visitorId,
            timestamp: timestamp
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    } else if (action === 'submitEmail') {
      // 이메일/설문조사 제출
      if (!visitorId) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: '방문자 ID가 필요합니다' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (!email || !email.includes('@')) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: '유효한 이메일 주소가 필요합니다' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (existingRowIndex > 0) {
        // 기존 방문자 행 업데이트
        const hasSurvey = survey && Object.keys(survey).length > 0;
        
        if (hasSurvey) {
          // 이메일 + 설문조사 업데이트
          sheet.getRange(existingRowIndex, 3, 1, 7).setValues([[
            email, // 이메일
            timestamp, // 등록일시
            survey.organizationType || '',
            survey.researchField || '',
            survey.teamSize || '',
            survey.interestLevel || '',
            survey.additionalInfo || ''
          ]]);
          Logger.log('기존 방문자 행 업데이트 완료 (이메일 + 설문조사):', visitorId, email);
        } else {
          // 이메일만 업데이트
          sheet.getRange(existingRowIndex, 3, 1, 2).setValues([[
            email, // 이메일
            timestamp // 등록일시
          ]]);
          Logger.log('기존 방문자 행 업데이트 완료 (이메일만):', visitorId, email);
        }
      } else {
        // 방문자 ID가 없으면 새 행 추가 (이상한 경우지만 처리)
        const hasSurvey = survey && Object.keys(survey).length > 0;
        if (hasSurvey) {
          sheet.appendRow([
            visitorId,
            timestamp, // 방문 시간
            email,
            timestamp, // 등록일시
            survey.organizationType || '',
            survey.researchField || '',
            survey.teamSize || '',
            survey.interestLevel || '',
            survey.additionalInfo || ''
          ]);
        } else {
          sheet.appendRow([
            visitorId,
            timestamp, // 방문 시간
            email,
            timestamp, // 등록일시
            '', '', '', '', ''
          ]);
        }
        Logger.log('새 행 추가 완료 (방문자 ID 없음):', visitorId, email);
      }
      
      return ContentService.createTextOutput(
        JSON.stringify({ 
          success: true, 
          message: '이메일이 성공적으로 등록되었습니다',
          timestamp: timestamp
        })
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: '알 수 없는 액션: ' + action })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    // 오류 로깅
    Logger.log('오류 발생:', error.toString());
    Logger.log('오류 스택:', error.stack);
    
    // 오류 응답
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString(),
        stack: error.stack
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 테스트용 (선택사항)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      message: 'Google Apps Script is running',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
