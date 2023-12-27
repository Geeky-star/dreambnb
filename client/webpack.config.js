/*
module.exports =(env)=> {
   
  console(env);
  return {
    plugins: [
      new Dotenv()
    ],
    resolve: {
      fallback: { 'path': require.resolve('path-browserify') },
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
   }
  }

};
*/
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
	// Other rules...
	plugins: [
		new NodePolyfillPlugin()
	]
};