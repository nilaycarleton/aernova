/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        ink: '#04080F',
        surface: '#0A0E1A',
        panel: '#0E1525',
        edge: '#1A2640',
        cyan: '#00D4FF',
        orange: '#FF6B1A',
        smoke: '#5A7090',
        frost: '#C8D8F0',
        snow: '#F0F6FF',
      },
      animation: {
        'scan': 'scan 5s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-0.5deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0.5deg)' },
        },
      },
    },
  },
  plugins: [],
};
