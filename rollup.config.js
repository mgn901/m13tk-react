import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';

// Demo向けのプラグイン

let pluginsDemoTS = [
	replace({
		'process.env.NODE_ENV': JSON.stringify(process.env.BUILD),
	}),
	typescript({
		outDir: './demo',
		declaration: false,
		sourceMap: process.env.BUILD === 'development',
	}),
	nodeResolve(),
	commonjs(),
];

let pluginsDemo = [
	...pluginsDemoTS,
	scss({
		output: './demo/style.css',
		outputStyle: 'compressed',
		watch: './src/style.scss',
	}),
];

if (process.env.BUILD === 'development') {
	pluginsDemo.push(serve({
		contentBase: ['./demo', './'],
		port: 10001,
	}));
}

// モジュール向けのプラグイン

// デモ向けの設定

const generateConfigDemo = (input) => {
	return {
		input,
		output: {
			dir: './demo',
			format: 'umd',
			name: 'm13TKReact',
			sourcemap: process.env.BUILD === 'development',
		},
		plugins: pluginsDemo,
	};
};

// モジュール向けの設定

let config = [
	generateConfigDemo('./src/m13tk-react.tsx'),
];

export default config;
