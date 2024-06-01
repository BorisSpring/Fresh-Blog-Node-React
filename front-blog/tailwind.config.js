export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      height: {
        'calc-vh': 'calc(100vh - 100px)',
        'calc-vh-404': 'calc(100vh - 68px)',
      },
      backgroundImage: {
        'error-image': "url('img/err.jpeg')",
      },
      colors: {
        'blue-100': '#0D2436',
        'blue-85': '#183B56',
        'blue-75': '#1565D8',
        'blue-50': '#527AA6',
        'blue-40': '#6088BC',
        'blue-30': '#8ab2ec',
        'blue-20': '#a1c1ef',
        'blue-10': '#b9d1f3',
        'blue-0': '#d0e0f7',
        textColor: '#5A7184',
      },
    },
  },
  plugins: [],
};
