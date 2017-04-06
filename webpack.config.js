module.exports = {
 entry: './index.tsx',
 output: {
   filename: 'bundle.js',
   path: __dirname + "/build/"
 },
 module: {
   rules: [
       {
       enforce: 'pre',
       test: /\.js$/,
       loader: "source-map-loader"
     },
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },

 devServer: {
  contentBase: __dirname + "/build",
  compress: true,
  port: 9876
}
};