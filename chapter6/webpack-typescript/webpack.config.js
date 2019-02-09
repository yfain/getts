const { resolve } = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader' // picks up existing tsconfig.json
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ] // Add .ts extension to the resolve config to be able to import TS files in your source code.
    },
    target: 'node', // do not inline built-in modules (e.g. os, path, crypto, etc.)
    mode: 'production' // optimize the file size of the output bundle
};
