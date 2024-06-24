import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            typography: ({ theme }: { theme: any }) => ({
                DEFAULT: {
                    css: {
                        h1: { align: 'center' },
                        '--tw-prose-body': theme('colors.zinc.400'),
                        '--tw-prose-headings': theme('colors.zinc.200'),
                        '--tw-prose-lead': theme('colors.zinc.200'),
                        '--tw-prose-links': theme('colors.zinc.200'),
                        '--tw-prose-bold': theme('colors.zinc.400'),
                        '--tw-prose-counters': theme('colors.zinc.400'),
                        '--tw-prose-bullets': theme('colors.zinc.400'),
                        '--tw-prose-hr': theme('colors.zinc.800'),
                        '--tw-prose-quotes': theme('colors.zinc.400'),
                        '--tw-prose-quote-borders': theme('colors.zinc.400'),
                        '--tw-prose-captions': theme('colors.zinc.200'),
                        '--tw-prose-code': theme('colors.zinc.200'),
                        '--tw-prose-pre-code': theme('colors.zinc.200'),
                        '--tw-prose-pre-bg': theme('colors.zinc.800'),
                        '--tw-prose-th-borders': theme('colors.zinc.800'),
                        '--tw-prose-td-borders': theme('colors.zinc.800'),
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config;

export default config;
