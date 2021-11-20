/* Modules */
const colors = require("tailwindcss/colors");

/* Settings */
module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.njk", "./src/*.njk", "./src/**/*.js", "./**/*.js"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                carousel: "calc(50% - 4px)",
            },
            height: {
                100: "28rem",
                104: "32rem",
                108: "36rem",
                112: "40rem",
                114: "42rem",
                116: "44rem",
                120: "48rem",
                124: "52rem",
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
            typography(theme) {
                return {
                    dark: {
                        css: {
                            color: theme("colors.gray.300"),
                            '[class~="lead"]': { color: theme("colors.gray.400") },
                            a: { color: theme("colors.gray.100") },
                            strong: { color: theme("colors.gray.100") },
                            "ul > li::before": { backgroundColor: theme("colors.gray.700") },
                            hr: { borderColor: theme("colors.gray.800") },
                            blockquote: {
                                color: theme("colors.gray.100"),
                                borderLeftColor: theme("colors.gray.800"),
                            },
                            h1: { color: theme("colors.gray.100") },
                            h2: { color: theme("colors.gray.100") },
                            h3: { color: theme("colors.gray.100") },
                            h4: { color: theme("colors.gray.100") },
                            code: { color: theme("colors.gray.100") },
                            "a code": { color: theme("colors.gray.100") },
                            pre: {
                                color: theme("colors.gray.200"),
                                backgroundColor: theme("colors.gray.800"),
                            },
                            thead: {
                                color: theme("colors.gray.100"),
                                borderBottomColor: theme("colors.gray.700"),
                            },
                            "tbody tr": { borderBottomColor: theme("colors.gray.800") },
                        },
                    },
                };
            },
        },
    },
    important: true,
    variants: {
        extend: {
            display: ["dark"],
            typography: ["dark"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
