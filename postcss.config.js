const tailwindcss = require("tailwindcss");
console.log("Building CSS");
const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: [
        "./src/**/*.html",
        "./src/**/*.js",
        // etc.
    ],

    // This is the function used to extract class names from your templates
    defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

        return broadMatches.concat(innerMatches);
    }
});

module.exports = env => {
    return {
        plugins: [
            tailwindcss("./tailwind.config.js"),
            require("autoprefixer"),
            ... env.webpack && env.webpack.mode === "production"
                ? [purgecss]
                : []
        ]
    };
};
