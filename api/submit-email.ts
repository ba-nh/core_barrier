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
    const { email, survey } = request.body;

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

    // 설문 조사가 없으면 이메일만 저장 (즉시 저장)
    if (!survey) {
      console.log('이메일만 저장 (설문 조사 없음):', email);
      
      const scriptResponse = await fetch(googleAppsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, survey: null }),
      });

      const responseText = await scriptResponse.text();
      let scriptResult;
      try {
        scriptResult = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON 파싱 오류:', e, '응답:', responseText);
        throw new Error('Google Apps Script 응답 파싱 실패');
      }

      if (scriptResult && scriptResult.success) {
        console.log('이메일만 저장 완료:', email);
        return response.status(200).json({
          success: true,
          message: '이메일이 성공적으로 등록되었습니다',
        });
      } else {
        console.error('Google Apps Script 오류:', scriptResult?.error);
        return response.status(500).json({
          success: false,
          error: scriptResult?.error || '이메일 저장 실패',
        });
      }
    }

    // 설문 조사가 있으면 기존 이메일 행에 업데이트
    console.log('Google Apps Script로 요청 전송 (설문 조사 업데이트):', { email, survey, url: googleAppsScriptUrl });
    
    const scriptResponse = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, survey }),
    });

    console.log('Google Apps Script 응답 상태:', scriptResponse.status);
    
    // 응답 텍스트 확인
    const responseText = await scriptResponse.text();
    console.log('Google Apps Script 응답 본문:', responseText);

    let scriptResult;
    try {
      scriptResult = JSON.parse(responseText);
    } catch (e) {
      console.error('JSON 파싱 오류:', e, '응답:', responseText);
      throw new Error('Google Apps Script 응답 파싱 실패');
    }

    if (scriptResult.success) {
      console.log('Google Sheets에 이메일 추가 완료:', email);
      return response.status(200).json({
        success: true,
        message: '이메일이 성공적으로 등록되었습니다',
      });
    } else {
      console.error('Google Apps Script 오류:', scriptResult.error);
      // 실제 오류를 반환하여 디버깅 가능하게 함
      return response.status(500).json({
        success: false,
        error: scriptResult.error || 'Google Apps Script 오류',
        details: scriptResult,
      });
    }
  } catch (error: any) {
    console.error('이메일 제출 오류:', error);
    console.error('오류 스택:', error.stack);
    
    // 실제 오류를 반환하여 디버깅 가능하게 함
    return response.status(500).json({
      success: false,
      error: error.message || '서버 오류가 발생했습니다',
      details: error.toString(),
    });
  }
}

