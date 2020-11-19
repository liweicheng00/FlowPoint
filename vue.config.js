module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
        }
    },
    devServer: {
        proxy: "http://192.168.1.109:5000"
    }
    // publicPath: '/templates/dist'
}