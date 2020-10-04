const pluginTailwind = require("eleventy-plugin-tailwindcss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const { DateTime } = require("luxon");

const minifyHTML = require("./transforms/minify-html");

const postsColl = require("./collections/posts");
const tagListColl = require("./collections/tagList");
const pagedPostsColl = require("./collections/pagedPosts");
const pagedPostsByTagColl = require("./collections/pagedPostsByTag");

module.exports = (config) => {

    config.addPlugin(pluginTailwind, {
        src: "src/assets/css/*"
    });

    config.addPlugin(syntaxHighlight);
    config.addPlugin(readingTime);

    config.setDataDeepMerge(true);

    config.addPassthroughCopy("src/assets/js/**/*");
    config.addPassthroughCopy("src/assets/img/**/*");
    config.addPassthroughCopy({ "src/posts/img/**/*": "assets/img/" });

    config.addLayoutAlias('default', 'layouts/default.njk');
    config.addLayoutAlias('post', 'layouts/post.njk');

    config.addFilter("readableDate", (date) => {
        return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("d LLLL yyyy hh:mm a");
    });

    if (process.env.NODE_ENV === "production") {
        config.addTransform("minify-html", minifyHTML);
    }

    config.addCollection("posts", postsColl);
    config.addCollection("tagList", tagListColl);
    config.addCollection("pagedPosts", pagedPostsColl);
    config.addCollection("pagedPostsByTag", pagedPostsByTagColl);

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        templateFormats: ["md", "njk", "html"],
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }

}
