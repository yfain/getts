const { resolve } = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.bundle.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ] // Add .ts extension to the resolve config to be able to import TS files in your source code.
    },
    target: 'node', // do not inline built-in modules (e.g. os, path, crypto, etc.)
    mode: 'production' // optimize the file size of the output bundle
};
