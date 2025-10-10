// Kokoro TTS Integration
// Generates AI voice using your Kokoro API at kokoro.lancesmith.cc

const KOKORO_API_BASE = 'https://kokoro.lancesmith.cc/api/v1';

export interface KokoroVoiceOptions {
  text: string;
  voice?: string; // e.g., "am_michael" for tough mob boss, "am_adam" for police
  speed?: number; // 0.25 to 5
  model?: string;
}

// Generate voice audio using Kokoro API (client-side)
export async function generateVoice(options: KokoroVoiceOptions): Promise<string | null> {
  try {
    // Get API key from environment (must be NEXT_PUBLIC_ to work client-side)
    const apiKey = process.env.NEXT_PUBLIC_KOKORO_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ NEXT_PUBLIC_KOKORO_API_KEY not set - voice will not play');
      return null;
    }

    console.log('🎙️ Generating Kokoro voice:', options.text);

    const response = await fetch(`${KOKORO_API_BASE}/audio/speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'model_q8f16',
        voice: options.voice || 'am_michael', // Default to Michael (tough voice)
        input: options.text,
        response_format: 'mp3',
        speed: options.speed || 1,
      }),
    });

    if (!response.ok) {
      console.error('❌ Kokoro TTS failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return null;
    }

    // Convert response to blob and create object URL
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    
    console.log('✅ Kokoro voice generated successfully');
    return audioUrl;
  } catch (error) {
    console.error('❌ Error generating voice:', error);
    return null;
  }
}

// Client-side voice player
export async function playVoice(text: string, voice: string = 'am_michael', speed: number = 1): Promise<void> {
  try {
    const audioUrl = await generateVoice({ text, voice, speed });
    
    if (!audioUrl) {
      console.warn('Failed to generate voice, skipping audio');
      return;
    }

    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl); // Clean up
        resolve();
      };
      audio.onerror = (err) => {
        console.error('Audio playback error:', err);
        URL.revokeObjectURL(audioUrl);
        reject(err);
      };
      audio.play().catch(reject);
    });
  } catch (error) {
    console.error('Error playing voice:', error);
  }
}

// Threatening messages for out of tokens
export const GANGSTER_MESSAGES = [
  { text: "That's it! I'm gonna break your knees!", character: '🤵', voice: 'am_michael' },
  { text: "You're outta tokens, punk! Time to pay up!", character: '🤵', voice: 'am_michael' },
  { text: "Empty pockets? Empty life! Get lost!", character: '🤵', voice: 'am_michael' },
  { text: "You think this is a charity? Beat it!", character: '🤵', voice: 'am_michael' },
  { text: "No money, no play! Capisce?!", character: '🤵', voice: 'am_michael' },
];

export const COP_MESSAGES = [
  { text: "You're going to jail, punk!", character: '👮', voice: 'am_adam' },
  { text: "Hands up! You're under arrest for being broke!", character: '👮', voice: 'am_adam' },
  { text: "That's it, buddy! Downtown, NOW!", character: '👮', voice: 'am_adam' },
  { text: "Out of tokens? Out of luck! You're coming with me!", character: '👮', voice: 'am_adam' },
  { text: "Book 'em! Gambling without funds!", character: '👮', voice: 'am_adam' },
];

export function getRandomThreat(): { text: string; character: string; voice: string } {
  const allMessages = [...GANGSTER_MESSAGES, ...COP_MESSAGES];
  return allMessages[Math.floor(Math.random() * allMessages.length)];
}

