const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production' ? true : false;
// const MxBuildPlugin = require('./build.js');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const sourceMapEnabled = true;

console.log(process.env.VUE_APP_NODE_TYPE);
console.log(process.env.NODE_ENV);

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	devServer: {
		// host: '127.0.0.1',
		port: 8090
		// https: false,
		// hotOnly: false,
		// proxy: null, // 设置代理
		// before: app => { }
	},
	css: {
		loaderOptions: {
			less: {
				// 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
				lessOptions: {
					modifyVars: {
						// 直接覆盖变量
						'background-color': '#e53333',
						'text-color': '#fff',
						color: '#e53333'
						// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
						// hack: `true; @import "your-less-file-path.less";`,
					}
				}
			}
		}
	},
	configureWebpack: (config) => {
		let plugins = [];
		if (!isProd) {
			plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_console: true,
							drop_debugger: false,
							pure_funcs: [ 'console.log' ] //移除console
						}
					},
					sourceMap: false,
					parallel: true
				})
			);
			// plugins.push(
			//   new CompressionWebpackPlugin({
			//     filename: '[path].gz[query]',
			//     algorithm: 'gzip',
			//     test: productionGzipExtensions,
			//     threshold: 10240,
			//     minRatio: 0.8,
			//   }),
			// );
			// plugins.push(new MxBuildPlugin());
		}
		config.plugins = [ ...config.plugins, ...plugins, new LodashModuleReplacementPlugin() ];
	},
	chainWebpack: (config) => {
		config.plugin('provide').use(webpack.ProvidePlugin, [
			{
				$conf: resolve('src/projectConfig.js')
			}
		]);
		//修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
		config.plugin('html').tap((args) => {
			args[0].title = '500CP';
			return args;
		});
		// config.optimization.minimize(!sourceMapEnabled);
	}
};
