const SentryCliPlugin = require('@sentry/webpack-plugin');
module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8080,
        public: '0.0.0.0:8080'
    },
    publicPath: "/",
    productionSourceMap: true,
    configureWebpack: {
        plugins: [
            new SentryCliPlugin({
                include: './dist',
                ignoreFile: '.sentryignore',
                ignore: ['node_modules', 'webpack.config.js'],
                release: process.env.VUE_APP_RELEASE,
                dryRun: true
            }),
        ],
    }
}
