import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.125rem' }],
        'sm': ['0.9375rem', { lineHeight: '1.375rem' }],
        'base': ['1.0625rem', { lineHeight: '1.625rem' }],
        'lg': ['1.1875rem', { lineHeight: '1.875rem' }],
        'xl': ['1.375rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.625rem', { lineHeight: '2.125rem' }],
        '3xl': ['2rem', { lineHeight: '2.375rem' }],
        '4xl': ['2.375rem', { lineHeight: '2.625rem' }],
        '5xl': ['3.125rem', { lineHeight: '1.1' }],
        '6xl': ['3.875rem', { lineHeight: '1.1' }],
        '7xl': ['4.625rem', { lineHeight: '1.1' }],
        '8xl': ['6.125rem', { lineHeight: '1.1' }],
        '9xl': ['8.125rem', { lineHeight: '1.1' }],
      },
      colors: {
        primary: {
          DEFAULT: '#0B7A3B',
          dark: '#065F2E',
          light: '#14a050',
          50: '#f0fdf4',
          100: '#dcfce7',
        },
        accent: {
          DEFAULT: '#243B8F',
          light: '#3a5abf',
          dark: '#1a2f6f',
        },
        brand: {
          green: '#4ade80',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        rajdhani: ['var(--font-rajdhani)', 'system-ui', 'sans-serif'],
        noto: ['var(--font-noto)', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-hindi)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #065F2E 0%, #0B7A3B 100%)',
        'gradient-hero': 'linear-gradient(160deg, #0a2714 0%, #065F2E 45%, #0d3563 100%)',
        'gradient-accent': 'linear-gradient(135deg, #1a2f6f 0%, #243B8F 100%)',
        'gradient-whatsapp': 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        'grid-pattern': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'pulse-ring': 'pulseRing 2.5s ease-in-out infinite',
        'slide-down': 'slideDown 0.3s ease forwards',
        'shake': 'shake 0.4s ease',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)' },
          '50%': { boxShadow: '0 0 0 16px rgba(37, 211, 102, 0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.15)',
        'primary': '0 4px 15px rgba(11,122,59,0.35)',
        'primary-lg': '0 8px 30px rgba(11,122,59,0.45)',
        'error': '0 0 0 3px rgba(239,68,68,0.2)',
        'focus': '0 0 0 3px rgba(11,122,59,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
