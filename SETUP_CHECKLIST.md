# 설정 확인 체크리스트

## ✅ 현재 설정 상태

### 1. Google Apps Script 코드 ✅
- `doPost` 함수: 올바르게 작성됨
- `doGet` 함수: 테스트용으로 작동 중
- 코드 구조: 정상

### 2. Vercel 서버리스 함수 ✅
- `api/submit-email.ts`: Google Apps Script 호출하도록 설정됨
- 오류 처리: 로깅 추가됨
- CORS 설정: 올바름

### 3. WaitlistModal ✅
- `useWeb3Forms = false`: Vercel 함수 사용 중
- `/api/submit-email` 호출: 올바름

## 🔍 확인해야 할 사항

### 필수 확인 사항

#### 1. Google Apps Script 배포 설정
- [ ] **배포** > **배포 관리** 클릭
- [ ] 배포 옆의 **연필 아이콘(편집)** 클릭
- [ ] **다음 사용자로 실행**: **나 자신** (본인 이메일)
- [ ] **액세스 권한**: **모든 사용자** ⚠️ (매우 중요!)
- [ ] **업데이트** 클릭
- [ ] 권한 승인 (처음 한 번만)

#### 2. Vercel 환경 변수 설정
- [ ] Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
- [ ] `GOOGLE_APPS_SCRIPT_URL` 변수 확인
- [ ] 값: `https://script.google.com/macros/s/AKfycbz-AJvy7FengtOszVFBfvZas9xO9og1K2--UZvXKloXxICeZedmfVdinAyRHc5XF0JY/exec`
- [ ] 환경: Production, Preview, Development 모두 체크
- [ ] **Save** 클릭
- [ ] **배포 다시 실행** (환경 변수 변경 후 필수!)

#### 3. Google Sheet 확인
- [ ] Google Sheet가 열려 있는지 확인
- [ ] 시트 이름 확인 (기본값: "Sheet1")
- [ ] Apps Script가 같은 Google Sheet에 연결되어 있는지 확인

## 🧪 테스트 방법

### 방법 1: 브라우저 콘솔에서 직접 테스트

1. 브라우저 개발자 도구 열기 (F12)
2. **Console** 탭 선택
3. 다음 코드 실행:

```javascript
fetch('https://script.google.com/macros/s/AKfycbz-AJvy7FengtOszVFBfvZas9xO9og1K2--UZvXKloXxICeZedmfVdinAyRHc5XF0JY/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'test@example.com' })
})
.then(res => res.text())
.then(text => {
  console.log('응답 텍스트:', text);
  try {
    const data = JSON.parse(text);
    console.log('성공:', data.success);
    console.log('메시지:', data.message || data.error);
    if (data.success) {
      console.log('✅ Google Sheet에 데이터가 추가되었습니다!');
    } else {
      console.error('❌ 오류:', data.error);
    }
  } catch (e) {
    console.error('JSON 파싱 오류:', e);
  }
})
.catch(err => console.error('요청 오류:', err));
```

**예상 결과:**
- 성공 시: `{"success":true,"message":"이메일이 성공적으로 등록되었습니다","timestamp":"2024-02-07 21:00:00"}`
- 실패 시: 오류 메시지 확인

### 방법 2: 웹사이트에서 테스트

1. 웹사이트 열기
2. 모달 열기 (버튼 클릭)
3. 이메일 입력 (예: `test@example.com`)
4. 제출 버튼 클릭
5. Google Sheet 확인

### 방법 3: Apps Script 로그 확인

1. Google Apps Script 편집기 열기
2. **보기** > **실행 로그** 클릭
3. 또는 **실행** > **doPost** 선택 후 **실행**
4. 로그에서 오류 확인

### 방법 4: Vercel 함수 로그 확인

1. Vercel 대시보드 → 프로젝트
2. **Functions** → **Logs** 클릭
3. `/api/submit-email` 함수 로그 확인
4. 오류 메시지 확인

## 🐛 일반적인 문제 해결

### 문제 1: "액세스 권한이 거부되었습니다"
**원인**: 배포 설정에서 "액세스 권한"이 "나 자신"으로 설정됨

**해결**:
1. 배포 > 배포 관리 > 편집
2. "액세스 권한"을 **모든 사용자**로 변경
3. 업데이트 클릭

### 문제 2: 데이터가 Google Sheet에 추가되지 않음
**원인**: Apps Script가 다른 Google Sheet에 연결됨

**해결**:
1. Apps Script 편집기에서 확인
2. 올바른 Google Sheet에 연결되어 있는지 확인
3. `SpreadsheetApp.getActiveSpreadsheet()`가 올바른 시트를 가리키는지 확인

### 문제 3: Vercel 함수에서 오류 발생
**원인**: 환경 변수가 설정되지 않음

**해결**:
1. Vercel 환경 변수 확인
2. `GOOGLE_APPS_SCRIPT_URL`이 올바르게 설정되었는지 확인
3. 배포 다시 실행

### 문제 4: CORS 오류
**원인**: Google Apps Script 배포 설정 문제

**해결**:
1. 배포 설정에서 "액세스 권한"을 "모든 사용자"로 변경
2. 배포 다시 생성

## 📋 전체 플로우 확인

```
사용자 입력
  ↓
WaitlistModal (useWeb3Forms = false)
  ↓
/api/submit-email (Vercel 서버리스 함수)
  ↓
Google Apps Script (웹 앱 URL)
  ↓
Google Sheet (데이터 추가)
```

각 단계에서 로그를 확인하여 어디서 문제가 발생하는지 파악하세요.

