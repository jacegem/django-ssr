const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const debug = (process.env.NODE_ENV !== 'production');

const baseConfig = {
    context: __dirname,
    devtool: debug ? 'cheap-module-eval-source-map' : 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: { loader: 'css-loader' }
                }),
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin({ filename: `[name]-[hash].css` })
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', 'json'],
    }
};

const clientConfig = Object.assign({}, baseConfig, {
    entry: './js/ssr/index.js',

    output: {
        path: path.join(__dirname, './bundles/'),
        filename: `[name]-[hash].js`
    },

    plugins: baseConfig.plugins.concat([
        new BundleTracker({ filename: './webpack-stats.json' }),
    ]),
});

const serverConfig = Object.assign({}, baseConfig, {
    entry: './js/ssr/index.js',

    output: {
        path: path.join(__dirname, './server/'),
        filename: `[name]-[hash].js`
    },

    plugins: baseConfig.plugins.concat([
        new BundleTracker({ filename: './webpack-stats.server.json' }),
    ]),
});

if (!debug) {
    [clientConfig, serverConfig].forEach(conf => conf.plugins.push(...[
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: { screw_ie8: true },
            mangle: true,
            sourceMap: true,
        }),
    ]));
}

module.exports = [clientConfig, serverConfig];
