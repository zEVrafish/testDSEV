module.exports = {
    content: ["./index.html", "./main.js", "./src/**/*.njk", "./src/**/*.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            /* Extra fonts */
            fontFamily: {
                montserrat: ["Montserrat", '"-apple-system"', "BlinkMacSystemFont",  'system-ui'],
            },
            /* Extra colors */
            colors: {
                "light-primary": "#F5F5F5",
                "light-secondary": "#FFFFFF",
                "dark-primary": "#232325",
                "dark-secondary": "#262D3D",
                "dark-tertiary": "#3A445C",
                "dsev": "#993434"
            },
            /* Sizes */
            width: {
                carousel: "calc(50% - 4px)",
            },
            height: {
                test: "calc(10% + 100px)"
            }
        },
    },
    plugins: [ 
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
};
