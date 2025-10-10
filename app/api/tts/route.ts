// Proxy for Kokoro TTS API to avoid CORS issues
import { NextResponse } from 'next/server';

const KOKORO_API_BASE = 'https://kokoro.lancesmith.cc/api/v1';

export async function POST(request: Request) {
  try {
    const { text, voice = 'am_santa', speed = 1, model = 'model_q8f16' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_KOKORO_API_KEY;

    if (!apiKey) {
      console.error('NEXT_PUBLIC_KOKORO_API_KEY not set');
      return NextResponse.json({ error: 'TTS service not configured' }, { status: 503 });
    }

    console.log('🎙️ Proxying Kokoro TTS request:', { text, voice, speed });

    // Call Kokoro API from server-side (no CORS issues)
    const response = await fetch(`${KOKORO_API_BASE}/audio/speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        response_format: 'mp3',
        speed,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Kokoro API error:', response.status, errorText);
      return NextResponse.json(
        { error: `TTS API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the audio blob
    const audioBlob = await response.blob();
    
    console.log('✅ Kokoro TTS generated successfully');

    // Return the audio with proper headers
    return new NextResponse(audioBlob, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBlob.size.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('❌ TTS proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

