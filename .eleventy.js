/* Constants */
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");

/* Image package */
/* async function imageShortcode(src, alt, style) {
    if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let metadata = await Image(src, {
        widths: [300, 600],
        formats: ["avif", "jpeg"],
        urlPath: "/images/",
        outputDir: "dist/images/",
    });

    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return `<img src="${data.url}" class="${style}" alt="${alt}" loading="lazy" decoding="async">`;
} */

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

/* Background */
async function backgroundShortcode(src, alt, effect) {
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
    return `<div class="bg-cover bg-center bg-fixed
    full-width h-full curved ${effect}" style="background-image: url(${data.url})" alt="${alt}">`;
}

/* Config settings */
module.exports = function (eleventyConfig) {
    /* Eleventy will pick up content at build (_tmp is for dev) */
    eleventyConfig.addPassthroughCopy({ "./src/css/tailwind.css": "./style.css" });
    eleventyConfig.addPassthroughCopy({ "./src/_tmp/style.css": "./style.css" });
    /*     eleventyConfig.addPassthroughCopy({ "./src/images": "./images/" });
     */
    /* Will watch for changes during dev */
    eleventyConfig.addWatchTarget("./src");
    eleventyConfig.addWatchTarget("./dist");

    /* Image plugin */
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksAsyncShortcode("background", backgroundShortcode);

    /* Set input and output directories */
    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
