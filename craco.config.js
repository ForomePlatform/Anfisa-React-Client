const { config } = require('dotenv-cra')
const CracoAlias = require('craco-alias')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const { parsed: env } = config()

const appEnv = {}

for (const [key, value] of Object.entries(env)) {
  if (key.startsWith('REACT_APP_')) {
    appEnv[key] = value
  }
}

module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use('/env-config.js', (req, res) => {
        res.setHeader('content-type', 'application/javascript')
        res.status(200).send(`window._env_=${JSON.stringify(appEnv)}`)
      })

      return middlewares
    },
    proxy: {
      '/app': {
        target: env.REACT_APP_URL_BACKEND,
        auth: env.REACT_APP_PROXY_AUTH || null,
        changeOrigin: true,
        pathRewrite: { '/app': '' },
      },
      '/igv-resource': {
        target: env.REACT_APP_IGV_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { '/igv-resource': '' },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
  style: {
    postcss: {
      // craco v6 doesn't support react-scripts@5.x.x
      // therefore we need to update loader options manually
      loaderOptions: postcssLoaderOptions => {
        const {
          postcssOptions,
          postcssOptions: { plugins },
        } = postcssLoaderOptions

        return {
          ...postcssLoaderOptions,
          postcssOptions: {
            ...postcssOptions,
            plugins: ['tailwindcss/nesting', ...plugins],
          },
        }
      },
    },
    css: {
      loaderOptions: options => {
        if ('modules' in options) {
          return {
            ...options,
            modules: {
              ...options.modules,
              exportLocalsConvention: className => [
                className,
                className.replace(/-./g, x => x[1].toUpperCase()),
              ],
            },
          }
        }

        return options
      },
    },
  },
  webpack: {
    plugins: {
      add: [ProgressBarPlugin()],
    },
  },
}
