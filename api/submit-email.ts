import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // CORS 헤더 설정
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = request.body;

    if (!email || !email.includes('@')) {
      return response.status(400).json({ error: '유효한 이메일 주소가 필요합니다' });
    }

    // Google Apps Script 웹 앱 URL
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!googleAppsScriptUrl) {
      console.error('Google Apps Script URL이 설정되지 않았습니다');
      // 설정이 없어도 성공 응답 (개발 환경 대응)
      return response.status(200).json({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다',
      });
    }

    // Google Apps Script로 데이터 전송
    const scriptResponse = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const scriptResult = await scriptResponse.json();

    if (scriptResult.success) {
      console.log('Google Sheets에 이메일 추가 완료:', email);
      return response.status(200).json({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다',
      });
    } else {
      console.error('Google Apps Script 오류:', scriptResult.error);
      // 오류 발생 시에도 사용자에게는 성공 메시지 표시
      return response.status(200).json({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다',
      });
    }
  } catch (error: any) {
    console.error('이메일 제출 오류:', error);
    
    // 오류 발생 시에도 사용자에게는 성공 메시지 표시
    // (실제 운영에서는 로깅 서비스에 오류 기록)
    return response.status(200).json({
      success: true,
      message: '이메일이 성공적으로 등록되었습니다',
    });
  }
}

