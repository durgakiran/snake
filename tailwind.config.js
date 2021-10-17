const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/pages/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Bubblegum Sans', 'cursive']
        },
        extend: {
            borderWidth: {
                "20": "20px",
                "xl": "4rem"
            },
            colors: {
                white: '#ffffff',
                lightGray: '#E7E2E2',
                bermudaGray: '#668AA7',
                vistaBlue: '#9CCFAD',
                springRain: '#9FD0AF',
                crail: '#C15143',
                mojo: '#C84E41',
                flax: '#EED688',
                tango: '#EF732D',
                burntSienna: '#EF7350',
                flaxShade: '#EFD887',
                springRain60: '#9fd0b0',
            }
        },
    },
    variants: {
        extend: {

        },
    },
    plugins: [
        plugin(function ({ addComponents }) {
            const buttons = {
                '.btn': {
                    padding: '.5rem 1rem',
                    borderRadius: '.25rem',
                    fontWeight: '600',
                },
                '.btn-flax': {
                    backgroundColor: '#EED688',
                    color: '#000',
                    '&:hover': {
                        backgroundColor: '#EF7350'
                    },
                },
                '.btn-red': {
                    backgroundColor: '#e3342f',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#cc1f1a'
                    },
                },
            }

            addComponents(buttons)
        })
    ],
}
