module.exports = {
    devServer : {
        proxy : {
            "^/todos" : {
                target : "http://localhost:4003",
                changeOrigin: true,
                ws : true
            }
        }
    }
}
