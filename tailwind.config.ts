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
      sm: '12px',
      md: '24px',
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
        '1.5': '1500ms',
        '3': '3000ms',
        '12': '12000ms',
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
      },
      animation: {
        caret: 'caret 1.5s infinite',
        marquee: 'marquee 12s linear infinite',
      },
      boxShadow: {
        glow: '0px 0px 6px 0px #FFFFFF',
      },
      textShadow: {
        glow: '0px 0px 6px #FFFFFF',
      },
    },
  },
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
