const { join } = require('path');
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { NxReactWebpackPlugin } = require('@nx/react/webpack-plugin');

module.exports = {
    output: {
        path: join(__dirname, 'dist'),
    },
    devServer: {
        port: 4200,
        historyApiFallback: {
            index: '/index.html',
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        },
        proxy: [
            {
                context: ["/api"],
                target: "http://localhost:3333/",
                pathRewrite: { '^/api': '' },
            }
        ]
    },
    plugins: [
        new NxAppWebpackPlugin({
            tsConfig: './tsconfig.app.json',
            useTsconfigPaths: true,
            compiler: 'babel',
            main: './src/main.tsx',
            index: './src/index.html',
            baseHref: '/',
            assets: ['./src/favicon.ico', './src/assets'],
            outputHashing:
                process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
            optimization: process.env['NODE_ENV'] === 'production',
        }),
        new NxReactWebpackPlugin({
            // Uncomment this line if you don't want to use SVGR
            // See: https://react-svgr.com/
            // svgr: false
        }),
    ],
};
