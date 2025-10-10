// Kokoro TTS Integration
// Generates AI voice using your Kokoro API (proxied through /api/tts to avoid CORS)

export interface KokoroVoiceOptions {
  text: string;
  voice?: string; // e.g., "am_michael" for tough mob boss, "am_adam" for police
  speed?: number; // 0.25 to 5
  model?: string;
}

// Generate voice audio using Kokoro API (via proxy to avoid CORS)
export async function generateVoice(options: KokoroVoiceOptions): Promise<string | null> {
  try {
    console.log('🎙️ Generating Kokoro voice via proxy:', options.text);

    // Call our proxy API route instead of Kokoro directly (avoids CORS)
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: options.text,
        voice: options.voice || 'am_santa', // Santa voice! 🎅
        speed: options.speed || 1,
        model: options.model || 'model_q8f16',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ TTS proxy failed:', response.status, errorData);
      return null;
    }

    // Convert response to blob and create object URL
    const blob = await response.blob();
    
    if (blob.size === 0) {
      console.error('❌ Received empty audio blob');
      return null;
    }
    
    const audioUrl = URL.createObjectURL(blob);
    
    console.log('✅ Kokoro voice generated successfully, size:', blob.size, 'bytes');
    return audioUrl;
  } catch (error) {
    console.error('❌ Error generating voice:', error);
    return null;
  }
}

// Client-side voice player (using Santa voice by default! 🎅)
export async function playVoice(text: string, voice: string = 'am_santa', speed: number = 1): Promise<void> {
  try {
    console.log('🎙️ Attempting to play voice:', text);
    const audioUrl = await generateVoice({ text, voice, speed });
    
    if (!audioUrl) {
      console.warn('⚠️ Failed to generate voice, skipping audio');
      return;
    }

    console.log('🔊 Audio URL generated, creating Audio element...');
    const audio = new Audio(audioUrl);
    audio.volume = 0.8; // Set volume to 80%
    
    return new Promise((resolve, reject) => {
      audio.onloadeddata = () => {
        console.log('✅ Audio loaded, duration:', audio.duration, 'seconds');
      };
      
      audio.onended = () => {
        console.log('✅ Audio playback completed');
        URL.revokeObjectURL(audioUrl); // Clean up
        resolve();
      };
      
      audio.onerror = (err) => {
        console.error('❌ Audio playback error:', err);
        console.error('Audio error details:', audio.error);
        URL.revokeObjectURL(audioUrl);
        reject(err);
      };
      
      // Try to play with detailed error handling
      audio.play()
        .then(() => {
          console.log('▶️ Audio playing...');
        })
        .catch((err) => {
          console.error('❌ Failed to play audio:', err);
          console.error('Error name:', err.name);
          console.error('Error message:', err.message);
          
          // Provide helpful error message
          if (err.name === 'NotAllowedError') {
            console.warn('⚠️ Audio blocked by browser - user interaction may be required');
          }
          
          URL.revokeObjectURL(audioUrl);
          reject(err);
        });
    });
  } catch (error) {
    console.error('❌ Error in playVoice:', error);
  }
}

// Threatening messages for out of tokens - ALL USING SANTA VOICE! 🎅
export const GANGSTER_MESSAGES = [
  { text: "That's it! I'm gonna break your knees!", character: '🤵', voice: 'am_santa' },
  { text: "You're outta tokens, punk! Time to pay up!", character: '🤵', voice: 'am_santa' },
  { text: "Empty pockets? Empty life! Get lost!", character: '🤵', voice: 'am_santa' },
  { text: "You think this is a charity? Beat it!", character: '🤵', voice: 'am_santa' },
  { text: "No money, no play! Capisce?!", character: '🤵', voice: 'am_santa' },
];

export const COP_MESSAGES = [
  { text: "You're going to jail, punk!", character: '👮', voice: 'am_santa' },
  { text: "Hands up! You're under arrest for being broke!", character: '👮', voice: 'am_santa' },
  { text: "That's it, buddy! Downtown, NOW!", character: '👮', voice: 'am_santa' },
  { text: "Out of tokens? Out of luck! You're coming with me!", character: '👮', voice: 'am_santa' },
  { text: "Book 'em! Gambling without funds!", character: '👮', voice: 'am_santa' },
];

export function getRandomThreat(): { text: string; character: string; voice: string } {
  const allMessages = [...GANGSTER_MESSAGES, ...COP_MESSAGES];
  return allMessages[Math.floor(Math.random() * allMessages.length)];
}

