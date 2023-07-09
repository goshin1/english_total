const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/add',
        createProxyMiddleware({
            target : `${process.env.REACT_APP_ROUTER_HOST}`,
            changeOrigin : true,
        })
    );
};