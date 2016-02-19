const webpack = require('webpack');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve( __dirname, '../server/dist/public' ),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	plugins: [
    new HtmlWebpackPlugin({
      title: "Capsule Wardrobe"
    }),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
    })],
	module: {
		preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|lib/,
                loader: "jshint-loader"
            }
        ],
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.css$/,loader: 'style!css'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			    query: {
			      presets: ['es2015']
			    }
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
      {
        test: /isotope\-|fizzy\-ui\-utils|desandro\-|masonry|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
		]
	},
  jshint: {
    esversion: 6
  }
};
