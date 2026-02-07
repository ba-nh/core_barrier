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
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: '유효한 이메일 주소가 필요합니다' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 현재 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['이메일', '등록일시']);
    }
    
    // 현재 시간 (한국 시간)
    const now = new Date();
    const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
    const timestamp = Utilities.formatDate(koreaTime, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // 데이터 추가
    sheet.appendRow([email, timestamp]);
    
    // 성공 응답
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: '이메일이 성공적으로 등록되었습니다',
        timestamp: timestamp
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 오류 응답
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
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

