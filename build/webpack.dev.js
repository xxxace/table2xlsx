const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
console.log(process.cwd());

module.exports = {
    mode: "development",
    entry: path.resolve(process.cwd(), "./src/main.ts"),
    output: {
        path: path.resolve(process.cwd(), "./dist"),
        filename: "[name].js",
        environment: {
            arrowFunction: false,
            const: false
        }
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
            }, 'ts-loader'],
            exclude: [/node_modules/, /types/]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'table2xlsx',
            template: path.resolve(process.cwd(), './public/index.html')
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".ts"]
    },
    performance: {hints: false},
    devServer: {
        port: "7788",
        compress: true
    }
}
