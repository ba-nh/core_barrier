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
    const email = data.email;
    const survey = data.survey || {};
    
    Logger.log('파싱된 이메일:', email);
    Logger.log('설문 조사 데이터:', survey);
    
    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      Logger.log('유효하지 않은 이메일:', email);
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: '유효한 이메일 주소가 필요합니다' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 현재 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log('시트 이름:', sheet.getName());
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
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
    
    // 이메일로 기존 행 찾기
    const emailColumn = 1; // A열이 이메일
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let existingRowIndex = -1;
    
    // 헤더를 제외하고 이메일 검색 (2행부터)
    for (let i = 1; i < values.length; i++) {
      if (values[i][emailColumn - 1] === email) {
        existingRowIndex = i + 1; // 시트 행 번호는 1부터 시작
        Logger.log('기존 이메일 발견, 행 번호:', existingRowIndex);
        break;
      }
    }
    
    // 설문 조사가 있으면 기존 행 업데이트, 없으면 새 행 추가
    if (survey && Object.keys(survey).length > 0) {
      // 설문 조사 데이터가 있음
      if (existingRowIndex > 0) {
        // 기존 행 업데이트 (이메일과 등록일시는 유지, 설문 조사만 업데이트)
        sheet.getRange(existingRowIndex, 3, 1, 5).setValues([[
          survey.organizationType || '',
          survey.researchField || '',
          survey.teamSize || '',
          survey.interestLevel || '',
          survey.additionalInfo || ''
        ]]);
        Logger.log('기존 행 업데이트 완료 (설문 조사 추가):', email, existingRowIndex);
      } else {
        // 이메일이 없으면 새 행 추가 (이메일 + 설문 조사)
        sheet.appendRow([
          email, 
          timestamp,
          survey.organizationType || '',
          survey.researchField || '',
          survey.teamSize || '',
          survey.interestLevel || '',
          survey.additionalInfo || ''
        ]);
        Logger.log('새 행 추가 완료 (이메일 + 설문 조사):', email, timestamp);
      }
    } else {
      // 설문 조사가 없으면 이메일만 저장
      if (existingRowIndex > 0) {
        // 이미 존재하는 이메일이면 업데이트하지 않음 (중복 방지)
        Logger.log('이미 존재하는 이메일, 업데이트하지 않음:', email);
      } else {
        // 새 행 추가 (이메일만)
        sheet.appendRow([
          email, 
          timestamp,
          '', // 소속 기관 유형
          '', // 연구 분야
          '', // 연구팀 규모
          '', // 관심도
          ''  // 추가 의견
        ]);
        Logger.log('이메일만 저장 완료 (새 행 추가):', email, timestamp);
      }
    }
    
    // 성공 응답
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: '이메일이 성공적으로 등록되었습니다',
        timestamp: timestamp
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
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

