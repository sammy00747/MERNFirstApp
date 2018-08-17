const config = {
   entry: './client/main.js', // entry point
   output: {
         filename: '../client/bundle.js' // place where bundled app will be served
   },
   module: {
         rules: [
            {
               test: /\.js?$/, // search for js files 
               exclude: /node_modules/,
               loader: 'babel-loader',
               query:   {
                  presets: ['es2015', 'react'] // use es2015 and react
               }
            }
         ]
   }
}

module.exports = config;