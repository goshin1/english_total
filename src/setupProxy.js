const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/add',
        createProxyMiddleware({
            target : 'http://localhost:5000/',
            //target : 'https://port-0-english-server-3vw25lch3mal1.gksl2.cloudtype.app/',
            changeOrigin : true,
        })
    );
};