const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve( __dirname, '../server/public' ),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	plugins: [new HtmlWebpackPlugin({
    title: 'Webpack App Practice'
  })],
	module: {
		preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			    query: {
			      presets: ['es2015']
			    }
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.html$/,
				loader: 'html'
			}
		]
	},
  jshint: {
    esversion: 6
  }
};
