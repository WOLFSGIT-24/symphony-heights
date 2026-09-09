/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.015em' }],
        base: ['1rem', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '0' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0' }],
        '6xl': ['3.75rem', { lineHeight: '1.15', letterSpacing: '0' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0' }],
        '8xl': ['6rem', { lineHeight: '1.08', letterSpacing: '0' }],
        '9xl': ['8rem', { lineHeight: '1.05', letterSpacing: '0' }],
      },

      fontFamily: {
        sans: ['"Utile"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Owners"', 'Georgia', 'serif'],
        display: ['"Owners"', 'system-ui', 'sans-serif'],
        body: ['"Utile"', 'system-ui', 'sans-serif'],
        heading: ['"Owners"', 'system-ui', 'sans-serif'],
        paragraph: ['"Utile"', 'system-ui', 'sans-serif'],
        owners: ['"Owners"', 'system-ui', 'sans-serif'],
        utile: ['"Utile"', 'system-ui', 'sans-serif'],
      },

      colors: {
        /* Symphony Heights Palette */
        'navy-dark': '#4c3a30',
        'navy-primary': '#584236',
        'navy-light': '#a5b7cf',
        
        'champagne': '#dcd3c2',
        'marble': '#f4f3ee',
        'gray-text': '#584236',
        'brand-stone-beige': '#c5b9ad',
        
        'gold': '#bcc9da',
        'gold-dark': '#a5b7cf',
        'bronze': '#a5b7cf',
        'charcoal': '#4c3a30',

        /* Theme Aliases */
        'old-lace': '#f4f3ee',
        'off-white': '#f4f3ee',
        'warm-beige': '#dcd3c2',
        'pale-sage': '#bcc9da',

        'warm-espresso': '#584236',
        'soft-charcoal': '#4c3a30',
        'muted-gray': '#584236',
        'light-gray': '#a5b7cf',

        /* System */
        background: '#f4f3ee',
        foreground: '#4c3a30',
        secondary: '#dcd3c2',
        'secondary-foreground': '#4c3a30',

        /* Accent */
        primary: '#584236',
        'primary-foreground': '#ffffff',

        /* Alerts */
        destructive: '#D32F2F',
        'destructive-foreground': '#FFFFFF',
      },

      animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
};
