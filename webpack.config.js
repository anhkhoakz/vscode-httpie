import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

/** @type {import("webpack").Configuration} */
const extensionConfig = {
        target: "node",
        mode: "production",

        entry: "./src/extension.ts",
        output: {
                path: resolve(__dirname, "dist"),
                filename: "extension.js",
                libraryTarget: "commonjs2",
        },
        externals: {
                vscode: "commonjs vscode",
        },
        resolve: {
                extensions: [".ts", ".js"],
        },
        module: {
                rules: [
                        {
                                test: /\.ts$/,
                                exclude: /node_modules/,
                                use: [
                                        {
                                                loader: "ts-loader",
                                        },
                                ],
                        },
                ],
        },
        devtool: "nosources-source-map",
        infrastructureLogging: {
                level: "log",
        },
};
export default [extensionConfig];
