/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'primary': {
                    '50': '#eefff7',
                    '100': '#d7ffef',
                    '200': '#b2ffde',
                    '300': '#76ffc5',
                    '400': '#34f4a3',
                    '500': '#0add85',
                    '600': '#01c674', // Main in uicolors.app
                    '700': '#059057',
                    '800': '#0a7147',
                    '900': '#0b5c3c',
                    '950': '#003420',
                },
                'neutral': {
                    '50': '#f6f6f6',
                    '100': '#e7e7e7',
                    '200': '#d1d1d1',
                    '300': '#b0b0b0',
                    '400': '#888888',
                    '500': '#6d6d6d',
                    '600': '#5e5e5e', // Main in uicolors.app
                    '700': '#4f4f4f',
                    '800': '#454545',
                    '900': '#3d3d3d',
                    '950': '#262626',
                },
            }
        },
    },
    plugins: [],
}
