import esbuild from "esbuild";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" assert { type: "json" };
import { cssModules } from "esbuild-plugin-lightningcss-modules";

const watch = process.argv.includes("--watch");

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    minify: !watch,
    sourcemap: false,
    target: "es2020",
    legalComments: "none",
    entryPoints: { Editor: "Resources/Private/Editor/manifest.mjs" },
    outdir: "Resources/Public",
    alias: extensibilityMap,
    format: "esm",
    splitting: true,
    loader: {
        ".js": "jsx",
    },
    plugins: [
        cssModules({
            targets: {
                chrome: 80, // aligns somewhat to es2020
            },
        }),
    ],
}

if (watch) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
