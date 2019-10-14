const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // mode : 'development',
    mode : 'production',

    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    target: 'node',

    node: {
        // Need this when working with express, otherwise the build fails
        __filename: false,  // and __filename return blank or /
        __dirname: false,   // if you don't put this is, __dirname
        // fs: "empty",
        // net: "empty"
    },

    externals: [nodeExternals()], // Need this to avoid error when working with Express

    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [{loader: "html-loader"}]
            }
        ]
    },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./index.html",
    //         filename: "./index.html",
    //         excludeChunks: [ 'server' ]
    //     })
    // ]
};