const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.woff$|\.woff2$/,
            threshold: 10240,
            minRatio: 0.7,
        }),
        new BrotliPlugin({
            test: /\.js$|\.css$|\.html$|\.woff$|\.woff2$/,
            threshold: 10240,
            minRatio: 0.7,
        }),
    ],
});
