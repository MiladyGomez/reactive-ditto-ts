const path = require('path');
const webpack = require("webpack");
require('dotenv').config();

module.exports = {
    entry: ['./src/app.tsx'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: 'auto'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@containers': path.resolve(__dirname, 'src/containers/'),
            '@fonts': path.resolve(__dirname, 'src/fonts/'),
            '@layout': path.resolve(__dirname, 'src/Layout/'),
            '@ui': path.resolve(__dirname, 'src/UI/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@interface': path.resolve(__dirname, 'src/interface/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        })
    ],
    ignoreWarnings: [
        (warning) => warning.message.includes('Sass @import rules are deprecated'),
        (warning) => warning.message.includes('Deprecation The legacy JS API is deprecated')
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.module\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader", 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            }
                        }
                    }, 
                    "sass-loader"
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: ["style-loader", 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
                type: "asset"
            }
        ]
    }
}