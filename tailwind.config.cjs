/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-600':'#62120E',
        'primary-500':'#8B322E',
        'primary-400':'#CE7672',
        'primary-300':'#EE9A97',
        'primary-200':'#FEC5C2',
        'primary-100':'#FFD6D5',
        'primary-50':'#FCEBEA',
        'secondary-400':'#544667',
        'secondary-100':'#ECDEFE',
        'xwhite-600':'#D0D0D0',
        'xwhite-500':'#E1E1E1',
        'xwhite-400':'#ECECEC',
        'xwhite-300':'#F6F6F6',
        'sky':{
          '100':'#DBF8FD',
          '200':'#B8EDFB',
          '300':'#92DAF4',
          '400':'#74C3EA',
          '500':'#49A3DC',
          '600':'#3580BD',
          '700':'#24609E',
          '800':'#17447F',
          '900':'#0E3069',
        }
      }
    },
  },
  plugins: [],
}
