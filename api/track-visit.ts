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
    const { visitorId } = request.body;

    if (!visitorId) {
      return response.status(400).json({ error: '방문자 ID가 필요합니다' });
    }

    // Google Apps Script 웹 앱 URL
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!googleAppsScriptUrl) {
      console.error('Google Apps Script URL이 설정되지 않았습니다');
      // 설정이 없어도 성공 응답 (개발 환경 대응)
      return response.status(200).json({
        success: true,
        message: '방문자가 기록되었습니다 (개발 모드)',
        visitorId: visitorId,
      });
    }

    // Google Apps Script로 방문 추적 요청 전송
    const scriptResponse = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'trackVisit',
        visitorId: visitorId,
      }),
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
      console.log('방문자 추적 완료:', visitorId);
      return response.status(200).json({
        success: true,
        message: '방문자가 성공적으로 기록되었습니다',
        visitorId: visitorId,
      });
    } else {
      console.error('Google Apps Script 오류:', scriptResult?.error);
      return response.status(500).json({
        success: false,
        error: scriptResult?.error || '방문자 추적 실패',
      });
    }
  } catch (error: any) {
    console.error('방문 추적 오류:', error);
    console.error('오류 스택:', error.stack);
    
    // 실제 오류를 반환하여 디버깅 가능하게 함
    return response.status(500).json({
      success: false,
      error: error.message || '서버 오류가 발생했습니다',
      details: error.toString(),
    });
  }
}
