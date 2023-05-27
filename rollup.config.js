import {fileURLToPath} from 'node:url';
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {terser} from "rollup-plugin-terser";
import path from 'node:path'
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolve = p => path.resolve(__dirname, p);
const input = [resolve('src/components/index.ts')];
const pkg = require(resolve("package.json"));

// , {
//     input,
//     output: [{
//         dir: `lib/${pkg.name}.cjs.js`,
//         name: pkg.name,
//         format: 'cjs',
//         exports: 'named',
//         sourcemap: true
//     }],
//     plugins: [
//         commonjs(),
//         typescript(),
//         nodeResolve()
//     ]
// }

export default [{
    input,
    output: {
        name: pkg.name,
        file: `lib/${pkg.name}.js`,
        format: 'umd',
        sourcemap: false,
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        babel({
            babelHelpers: "bundled",
            exclude: 'node_modules/**'
        }),
        terser()
    ]
}]
