/* Constants */
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const svgContents = require("eleventy-plugin-svg-contents");

/* Images (Standard) */
async function imageShortcode(type, src, alt, style, sizes) {
    /* Standard format */
    let format = ["avif", "webp", "jpeg"];

    /* Logo formats */
    if (type == "logo") {
        format = ["avif", "png"];
    }

    /* Write metadata */
    let metadata = await Image(src, {
        widths: [300, 600],
        formats: format,
        urlPath: "/images/",
        outputDir: "dist/images/",
    });

    /* Set image attributes */
    let image_attributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: style,
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, image_attributes);
}

/* Images (SVG icons) */
async function svgShortcode(src, alt, style, sizes) {
    /* Standard format */
    let format = ["svg", "avif", "jpeg"];

    /* Write metadata */
    let metadata = await Image(src, {
        widths: [300, 600],
        formats: format,
        urlPath: "/images/",
        outputDir: "dist/images/",
    });

    /* Set image attributes */
    let image_attributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: style,
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, image_attributes);
}
/* Images (Background) */
async function backgroundShortcode(src, alt, style) {
    /* Error checking */
    if (alt === undefined) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    /* Standard format */
    let metadata = await Image(src, {
        widths: [1200],
        formats: ["jpeg"],
        urlPath: "/images/",
        outputDir: "dist/images/",
    });

    /* Dont know that this does */
    let data = metadata.jpeg[metadata.jpeg.length - 1];

    /* Return */
    return `<div class="${style}" style="background-image: url(${data.url})" alt="${alt}">`;
}

/* Config settings */
module.exports = function (eleventyConfig) {
    /* Plugins */
    eleventyConfig.addPlugin(svgContents);

    /* Eleventy will pick up content at build (_tmp is for dev) */
    eleventyConfig.addPassthroughCopy({ "./src/css/tailwind.css": "./style.css" });
    eleventyConfig.addPassthroughCopy({ "./src/_tmp/style.css": "./style.css" });
    eleventyConfig.addPassthroughCopy({ "./src/images/icons": "./images/" });
    eleventyConfig.addPassthroughCopy({ "./src/images/icons": "./images/" });

    /* Will watch for changes during dev */
    eleventyConfig.addWatchTarget("./src");
    eleventyConfig.addWatchTarget("./dist");

    /* Datetime */
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL dd, yyyy");
    });
    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    /* Slugify */
    eleventyConfig.addFilter("capatilize", (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    /* Calculate remaining */
    eleventyConfig.addFilter("remaining", (...numbers) => {
        return 2 - numbers;
    });

    /* Image plugin */
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksAsyncShortcode("background", backgroundShortcode);
    eleventyConfig.addNunjucksAsyncShortcode("svg", svgShortcode);

    /* Set input and output directories */
    return {
        dir: {
            input: "src",
            output: "dist",
        },
        htmlTemplateEngine: "njk",
    };
};
