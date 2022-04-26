/*--------- Imports --------*/
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const svgContents = require("eleventy-plugin-svg-contents");
const slugify = require("slugify");
const { string } = require("nunjucks/src/filters");
const md = require('markdown-it')()


/*--------- Functions --------*/
/* Optimize logo (eleventy-img) */
async function image_logo(src, alt, classes) {
    /* Set format - Macos does not support avif */
    let format = ["avif", "png"];

    /* Write metadata */
    let metadata = await Image(src, {
        widths: [300, 600],
        formats: format,
        urlPath: "/images/",
        outputDir: "_site/images/",
    });

    /* Set image attributes */
    let image_attributes = {
        sizes: "(min-width: 10em) 20vw, 10vw",
        alt,
        loading: "lazy",
        decoding: "async",
        class: classes,
    };

    // Return
    return Image.generateHTML(metadata, image_attributes);
}

/* Optimize images (eleventy-img) */
async function image_image(src, alt, classes) {
    /* Set format - Macos does not support avif */
    let format = ["avif", "webp", "jpeg"];

    /* Create final src */
    var src_new = ""
    var src_new = src_new.concat("/src", src)

    /* Write metadata */
    let metadata = await Image(src_new, {
        widths: [300, 600],
        formats: format,
        urlPath: "/src/images/",
        outputDir: "_site/images/",
    });

    /* Set image attributes */
    let image_attributes = {
        sizes: "(min-width: 10em) 20vw, 10vw",
        alt,
        loading: "lazy",
        decoding: "async",
        class: classes,
    };

    // Return
    return Image.generateHTML(metadata, image_attributes);
}

/* Images (Background) */
async function image_background(src, alt, style) {
    /* Error checking */
    if (alt === undefined) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    /* Standard format */
    let metadata = await Image(src, {
        widths: [1200],
        formats: ["jpeg"],
        urlPath: "/images/",
        outputDir: "_site/images/",
    });

    /* Dont know that this does */
    let data = metadata.jpeg[metadata.jpeg.length - 1];

    /* Return */
    return `<div class="${style}" style="background-image: url(${data.url})" alt="${alt}"></div>`;
}

async function bg_test(src) {
    /* Standard format */
    let metadata = await Image(src, {
        widths: [1200],
        formats: ["jpeg"],
        urlPath: "/images/",
        outputDir: "_site/images/",
    });

    let data = metadata.jpeg[metadata.jpeg.length - 1];

    /* Return */
    return `url(${data.url})`;
}

/*--------- Settings --------*/
module.exports = function (eleventyConfig) {
    /*--------- General --------*/
    // Plugins
    eleventyConfig.addPlugin(svgContents);

    // Pass trough files (You dont need to write entire path)
    eleventyConfig.addPassthroughCopy({ "./src/css/tailwind.css": "./style.css" });
    eleventyConfig.addPassthroughCopy({ "./src/images": "./images/" });
    eleventyConfig.addPassthroughCopy({ "./src/images/icons": "./icons/" });

    // Will watch for changes during dev
    eleventyConfig.addWatchTarget("./src");

    /*--------- Collections --------*/
    eleventyConfig.addCollection("byTag", function (collectionApi) {
        return collectionApi.getFilteredByTag("resources");
    });

    eleventyConfig.addCollection("keyMustExistInData", (data) => {
        // Side-step tags and do your own filtering
        return data;
    });

    /*--------- Filters --------*/
    // Extract test
    eleventyConfig.addFilter("onlyTag", (tag) => {});

    // Datetime
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

    /* Capatilize first letter */
    eleventyConfig.addFilter("capatilize", (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });
    /* Slugify */
    eleventyConfig.addFilter("slug", (str) => {
        if (!str) {
            return;
        }

        /* Create working relative url */
        url = slugify(str).replace(/(\b\.html)/gi, "");
        url = slugify(url).replace(/(\bsrcpages)/gi, "pages/");
        return url;
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
    eleventyConfig.addFilter("remaining", (...n) => {
        return n - 2;
    });

    /*--------- Shortcodes --------*/
    eleventyConfig.addNunjucksAsyncShortcode("logo", image_logo);
    eleventyConfig.addNunjucksAsyncShortcode("image", image_image);
    eleventyConfig.addNunjucksAsyncShortcode("background", image_background);
    eleventyConfig.addNunjucksAsyncShortcode("test", bg_test);

    /*--------- Settings --------*/
    return {
        dir: {
            input: "src",
            output: "_site",
        },
        htmlTemplateEngine: "njk",
    };
};
