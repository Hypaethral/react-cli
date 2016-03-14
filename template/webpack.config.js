module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    entry: [
      'babel-polyfill',
      './app/main.js'
    ],
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-3'],
          plugins: ['syntax-async-functions', 'transform-regenerator', 'transform-runtime']
        }
      }]
    }
  };

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
};