import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        casino: {
          red: '#DC143C',
          gold: '#FFD700',
          green: '#228B22',
          dark: '#1a1a2e',
          darker: '#0f0f1e',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spiral-rotate-1': 'spiral-rotate-1 60s linear infinite',
        'spiral-rotate-2': 'spiral-rotate-2 70s linear infinite',
        'spiral-rotate-3': 'spiral-rotate-3 80s linear infinite',
        'spiral-rotate-4': 'spiral-rotate-4 90s linear infinite',
        'spiral-rotate-5': 'spiral-rotate-5 100s linear infinite',
        'spiral-rotate-6': 'spiral-rotate-6 110s linear infinite',
        'spiral-rotate-7': 'spiral-rotate-7 120s linear infinite',
        'pulse-glow': 'pulse-glow 8s ease-in-out infinite',
        'slow-rotate': 'slow-rotate 60s linear infinite',
      },
      keyframes: {
        'spiral-rotate-1': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'spiral-rotate-2': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
        },
        'spiral-rotate-3': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'spiral-rotate-4': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
        },
        'spiral-rotate-5': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'spiral-rotate-6': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
        },
        'spiral-rotate-7': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', filter: 'blur(40px)' },
          '50%': { opacity: '0.5', filter: 'blur(60px)' },
        },
        'slow-rotate': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

