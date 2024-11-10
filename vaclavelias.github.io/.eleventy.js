import * as sass from 'sass';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import path from 'node:path';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItToc from 'markdown-it-table-of-contents';
import pluginRss from '@11ty/eleventy-plugin-rss';
import eleventyFetch from '@11ty/eleventy-fetch';

export default function (eleventyConfig) {

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("assets/scripts/copy-code.js");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("version.txt");
    eleventyConfig.addPassthroughCopy("web.config");
    eleventyConfig.addPassthroughCopy({
        "node_modules/lunr/lunr.min.js": "assets/scripts/lunr.min.js"
    });

    //eleventyConfig.addCollection("posts", (collection) => {
    //    return collection.getFilteredByTag("blog");
    //});

    //eleventyConfig.addWatchTarget("./assets/css");
    //eleventyConfig.addWatchTarget("./assets/css");

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        strictFilters: false
    });

    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compileOptions: {
            cache: false,
        },
        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes
                ], style: "compressed"
            });

            return async (data) => {
                return result.css;
            };
        }
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
    });

    eleventyConfig.addCollection('tagList', (collections) => {
        const uniqueTags = collections
            .getFilteredByTag('blog')
            .reduce((tags, item) => tags.concat(item.data.tags), [])
            .filter((tag) => !!tag)
            .filter((tag) => !!tag && !['page', 'blog', 'search'].includes(tag))
            .sort();
        return Array.from(new Set(uniqueTags));
    });

    eleventyConfig.addCollection('yearList', (collections) => {
        const uniqueyears = collections
            .getFilteredByTag('blog')
            .map((post) => post.date.getFullYear())
            .reverse();
        return Array.from(new Set(uniqueyears));
    });

    eleventyConfig.addFilter('jsonify', function (variable) {
        return JSON.stringify(variable);
    });

    eleventyConfig.addFilter('normalize_whitespace', function (text) {

        //Remove tabs
        text = text.replace(/\t/g, '');

        text = text.replace(/\r/g, '');

        //Remove big spaces and punctuation
        text = text.replace(/\n/g, ' ');

        //remove repeated spaces
        text = text.replace(/ +(?= )/g, '');

        return text;
    });

    eleventyConfig.addFilter("md", function (content = "") {
        return markdownIt({ html: true }).render(content);
    });

    eleventyConfig.addShortcode("img", function (title, url) {
        return `<img alt="${title}" src="${url}" class="img-fluid mb-2" loading="lazy" data-src="${url}">`;
    });

    eleventyConfig.addShortcode("img-click", function (title, url, destinationUrl) {
        return `<a href="${destinationUrl ?? url}" title="${title}" class="mb-2"><img alt="${title}" src="${url}" class="img-fluid" loading="lazy" data-src="${url}"></a>`;
    });

    eleventyConfig.addShortcode("youtube", function (id) {
        return `<div class="ratio ratio-16x9 mb-2"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allowfullscreen></iframe></div>`;
    });

    eleventyConfig.addShortcode("youtube-playlist", function (id) {
        return `<div class="ratio ratio-16x9 mb-2"><iframe src="https://www.youtube.com/embed/videoseries?list=${id}" title="YouTube video" allowfullscreen></iframe></div>`;
    });

    eleventyConfig.addShortcode("video", function (url, imageExtension = "jpg", autoplay = "true") {

        const autoplayAttribute = autoplay === "true" ? "autoplay" : "";

        return `<div class="ratio ratio-16x9 mb-2"><video ${autoplayAttribute} controls loop preload="none" poster="${url.replace(".mp4", `.${imageExtension}`)}"><source src="${url}" type="video/mp4"></video></div>`;
    });

    eleventyConfig.addShortcode("video-fluid", function (url, imageExtension = "jpg", autoplay = "true") {

        const autoplayAttribute = autoplay === "true" ? "autoplay" : "";

        return `<video class="mb-2 img-fluid" ${autoplayAttribute} controls loop preload="none" poster="${url.replace(".mp4", `.${imageExtension}`)}"><source src="${url}" type="video/mp4"></video>`;
    });

    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.linkInsideHeader({
            symbol: "🔗",
            class: "direct-link"
        })
    }).use(markdownItToc, { includeLevel: [2, 3] });

    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addAsyncShortcode("remote_include", async function (url) {

        const sample = await eleventyFetch(url, {
            duration: "1d"
        });

        return sample;
    });

    //eleventyConfig.addAsyncShortcode("remote_include2", async function (urlPath) {
    //    const DOMAIN = "https://raw.githubusercontent.com/stride3d/stride/"
    //    if (urlPath.startsWith("/")) {
    //        // Make sure the `urlPath` doesn't start with `/` otherwise it will remove
    //        // the GitHub repo org/name from the path.
    //        urlPath = urlPath.slice(1);
    //    }
    //    const url = new URL(urlPath, DOMAIN).href;
    //    const sample = await eleventyFetch(url, {
    //        duration: "1d",
    //        type: "cs",
    //    });

    //    return sample;
    //});

    return {
        dir: {
            layouts: "_layouts"
        }
    };
}