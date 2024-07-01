const glob = require("glob")
const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    mode: "development",
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // include specific files based on a RegExp
            include: /src/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
        new MiniCssExtractPlugin({ filename: '[name].bundle.min.css' , ignoreOrder: false}),
        new CopyPlugin({
            patterns: [
                { from: "src/app.html", to: "index.html" },
                { from: "src/pwa/", to: "pwa" },
                { from: "src/offline.manifest", to: "offline.manifest" },
                { from: "src/OfflineCacheServiceWorker.js", to: "OfflineCacheServiceWorker.js" }
            ],
            options: {
                concurrency: 100,
            }
        })
    ],
    entry: {
        "app-js": glob.sync('./src/js/*.js', { dotRelative: false }),
        "app-style": glob.sync('./src/css/*.css', { dotRelative: false })
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.min.js',
        // library: "$",
        // libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    resolve: {
        preferRelative: true
    }
}
