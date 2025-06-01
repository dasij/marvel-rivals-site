module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'marvel-red': '#ED1D24', // Vermelho da Marvel
                'marvel-dark': '#151515', // Preto de fundo
            },
            fontFamily: {
                'marvel': ['"Bangers"', 'cursive'] // Fonte estilo HQ
            }
        }
    },
    plugins: [],
}