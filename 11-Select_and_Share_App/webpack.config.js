//DEVLOPMENT WORK FLOW CONFIG

//core nodeJS module
const path = require('path');

module.exports = {
  //point webpack to the main file (app.ts)
  //Remember to remove .js extensions in module exports in the .ts files
  entry: './src/app.ts',
  output: {
    
    //use [contenthash] to generate a new hash for each build (helps with caching of older versions in browsers)
    // filename: 'bundle[contenthash].js',
    filename: 'bundle.js',

    //absolute output path (should match 'outDir' path in .tsconfig)
    path: path.resolve(__dirname, 'dist'),

    //needed if using webpack-dev-server
    publicPath: 'dist',
  },

  mode: 'development', //or production

  //telling webkit that source maps should already exist (remember to check .tsconfig that 'sourceMaps: true' is set)
  devtool: 'inline-source-map',

  //telling webpack how to work with the files it finds (via loaders like ts-loader, which we installed via npm)
  module: {
    rules: [
      {
        //test specifies the file extensions to apply the rule to (regexp)
        test: /.*\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },

  //telling which file extensions it adds to the imports it finds
  resolve: {
    //look for .ts and .js files and bundle them together
    extensions: ['.ts', '.js'],
  }
}