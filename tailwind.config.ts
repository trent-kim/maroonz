import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')
import type { PluginAPI } from "tailwindcss/types/config";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      sm: '6px',
      md: '12px',
      lg: '24px',
    },
    fontSize: {
      sm: ['12px', '15.6px'],
      md: ['24px', '36px'],
      lg: ['48px', '60px'],
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-junicode-condensed)"],
        body: ["var(--font-ibm-plex-mono)"],
      },
      transitionDuration: {
        'sm': '500ms',
        'md': '3000ms',
        'lg': '8000ms',
        'xl': '16000ms',
      },
      transitionDelay: {
        '1.5': '1500ms',
        '3': '3000ms',
        '25.5': '25500ms',
        '37.5': '37500ms',
      },
      keyframes: {
        caret: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
        marquee: {
          '100%': { transform: 'translateX(120%)' },
          '0%': { transform: 'translateX(-20%)' },
        },
        'move-and-scale': {
          '0%': { transform: 'translate(0%, 0%) scale(7.5)' }, // Start large and centered
          '100%': { transform: 'translate(-1305%, -712%) scale(1)' }, // Move to top-left and scale down
        },
        'up-down-one': {
          '0%': {
            transform: 'translateY(0)'
          },
          '25%': {
            transform: 'translateY(12%)'
          },
          '50%': {
            transform: 'translateY(0)'
          },
          '75%': {
            transform: 'translateY(-12%)'
          },
          '100%': {
            transform: 'translateY(0)'
          },
        },
        'up-down-two': {
          '0%': {
            transform: 'translateY(12%)'
          },
          '25%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-12%)'
          },
          '75%': {
            transform: 'translateY(0)'
          },
          '100%': {
            transform: 'translateY(12%)'
          },
        },
        'up-down-three': {
          '0%': {
            transform: 'translateY(-12%)'
          },
          '25%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(12%)'
          },
          '75%': {
            transform: 'translateY(0)'
          },
          '100%': {
            transform: 'translateY(-12%)'
          },
        },
      },
      animation: {
        caret: 'caret 1.5s infinite',
        marquee: 'marquee 12s linear infinite',
        'move-and-scale': 'move-and-scale 2s ease-in-out forwards',
        'up-down-one': 'up-down-one 3s linear infinite',
        'up-down-two': 'up-down-two 3s linear infinite',
        'up-down-three': 'up-down-three 3s linear infinite',
      },
      boxShadow: {
        glow: '0px 0px 6px 3px #FFFFFF',
      },
      textShadow: {
        glow: '0px 0px 1px #FFFFFF, 0px 0px 2px #FFFFFF, 0px 0px 3px #FFFFFF, 0px 0px 6px #FFFFFF',
      },
    },
  },
  safelist: [
    'animate-up-down-one',
    'animate-up-down-two',
    'animate-up-down-three',
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme } : { matchUtilities : PluginAPI["matchUtilities"], theme : PluginAPI["theme"] }) {
      matchUtilities(
        {
          'text-shadow': (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
export default config;
