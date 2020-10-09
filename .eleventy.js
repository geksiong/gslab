const pluginTailwind = require("eleventy-plugin-tailwindcss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const readerBar = require('eleventy-plugin-reader-bar');
const { DateTime } = require("luxon");

const minifyHTML = require("./transforms/minify-html");

const postsColl = require("./collections/posts");
const tagListColl = require("./collections/tagList");
const pagedPostsColl = require("./collections/pagedPosts");
const pagedPostsByTagColl = require("./collections/pagedPostsByTag");

module.exports = (config) => {
  // Markdown plugins
  let markdownIt = require("markdown-it");
  let markdownItEmoji = require("markdown-it-emoji");
  let markdownItContainer = require("markdown-it-container");
  let markdownItKatex = require("@swedish-li/markdown-it-katex");
  let options = {
    html: true
  };
  let markdownLib = markdownIt(options)

  markdownLib.use(markdownItEmoji)
  .use(markdownItContainer, 'details', {
    validate: function(params) {
      return params.trim().match(/^details\s+(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details class="details"><summary>' + markdownLib.utils.escapeHtml(m[1]) + '</summary>\n';
      } else {
        // closing tag
        return '</details>\n';
      }
    }
  })
  .use(markdownItContainer, '', {
    validate: () => true,
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
          const m = tokens[idx].info.trim().match(/^(\w*)\s*(.*)$/);
          const containerClass = m[1];
          const containerHeader = m[2] || containerClass.toUpperCase();
          return `<div ${containerClass && `class="${containerClass}"`}><span>${containerHeader}</span>`;
      } else {
          return `</div>`;
      }
    }
  })
  .use(markdownItKatex);

  config.setLibrary("md", markdownLib);

  config.addPlugin(pluginTailwind, {
    src: "src/assets/css/*"
  });

  config.addPlugin(syntaxHighlight);
  config.addPlugin(readingTime);
  config.addPlugin(readerBar);

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
