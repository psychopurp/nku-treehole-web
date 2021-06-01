const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://120.53.250.69:9090",
      changeOrigin: true,
    })
  );
};
