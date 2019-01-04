const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    target: 'node', // do not inline built-in modules (e.g. os, path, crypto, etc.)
    mode: 'production' // optimize the file size of the output bundle
};
