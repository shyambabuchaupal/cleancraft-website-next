/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      'xs': '475px',    // Extra small devices
      'sm': '640px',    // Small devices (phones)
      'md': '768px',    // Medium devices (tablets)
      'lg': '1024px',   // Large devices (desktops)
      'xl': '1280px',   // Extra large devices
      '2xl': '1536px',  // 2X Large devices
      '3xl': '1920px',  // 3X Large devices (wide monitors)
    },
    extend: {
      colors: {
        'brand-blue': '#1e40af',
        'brand-blue-dark': '#1e3a8a', 
        'cleancraft-gold': '#FFD700',
        'cleancraft-darkgold': '#B8860B',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
        '8xl': ['6rem', { lineHeight: '1' }],           // 96px
        '9xl': ['8rem', { lineHeight: '1' }],           // 128px
        // Custom font sizes for your project
        'display-xs': ['1.5rem', { lineHeight: '2rem' }],    // 24px
        'display-sm': ['1.875rem', { lineHeight: '2.375rem' }], // 30px
        'display-md': ['2.25rem', { lineHeight: '2.75rem' }],   // 36px
        'display-lg': ['3rem', { lineHeight: '3.75rem' }],      // 48px
        'display-xl': ['3.75rem', { lineHeight: '4.5rem' }],    // 60px
        'display-2xl': ['4.5rem', { lineHeight: '5.625rem' }],  // 72px
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
      },
      maxWidth: {
        'xs': '20rem',     // 320px
        'sm': '24rem',     // 384px
        'md': '28rem',     // 448px
        'lg': '32rem',     // 512px
        'xl': '36rem',     // 576px
        '2xl': '42rem',    // 672px
        '3xl': '48rem',    // 768px
        '4xl': '56rem',    // 896px
        '5xl': '64rem',    // 1024px
        '6xl': '72rem',    // 1152px
        '7xl': '80rem',    // 1280px
        'container': '1200px',
        'wide': '1400px',
        'ultra-wide': '1600px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',    // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.5rem',     // 24px
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'lg': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',
        'soft': '0 2px 15px 0 rgb(0 0 0 / 0.08)',
        'card': '0 4px 20px 0 rgb(0 0 0 / 0.1)',
      },
    },
  },
};