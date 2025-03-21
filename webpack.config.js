const Dotenv = require('dotenv-webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
            ]
        },
        externals: {
            '@adsk/cfp-core/client': ['cfp', 'vendors', '@adsk/cfp-core/client@2'],
            react: ['cfp', 'vendors', 'react@18'],
            'react/jsx-runtime': ['cfp', 'vendors', 'react/jsx-runtime@18'],
            'react-dom': ['cfp', 'vendors', 'react-dom@18'],
            redux: ['cfp', 'vendors', 'Redux'],
            'redux-saga': ['cfp', 'vendors', 'ReduxSaga']
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'static/js/[name].js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                '@mui/x-license-pro': false // This prevents Webpack from trying to resolve it
              },
            extensions: ['.js', '.jsx'],
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src')
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                favicon: 'public/favicon.svg',
                inject: 'head',
                scriptLoading: 'blocking',
                template: 'public/index.html'
            }),
        ]
    }
};
