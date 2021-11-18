/* Modules */
const colors = require('tailwindcss/colors')

/* Settings */
module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.njk", "./src/*.njk", "./src/**/*.js", "./**/*.js"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                "carousel": "calc(50% - 4px)",
            },
            height: {
                "100": "28rem",
                "104": "32rem",
                "108": "36rem",
                "112": "40rem",
                "114": "42rem",
                "116": "44rem",
                "120": "48rem",
                "124": "52rem",
                "screen-85": "85vh",
                "screen-75": "75vh",
                "screen-50": "50vh",
                "screen/3": "calc(100vh / 3)",
                "screen/4": "calc(100vh / 4)",
                "screen/5": "calc(100vh / 5)",
            },
            colors: {
                background: "#232325",
            },
            fontFamily: {
                montserrat: ["Montserrat", '"-apple-system"', "BlinkMacSystemFont"],
            },
        },
    },
    important: true,
    variants: {
        extend: {
            display: ["dark"],
        },
    },
    plugins: [],
};
