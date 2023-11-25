import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  corePlugins: {
    float: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      '3xs': '24em', // @media (min-width: 384px) { ... }
      '2xs': '30em', // @media (min-width: 480px) { ... }
      ...defaultTheme.screens,
    },

    extend: {
      borderRadius: {
        pill: '100vmax',
      },
      colors: {
        brand: {
          100: '#bfbfbf', // hsl(0, 0%, 75%)
          200: '#9e9aa7', // hsl(257, 7%, 63%)
          300: '#3b3054', // hsl(257, 27%, 26%)
          400: '#35323e', // hsl(255, 11%, 22%)
          500: '#232127', // hsl(260, 8%, 14%)
        },
        accent: {
          100: '#f46262', // hsl(0, 87%, 67%)
          300: '#9AE3E3',
          400: '#2acfcf', // hsl(180, 66%, 49%)
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '36em', // @media (min-width: 576px) { ... },
        sm: '40em', // @media (min-width: 640px) { ... }
        md: '48em', // @media (min-width: 768px) { ... }
        lg: '64em', // @media (min-width: 1024px) { ... }
        xl: '80em', // @media (min-width: 1280px) { ... }
        '2xl': '96em', // @media (min-width: 1536px) { ... }
        '3xl': '112.5em', // @media (min-width: 1800px) { ... }
      },
      cursor: {
        pointer:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI6SURBVHgBnZRBaxNBGIYnu9uNSW1NlkgMVAl4Cyg5CAUPJlYFTyaX3CohePKUn5BcBA9CfkAvAf+B4sVLBC8eChv05ClKVaQIiUKjabOO77s7E8bUBpsXnrwzu9lvvvm+2bXFccWADRw1XlpWJpNZg+8ACV4kEomNVqtliSW0Am2mUik5HA5luVxmwEe5XC4pltBZ27a38/m8pHq9HoP54KI47ZbT6fQ52H1mRjE7jnFtK5vNrjJzhSuiui5cYA2Z3YN/HwwGYcBischgH8En8BLsKZ5w8VqtdiwoJ5bneeuO49zGeBdFD4OVSqVwu77vh1nS9VgF3SoUCq4ZiJObzAgcgK8sPtVsNqWWvka1221d011wgckI9cPJ5263K7k9NkDXbZH4Xzz3DRRVLcPDycmYBTe6KPV8kUR0Hm+AM0JFvA4+6DpRnU5nNq5UKn85A5jBUOdb8ITO7CrY4dZ0F+dX/5cbmd0Fq6zXb7CPI/F6NBq9bTQa4n/V7/dpI2QmZxfZWugKhm3eNLdI6S5q1/VkozB+BjZB3Dwe6+COZVlP4Ufs7CLV63UGeg8egksieiNmspPJZA6+DZ6DX/MZVqvVMDt1JA6w8GP4NV38ebnxePwy/IEK+FMVWHMIhmr8BnWuwj2hDqwzF+xwMpnsIeCr6XQ6DoJgIKIvhhuLxaZIjm/IEZgAH/ffwX+IqIknvvU8e+fBBlb38JALDxBwrLKTWGwf/gWMzcKfJP3pXjGuBcqlyjAwH/gDZjDKatJ5fJYAAAAASUVORK5CYII="), pointer;',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.full-w-bg': {
          boxShadow: '0 0 0 100vmax currentColor, 0 0 2rem currentColor',
          clipPath: 'inset(0 -100vmax)',
        },
        '.grid-cols-auto': {
          '--min': '15rem',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, var(--min)), 1fr))`,
        },

        '.tw-content-grid': {
          '--padding-inline': theme('spacing.8'),

          '--content-maxW': '70rem',
          '--content-size':
            'min(100% - (var(--padding-inline) * 2), var(--content-maxW))',

          '--breakout-maxW': '80rem',
          '--breakout-size': `calc((var(--breakout-maxW) - var(--content-maxW)) / 2)`,

          '--fullWPadding': 'minmax(var(--padding-inline), 1fr)',
          '--breakoutPadding': 'minmax(0, var(--breakout-size))',

          display: 'grid',
          gridTemplateColumns: `[full-width-start] var(--fullWPadding) [breakout-start]
          var(--breakoutPadding) [content-start] var(--content-size) [content-end]
          var(--breakoutPadding) [breakout-end] var(--fullWPadding) [full-width-end]`,
        },
        '.tw-content-grid > :not(.tw-breakout, .tw-full-width)': {
          gridColumn: 'content',
        },
        '.tw-breakout': {
          gridColumn: 'breakout',
        },
        '.tw-full-width': {
          gridColumn: 'full-width',
        },
      });
    }),
  ],
};
