import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './ui/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         fontFamily: {
            quicksand: ['var(--font-quicksand)'],
            inter: ['var(--font-inter)'],
         },
      },
   },
   plugins: [heroui({})],
} satisfies Config;
