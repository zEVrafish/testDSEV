module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.njk", "./src/*.njk", "./src/**/*.js", "./**/*.js"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            height: {
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
