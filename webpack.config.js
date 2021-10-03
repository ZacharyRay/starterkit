const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const path = require("path");
module.exports = {
    mode: "production",
    entry: "./assets/js/index.js",
    watch: true,
    output: {
        filename: "script.min.js",
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader, //3 Extract css into files
                    "css-loader", //2. Turns css into js
                    "postcss-loader",
                    "sass-loader" //1. Turns sass into css
                    
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["env"]
                  }
                }
              }
        ],
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '/style.min.css'}),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
    ],
    target: "es5"
}