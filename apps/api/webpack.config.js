const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
    output: {
        path: join(__dirname, 'dist'),
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'tsc',
            main: './src/server.ts',
            tsConfig: './tsconfig.app.json',
            optimization: false,
            outputHashing: 'none',
            generatePackageJson: true,
        }),
    ],
};
