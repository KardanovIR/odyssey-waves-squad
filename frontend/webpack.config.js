const webpack = require('webpack');
const copy = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OUT_PATH = path.resolve(__dirname, 'dist');

const MODE =  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = () => {

    return {
        entry: {
            app: './src/index.tsx'
        },
        mode: MODE,
        output: {
            filename:'[name].[hash].bundle.js',
            // chunkFilename: '[name].[chunkhash].bundle.js',
            publicPath: '/',
            path: OUT_PATH,
            pathinfo: false
        },
        plugins: [
            new copy([
                {from: 'assets'},
                {from: 'node_modules/react/umd/react.production.min.js'},
                {from: 'node_modules/react-dom/umd/react-dom.production.min.js'}
            ]),
            new HtmlWebpackPlugin({
                template: 'template.html',
                hash: true,
                production: MODE === 'production'
            }),
            new CleanWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin()
        ],

        //Enable sourcemaps for debugging webpack's output.
        devtool: MODE === 'development' ? 'eval-source-map' : undefined,

        resolve: {
            //Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css'],
            alias: {
                '@components': path.resolve(__dirname, "./src/components"),
                '@src': path.resolve(__dirname, "./src"),
                '@store': path.resolve(__dirname, "./src/store"),
                '@utils': path.resolve(__dirname, "./src/utils")
            }
        },
        stats: {
            warningsFilter: /export .* was not found in/
        },
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            sequences: true,
                            dead_code: true,
                            conditionals: true,
                            booleans: true,
                            unused: true,
                            if_return: true,
                            join_vars: true,
                            drop_console: true
                        }
                    }
                })
            ]
        },

        module: {
            rules: [
                {
                    test: /\.(png|jpg|svg|gif)$/,
                    loader: "url-loader?limit=1000&name=assets/img/[name].[ext]",
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                experimentalWatchApi: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                // Necessary for external CSS imports to work
                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-inline-svg'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                    ],
                },
            ]
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        },
        devServer: {
            historyApiFallback: true
        }
    }
};
