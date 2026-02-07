# 이메일 수집 기능 설정 가이드

## 방법 1: Web3Forms 사용 (추천 - 가장 간단)

### 설정 단계:
1. https://web3forms.com 에서 무료 계정 생성
2. 대시보드에서 Access Key 발급 받기
3. 프로젝트 루트에 `.env` 파일 생성 (이미 있다면 추가):
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
4. `components/WaitlistModal.tsx`에서 `useWeb3Forms = true`로 설정되어 있는지 확인

### 장점:
- ✅ 무료 (월 250건까지)
- ✅ 설정이 매우 간단
- ✅ 스팸 방지 내장
- ✅ 이메일로 자동 전송 가능

---

## 방법 2: Vercel 서버리스 함수 사용

### 설정 단계:
1. `components/WaitlistModal.tsx`에서 `useWeb3Forms = false`로 변경
2. `api/submit-email.ts` 파일에서 실제 저장 로직 구현
   - Google Sheets 연동
   - 데이터베이스 저장
   - 이메일 서비스 연동 (SendGrid, Resend 등)
   - Airtable, Notion 등 서비스 연동

### 예시: Google Sheets에 저장하기
1. Google Apps Script로 웹훅 생성
2. `api/submit-email.ts`에서 해당 웹훅으로 POST 요청

### 예시: 이메일로 전송하기
```typescript
// Resend 사용 예시
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'your-email@example.com',
  subject: '새로운 이메일 등록',
  html: `<p>이메일: ${email}</p>`,
});
```

### 장점:
- ✅ 완전한 제어 가능
- ✅ 커스터마이징 자유도 높음
- ✅ 다양한 서비스 연동 가능

---

## 환경 변수 설정

Vercel에 배포할 때:
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. `VITE_WEB3FORMS_ACCESS_KEY` 추가 (방법 1 사용 시)

---

## 테스트

로컬에서 테스트:
```bash
npm run dev
```

빌드 테스트:
```bash
npm run build
```

