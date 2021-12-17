const path = require("path");
const ProgressWebpackPlugin = require("progress-bar-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: path.resolve(process.cwd(), "./src/components/Table2Xlsx.ts"),
    output: {
        path: path.resolve(process.cwd(), "./lib"),
        filename: "[name].js",
        chunkFilename: '[id].js',
        libraryExport: 'default',
        library: 'table2xlsx',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: ['node_modules']
    },
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/env",
                            {
                                targets: {
                                    ie: '11'
                                },
                                corejs: "3",
                                useBuiltIns: 'usage'
                            }
                        ]
                    ]
                }
            }, 'ts-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressWebpackPlugin()
    ]
}
