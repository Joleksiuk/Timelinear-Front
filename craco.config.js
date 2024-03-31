const path = require('path')
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|svg|gif)$/,
                    use: ['file-loader'],
                },
            ],
        },
    },
}
