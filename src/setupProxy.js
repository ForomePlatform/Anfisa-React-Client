/* eslint-disable unicorn/filename-case */
const { createProxyMiddleware } = require('http-proxy-middleware')
const Routes = require('./router/routes')

const filter = function (pathname) {
  const isRoute = Object.values(Routes).find(route => route === pathname)

  if (
    isRoute ||
    pathname === '/manifest.json' ||
    pathname.match('hot-update.js') ||
    pathname.match('^/logo') ||
    pathname.match('^/static')
  ) {
    return false
  }

  return true
}

module.exports = function (app) {
  app.use(
    createProxyMiddleware(filter, {
      target: process.env.REACT_APP_URL_BACKEND,
      auth: process.env.REACT_APP_PROXY_AUTH || null,
      changeOrigin: true,
    }),
  )
}
