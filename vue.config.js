const path = require('path');
const { name } = require('./package');
const selectorNamespace = require('postcss-selector-namespace')

function resolve(dir) {
	return path.join(__dirname, dir);
}

const port = 3001; // dev port

module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: '/sub-app1',
	outputDir: 'dist',
	assetsDir: 'static',
	filenameHashing: true,
	productionSourceMap: false,
	// tweak internal webpack configuration.
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	devServer: {
		// host: '0.0.0.0',
		hot: true,
		disableHostCheck: true,
		port: port,
		overlay: {
			warnings: false,
			errors: true
		},
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	// 自定义webpack配置
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		output: {
			// 把子应用打包成 umd 库格式
			library: name,
			libraryTarget: 'umd',
			jsonpFunction: `webpackJsonp_${name}`
		}
	},
	css:{
		loaderOptions: {
			postcss: {
				plugins: [
					selectorNamespace({
						namespace() {
							/* 无需添加的样式 */
							return ".app1-class";
						}
					})
				]
			}
		}
	}
};
