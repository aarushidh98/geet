/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0B0A10',
          soft: '#121018',
          deep: '#07060B',
        },
        paper: '#EDE6D6',
        muted: '#8B8577',
        amber: {
          signal: '#E8A33D',
          dim: '#8A5F22',
        },
        ember: '#C1502E',
        line: 'rgba(237, 230, 214, 0.08)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"General Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        pulseLine: 'pulseLine 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
