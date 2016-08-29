const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: './public/app/app.js',
    output: {
        path: './public/build',
        filename: 'app.js'
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel?presets[]=es2015'
        }, {
            test: /\.css$/,
            exclude: /(node_moduless\/(?!angular))/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        }]
    },
    watch: true,
    plugins: [
        new ExtractTextPlugin("main.css")
    ]
};

module.exports = config;
