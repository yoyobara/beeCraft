const { join } = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

module.exports = {
    output: {
        path: join(__dirname, 'dist'),
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'tsc',
            useTsconfigPaths: true,
            main: './src/server.ts',
            tsConfig: './tsconfig.app.json',
            optimization: false,
            outputHashing: 'none',
            generatePackageJson: true,
        }),
    ],
};
