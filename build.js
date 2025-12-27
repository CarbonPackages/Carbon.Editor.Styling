import esbuild from "esbuild";
import extensibilityMap from "@neos-project/neos-ui-extensibility/extensibilityMap.json" with { type: "json" };
import stylex from "@stylexjs/unplugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const watch = process.argv.includes("--watch");
const dev = process.argv.includes("--dev");
const minify = !dev && !watch;

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    minify,
    sourcemap: watch,
    target: "es2020",
    legalComments: "none",
    entryPoints: ["Resources/Private/Editor/*.js", "Resources/Private/Editor/Editor.jsx"],
    outdir: "Resources/Public",
    alias: extensibilityMap,
    format: "esm",
    splitting: true,
    loader: {
        ".js": "jsx",
    },
    metafile: true,
    plugins: [
        stylex.esbuild({
            useCSSLayers: false,
            importSources: ["@stylexjs/stylex"],
            unstable_moduleResolution: { type: "commonJS" },
            classNamePrefix: "editorstyling-",
            dev: false,
        }),
    ],
};

if (minify) {
    options.drop = ["debugger"];
    options.pure = ["console.log"];
    options.dropLabels = ["DEV"];
}

if (watch) {
    esbuild.context(options).then((ctx) => ctx.watch());
} else {
    esbuild.build(options);
}
