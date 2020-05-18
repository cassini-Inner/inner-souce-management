var path = require("path");
var HtmlWebpackPlugin =  require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output : {
        path : path.resolve(__dirname , "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    mode:"development",
    module : {
        rules : [
            {test : /\.js$/, use:"babel-loader", exclude: /node_modules/},
            {test : /\.css$/, use:["style-loader", "css-loader"], exclude: /node_modules/},
            {test : /\.scss$/, use:["style-loader", "css-loader","sass-loader"], exclude: /node_modules/},
            {
                test: /\.(png|svg|jpg|jpeg|gif|tiff|ttf)$/,
                use: [
                    "file-loader?name=assets/[name].[ext]"
                ]
            },
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : __dirname +"/src/index.html",
            filename:"./index.html",
            inject: "body"
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    devtool: "cheap-module-eval-source-map"
};
