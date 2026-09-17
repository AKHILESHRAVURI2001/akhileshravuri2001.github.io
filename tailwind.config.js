/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        higgs: {
          cyan: '#00f5ff',
          neon: '#00ffcc',
          glow: '#38bdf8',
        },
        quantum: {
          dark: '#030712',
          deep: '#070d1e',
          surface: '#0b1329',
          border: 'rgba(56, 189, 248, 0.15)',
          purple: '#8b5cf6',
          violet: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          gold: '#f59e0b',
        },
        void: {
          900: '#030712',
          800: '#060e20',
          700: '#0b1633',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'quantum-float': 'quantumFloat 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'lattice-pulse': 'latticePulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 245, 255, 0.3))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.7))' },
        },
        quantumFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        latticePulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        }
      },
      boxShadow: {
        'quantum-glow': '0 0 25px -5px rgba(0, 245, 255, 0.3), 0 0 10px -2px rgba(139, 92, 246, 0.3)',
        'quantum-glow-lg': '0 0 45px -5px rgba(0, 245, 255, 0.45), 0 0 20px -2px rgba(168, 85, 247, 0.4)',
        'quantum-purple': '0 0 30px -5px rgba(168, 85, 247, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '24px',
        '3xl': '32px',
      }
    },
  },
  plugins: [],
}
