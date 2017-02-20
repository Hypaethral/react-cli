# jr-react-cli

Documenting the preferred project structure and setup for a new javascript payload

## Getting Started
1. make the project directory:

```
projname/
  assets/
  dist/
  src/
    actions/
    components/
      example-component/
        example-component.js
        example-component.styl
        example-component.test
    stores/
    utils/
    views/
```

2. initialize the project directory as a npm package:

`npm init`

3. add dependencies to package.json, example below:
```
{
  "name": "projname",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "webpack --config ./webpack.config.js"
  },
  "dependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",
    "reflux": "^6.2.0",
    "webpack": "2.2.1"
  },
  "devDependencies": {
    "awesome-typescript-loader": "^3.0.4",
    "source-map-loader": "^0.1.6",
    "typescript": "^2.1.6"
  }
}

```


4. add webpack.config file, example below:

```
const path = require('path');

const config = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ],
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  }
};

module.exports = config;
```

5. create a gitignore file (dist and .idea are primary candidates)

