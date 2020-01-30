// rollup.config.js
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { module, main, unpkg } from './package.json';

export default {
    input: module,
    plugins: [
        babel({ exclude: 'node_modules/**' }) // convert to ES5
    ],

    // Define the module "jquery" to be excluded from the bundle.
    external: [
        'jquery',
        'zepto'
    ],
    output: [
        {
            file: main,
            name: 'jquery_class_loading',
            format: 'umd',
            sourcemap: true,
            globals: {
                jquery: 'jQuery',
                zepto: 'Zepto',
            }
        },
        {
            file: unpkg,
            name: 'jquery_class_loading',
            format: 'umd',
            sourcemap: true,
            globals: {
                jquery: 'jQuery',
                zepto: 'Zepto',
            },
            plugins: [
                terser(), // minify JS/ES
            ],
        },
    ]
};
