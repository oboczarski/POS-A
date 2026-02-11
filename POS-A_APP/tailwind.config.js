/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#080816',
          800: '#0f1028'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(125, 109, 255, 0.22)'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 20%, rgba(212, 71, 255, 0.16), transparent 45%), radial-gradient(circle at 80% 0%, rgba(0, 169, 241, 0.14), transparent 38%), radial-gradient(circle at 80% 90%, rgba(143, 51, 255, 0.12), transparent 45%), linear-gradient(160deg, #02020d 0%, #050518 55%, #080821 100%)'
      }
    }
  },
  plugins: []
};
