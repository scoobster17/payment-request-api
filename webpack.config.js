const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => { return ['bin'].indexOf(x) === -1 })
    .forEach(mod => { nodeModules[mod] = 'commonjs ' + mod });

module.exports = [

    // Client JavaScript
    {
        devtool: 'source-map',
        entry: path.join(__dirname, 'src', 'js', 'app.js'),
        output: {
            path: path.join(__dirname, 'dist', 'js'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: [
                        path.join(__dirname, 'dist'),
                        path.join(__dirname, 'node_modules'),
                        path.join(__dirname, 'src', 'css')
                    ],
                    loader: ['babel-loader']
                }
            ]
        }
    },

    // Server JavaScript
    {
        devtool: 'source-map',
        entry: path.join(__dirname, 'server.es2015.js'),
        target: 'node',
        node: {
            __dirname: true
        },
        externals: nodeModules,
        output: {
            path: __dirname,
            filename: 'server.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: ['babel-loader']
                }
            ]
        }
    }
]