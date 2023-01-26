const { useBabelRc, override, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  config => ({
    ...config,
    output: {
      ...config.output,
      globalObject: 'this'
    }
  }),
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: [
      { loader: 'worker-loader' },
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  })
)
