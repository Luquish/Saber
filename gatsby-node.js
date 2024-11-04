const webpack = require('webpack');
const path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
    const config = getConfig();
    
    // Elimina la regla existente para archivos js/jsx/ts/tsx
    config.module.rules = config.module.rules.filter(
        rule => !(rule.test && rule.test.toString().includes('jsx'))
    );

    actions.setWebpackConfig({
        resolve: {
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                assert: require.resolve('assert/'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify/browser'),
                url: require.resolve('url/'),
                buffer: require.resolve('buffer/'),
                fs: false,
                path: false,
            },
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: 'defaults' }],
                                    '@babel/preset-react',
                                    '@babel/preset-typescript'
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime',
                                    '@emotion/babel-plugin'
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    });

    // Esto es importante para evitar el error de módulo
    if (stage === 'build-javascript' || stage === 'develop') {
        actions.setWebpackConfig({
            optimization: {
                moduleIds: 'named',
                chunkIds: 'named'
            }
        });
    }
}; 