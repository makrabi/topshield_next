const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
    },
    extend: {
      colors: {
        'topshield-primary-navy': 'var(--topshield-primary-navy)',
        'topshield-primary-blue': 'var(--topshield-primary-blue)',
        'topshield-glass-blue': 'var(--topshield-glass-blue)',
        'topshield-glass-blue-light': 'var(--topshield-glass-blue-light)',
        'topshield-accent-gold': 'var(--topshield-accent-gold)',
        'topshield-accent-gold-darker': 'var(--topshield-accent-gold-darker)',
        'topshield-white': 'var(--topshield-white)',
        'topshield-background-light': 'var(--topshield-background-light)',
        'topshield-background-content': 'var(--topshield-background-content)',
        'topshield-border-subtle': 'var(--topshield-border-subtle)',
        'topshield-text-dark': 'var(--topshield-text-dark)',
        'topshield-text-medium': 'var(--topshield-text-medium)',
        'topshield-text-light': 'var(--topshield-text-light)',
        'topshield-text-main': 'var(--topshield-text-main)',
        'topshield-dark-elevated': 'var(--topshield-dark-elevated)',
        // ألوان إضافية ثابتة
        'topshield-success': '#10B981',
        'topshield-error': '#EF4444',
        'topshield-warning': '#F59E0B',
        'topshield-info': '#3B82F6',
        'topshield-bg-main': 'var(--topshield-background-light)',
      },
      fontFamily: {
        sans: [`var(--font-inter, ${defaultTheme.fontFamily.sans.join(',')})`, ...defaultTheme.fontFamily.sans],
        heading: [`var(--font-manrope, ${defaultTheme.fontFamily.sans.join(',')})`, ...defaultTheme.fontFamily.sans],
        tajawal: [`var(--font-tajawal, ${defaultTheme.fontFamily.sans.join(',')})`, ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      boxShadow: {
        'topshield-sm': '0 2px 8px rgba(0, 35, 102, 0.05)',
        'topshield-md': '0 4px 16px rgba(0, 35, 102, 0.08)',
        'topshield-lg': '0 8px 32px rgba(0, 35, 102, 0.1)',
        'topshield-xl': '0 12px 48px rgba(0, 35, 102, 0.12)',
        'topshield-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'topshield-sm': '0.25rem',
        'topshield-md': '0.5rem',
        'topshield-lg': '0.75rem',
        'topshield-xl': '1.25rem',
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        'width': 'width',
        'spacing': 'margin, padding',
        'height': 'height',
      },
      willChange: {
        'scroll': 'scroll-position',
        'transform': 'transform',
        'opacity': 'opacity',
      },
      transitionTimingFunction: {
        ...defaultTheme.transitionTimingFunction,
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'fade-in-down': { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'pulse-slow': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.85' } },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'topshield-brand-gradient': 'linear-gradient(135deg, var(--topshield-primary-navy) 0%, var(--topshield-primary-blue) 100%)',
        'topshield-accent-gradient': 'linear-gradient(135deg, var(--topshield-accent-gold) 0%, var(--topshield-accent-gold-darker) 100%)',
        'topshield-premium-gradient': 'linear-gradient(135deg, var(--topshield-primary-navy) 0%, var(--topshield-primary-blue) 50%, var(--topshield-accent-gold) 100%)',
        'topshield-gold-texture': 'linear-gradient(135deg, rgba(180, 148, 74, 0.05) 0%, rgba(218, 179, 89, 0.15) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.15)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.2)',
        xl: '0 6px 12px rgba(0, 0, 0, 0.25)',
        none: 'none',
      },
      opacity: {
        ...defaultTheme.opacity,
        15: '0.15',
        85: '0.85',
      },
      scale: {
        ...defaultTheme.scale,
        102: '1.02',
      },
      zIndex: {
        ...defaultTheme.zIndex,
        '1': '1',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      touchAction: {
        'auto': 'auto',
        'none': 'none',
        'pan-x': 'pan-x',
        'pan-left': 'pan-left',
        'pan-right': 'pan-right',
        'pan-y': 'pan-y',
      },
      scrollMargin: theme => ({
        ...theme('spacing'),
      }),
      scrollPadding: theme => ({
        ...theme('spacing'),
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            lineHeight: '1.75',
            color: 'var(--topshield-text-dark)',
            a: {
              color: 'var(--topshield-primary-blue)',
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': { color: 'var(--topshield-accent-gold)' },
            },
            strong: { color: 'var(--topshield-text-dark)' },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: 'var(--topshield-accent-gold)',
              borderLeftWidth: '0.25rem',
              paddingLeft: theme('spacing.4'),
              color: 'var(--topshield-text-medium)',
            },
            h1: { color: 'var(--topshield-primary-navy)' },
            h2: { color: 'var(--topshield-primary-navy)' },
            h3: { color: 'var(--topshield-primary-navy)' },
            h4: { color: 'var(--topshield-primary-navy)' },
          },
        },
        dark: {
          css: {
            color: 'var(--topshield-text-main)',
            a: {
              color: 'var(--topshield-accent-gold)',
              '&:hover': { color: 'var(--topshield-accent-gold-darker)' },
            },
            strong: { color: 'var(--topshield-text-main)' },
            h1: { color: 'var(--topshield-text-main)' },
            h2: { color: 'var(--topshield-text-main)' },
            h3: { color: 'var(--topshield-text-main)' },
            h4: { color: 'var(--topshield-text-main)' },
            code: { color: 'var(--topshield-accent-gold)' },
            blockquote: {
              borderLeftColor: 'var(--topshield-accent-gold)',
              color: 'var(--topshield-text-medium)',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-textshadow'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.will-change-transform': { 'will-change': 'transform' },
        '.will-change-scroll': { 'will-change': 'scroll-position' },
        '.will-change-opacity': { 'will-change': 'opacity' },
        '.backface-visible': { 'backface-visibility': 'visible' },
        '.backface-hidden': { 'backface-visibility': 'hidden' },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scroll-snap-y-mandatory': {
          'scroll-snap-type': 'y mandatory',
        },
        '.snap-start': {
          'scroll-snap-align': 'start',
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
