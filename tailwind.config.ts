import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1656df",
        "primary-hover": "#0e469a",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
        "card-dark": "#1a2133",
        "input-bg": "#334155",
        "neutral-slate": "#242f47",
        "border-muted": "#334366",
        "accent-success": "#0bda62",
        "accent-warning": "#fa6538",
        "portugal-green": "#046A38",
        "portugal-red": "#DA291C",
        "slate-custom": {
          50: '#f0f4fa',
          100: '#dde7f4',
          200: '#c1d4ed',
          300: '#99bce3',
          400: '#6fa0d7',
          500: '#5285cb',
          600: '#3d6baa',
          700: '#325688',
          800: '#2d4970',
          900: '#283e5c',
          950: '#1b283d',
        },
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px",
      },
      keyframes: {
        'zoom-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'zoom-slow': 'zoom-slow 20s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;

