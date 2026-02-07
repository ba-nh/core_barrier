# Google Sheets 연동 설정 가이드

이 가이드는 Vercel 서버리스 함수를 통해 Google Sheets에 이메일을 자동으로 저장하는 방법을 설명합니다.

## 1단계: Google Cloud Console 설정

### 1. 프로젝트 생성
1. https://console.cloud.google.com/ 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 이름 입력 (예: "Core Barrier Email Collection")

### 2. Google Sheets API 활성화
1. Google Cloud Console → "API 및 서비스" → "라이브러리"
2. "Google Sheets API" 검색
3. "사용 설정" 클릭

### 3. Service Account 생성
1. "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "서비스 계정"
3. 서비스 계정 이름 입력 (예: "sheets-writer")
4. "만들기" 클릭
5. 역할은 선택하지 않고 넘어가기
6. "완료" 클릭

### 4. Service Account 키 생성
1. 생성된 서비스 계정 클릭
2. "키" 탭 → "키 추가" → "새 키 만들기"
3. 키 유형: "JSON" 선택
4. "만들기" 클릭 → JSON 파일이 다운로드됨

### 5. Google Sheet 생성 및 공유
1. Google Sheets에서 새 스프레드시트 생성
2. 첫 번째 행에 헤더 추가 (예: A1: "이메일", B1: "등록일시")
3. 스프레드시트 URL에서 Sheet ID 추출
   - URL 예: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - `1ABC123...` 부분이 Sheet ID입니다
4. 스프레드시트 공유 설정:
   - "공유" 버튼 클릭
   - Service Account의 이메일 주소 추가 (JSON 파일의 `client_email` 필드)
   - 권한: "편집자"로 설정
   - "완료" 클릭

## 2단계: Vercel 환경 변수 설정

### 1. Service Account JSON 변환
다운로드한 JSON 파일의 내용을 한 줄로 변환해야 합니다:

**방법 1: 온라인 도구 사용**
- https://www.jsonformatter.org/json-minify/ 같은 도구 사용
- JSON 파일 내용을 붙여넣고 Minify 클릭

**방법 2: PowerShell 사용 (Windows)**
```powershell
$json = Get-Content "path/to/service-account.json" -Raw | ConvertFrom-Json | ConvertTo-Json -Compress
$json
```

### 2. Vercel 환경 변수 추가
1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. 다음 변수 추가:

   **GOOGLE_SHEET_ID**
   - Value: Google Sheets의 Sheet ID (예: `1ABC123...`)

   **GOOGLE_SERVICE_ACCOUNT**
   - Value: Service Account JSON (한 줄로 변환된 전체 내용)
   - 예시:
     ```json
     {"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"sheets-writer@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
     ```

### 3. 환경 변수 적용
- 각 환경 변수에 대해 "Production", "Preview", "Development" 모두 선택
- "Save" 클릭
- 배포 다시 실행 (환경 변수 변경 후 재배포 필요)

## 3단계: Google Sheet 구조

Google Sheet는 다음과 같은 구조로 설정하세요:

| A (이메일) | B (등록일시) |
|-----------|-------------|
| 이메일 | 등록일시 |
| user@example.com | 2024-02-07 20:30:15 |

첫 번째 행은 헤더로 사용되며, 실제 데이터는 두 번째 행부터 추가됩니다.

## 4단계: 테스트

1. 웹사이트에서 모달 열기
2. 이메일 입력 후 제출
3. Google Sheet에서 데이터가 추가되었는지 확인

## 문제 해결

### 오류: "The caller does not have permission"
- Service Account가 Google Sheet에 공유되어 있는지 확인
- 권한이 "편집자"로 설정되어 있는지 확인

### 오류: "Requested entity was not found"
- GOOGLE_SHEET_ID가 올바른지 확인
- Sheet ID는 URL에서 `/d/` 다음 부분입니다

### 데이터가 추가되지 않음
- Vercel 함수 로그 확인 (Vercel 대시보드 → Functions → Logs)
- 환경 변수가 올바르게 설정되었는지 확인
- Service Account JSON이 올바르게 한 줄로 변환되었는지 확인

## 보안 참고사항

- Service Account JSON은 절대 Git에 커밋하지 마세요
- `.gitignore`에 `*.json` 파일 추가 권장
- 환경 변수는 Vercel 대시보드에서만 관리하세요

