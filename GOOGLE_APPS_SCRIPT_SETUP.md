# Google Apps Script를 활용한 Google Sheets 연동 가이드

이 방법은 Service Account를 만들 필요 없이 Google Apps Script를 사용하여 더 간단하게 Google Sheets에 데이터를 저장할 수 있습니다.

## 장점

- ✅ Service Account 생성 불필요
- ✅ Google Cloud Console 설정 최소화
- ✅ 설정이 매우 간단
- ✅ 무료로 사용 가능

## 1단계: Google Sheet 준비

1. Google Sheets에서 새 스프레드시트 생성
2. 첫 번째 행에 헤더 추가 (선택사항 - 스크립트가 자동으로 추가합니다)
   - A1: "이메일"
   - B1: "등록일시"

## 2단계: Google Apps Script 작성

1. Google Sheet에서 **확장 프로그램** > **Apps Script** 클릭
2. 기본 코드를 모두 삭제하고 `google-apps-script.js` 파일의 내용을 복사하여 붙여넣기
3. **저장** 클릭 (Ctrl+S 또는 Cmd+S)
4. 프로젝트 이름 지정 (예: "Email Collection Script")

## 3단계: Apps Script 배포

1. Apps Script 편집기에서 **배포** > **새 배포** 클릭
2. **유형 선택** 옆의 톱니바퀴 아이콘 클릭 > **웹 앱** 선택
3. 배포 설정:
   - **설명**: "Email Collection Web App" (선택사항)
   - **다음 사용자로 실행**: **나 자신** (본인의 이메일)
   - **액세스 권한**: **모든 사용자** (중요!)
4. **배포** 클릭
5. 권한 승인 요청이 나타나면:
   - **권한 검토** 클릭
   - Google 계정 선택
   - **고급** 클릭
   - **(프로젝트 이름)(으)로 이동** 클릭
   - **허용** 클릭
6. 배포 완료 후 **웹 앱 URL** 복사
   - 예: `https://script.google.com/macros/s/AKfycby.../exec`

## 4단계: Vercel 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:

   **GOOGLE_APPS_SCRIPT_URL**
   - Value: 3단계에서 복사한 웹 앱 URL
   - 예: `https://script.google.com/macros/s/AKfycby.../exec`

4. 환경 선택:
   - Production ✅
   - Preview ✅
   - Development ✅
5. **Save** 클릭
6. **배포 다시 실행** (환경 변수 변경 후 재배포 필요)

## 5단계: 테스트

### Apps Script 직접 테스트

1. Apps Script 편집기에서 `doPost` 함수 선택
2. **실행** 클릭
3. 권한 승인 (처음 한 번만)
4. 로그 확인

또는 브라우저에서 GET 요청으로 테스트:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 웹사이트에서 테스트

1. 웹사이트에서 모달 열기
2. 이메일 입력 후 제출
3. Google Sheet에서 데이터가 추가되었는지 확인

## Google Sheet 구조

스크립트가 자동으로 다음 구조로 데이터를 추가합니다:

| A (이메일) | B (등록일시) |
|-----------|-------------|
| 이메일 | 등록일시 |
| user@example.com | 2024-02-07 20:30:15 |
| another@example.com | 2024-02-07 20:31:22 |

## 문제 해결

### 오류: "액세스 권한이 거부되었습니다"
- Apps Script 배포 시 "액세스 권한"을 **모든 사용자**로 설정했는지 확인
- 배포를 다시 만들고 권한을 확인하세요

### 오류: "스크립트가 너무 오래 실행되었습니다"
- Apps Script 실행 시간 제한이 있습니다 (6분)
- 일반적으로 이메일 추가는 1초 이내이므로 문제없습니다
- 만약 문제가 발생하면 Apps Script를 최적화하세요

### 데이터가 추가되지 않음
- Vercel 함수 로그 확인 (Vercel 대시보드 → Functions → Logs)
- Apps Script 실행 로그 확인 (Apps Script 편집기 → 실행 → 로그 보기)
- GOOGLE_APPS_SCRIPT_URL 환경 변수가 올바른지 확인

### CORS 오류
- Google Apps Script는 CORS를 자동으로 처리합니다
- 만약 문제가 발생하면 Apps Script에서 `doPost` 함수가 올바르게 반환하는지 확인

## 보안 참고사항

- 웹 앱 URL은 공개되어 있지만, Apps Script에서 추가 검증을 추가할 수 있습니다
- 예: 특정 도메인에서만 요청 허용
- 예: API 키 검증 추가

### API 키 추가 (선택사항)

Apps Script에 API 키 검증을 추가하려면:

```javascript
function doPost(e) {
  // API 키 검증
  const apiKey = e.parameter.apiKey || JSON.parse(e.postData.contents).apiKey;
  const validApiKey = 'YOUR_SECRET_API_KEY'; // 환경 변수로 설정
  
  if (apiKey !== validApiKey) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: 'Unauthorized' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // ... 나머지 코드
}
```

그리고 Vercel 서버리스 함수에서:
```typescript
body: JSON.stringify({ 
  email,
  apiKey: process.env.APPS_SCRIPT_API_KEY 
}),
```

## 기존 Service Account 방식과 비교

| 항목 | Apps Script | Service Account |
|------|------------|-----------------|
| 설정 복잡도 | ⭐ 매우 간단 | ⭐⭐⭐ 복잡 |
| Google Cloud 설정 | 불필요 | 필요 |
| Service Account | 불필요 | 필요 |
| 코드 복잡도 | 간단 | 복잡 |
| 패키지 의존성 | 없음 | googleapis 필요 |
| 실행 시간 제한 | 6분 | 없음 |
| 무료 사용량 | 충분 | 충분 |

Apps Script 방식이 더 간단하고 추천합니다!

