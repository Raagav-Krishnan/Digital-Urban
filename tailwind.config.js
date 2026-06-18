/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#EAF1F6',
        surface: '#FFFFFF',
        'surface-secondary': '#F8FAFC',
        primary: '#2563EB',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        resource: '#3B82F6',
        purple: '#8B5CF6',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 14px 32px -16px rgba(37,99,235,0.58)',
        panel: '0 24px 70px -30px rgba(15,23,42,0.34)',
        card: '0 18px 42px -24px rgba(15,23,42,0.34)',
        float: '0 24px 70px -28px rgba(15,23,42,0.32)',
        soft: '0 14px 36px -26px rgba(15,23,42,0.36)',
        marker: '0 18px 34px -16px rgba(15,23,42,0.42)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
