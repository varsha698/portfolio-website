/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0b',
          surface: '#111114',
          raised: '#16161a',
        },
        border: {
          DEFAULT: '#1e1e24',
          strong: '#2a2a33',
        },
        fg: {
          DEFAULT: '#e6e6e6',
          muted: '#7a7a85',
          faint: '#4a4a52',
        },
        accent: {
          DEFAULT: '#7ee787',
          dim: '#4a9c52',
          link: '#79c0ff',
          warn: '#ffa657',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}
