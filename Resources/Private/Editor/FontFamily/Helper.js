function getFilePath(file) {
    if (!file || typeof file !== "string") {
        return null;
    }
    if (file.startsWith("resource://")) {
        return file.replace("resource://", "/_Resources/Static/Packages/");
    }
    return file;
}

function determineFontType(fallback) {
    if (fallback.includes("sans-serif")) return "sans-serif";
    if (fallback.includes("serif")) return "serif";
    if (fallback.includes("monospace")) return "monospace";
    if (fallback.includes("cursive")) return "cursive";
    if (fallback.includes("fantasy")) return "fantasy";
    return "sans-serif";
}

function generateFontFaceCSS(key, fontFile, fontWeight, fontStyle, fontFileFormat) {
    const format = fontFileFormat || fontFile.split(".").pop();
    return `@font-face{font-family:${key};font-weight:${fontWeight};font-style:${fontStyle};font-display:swap;src:url("${fontFile}") format("${format}")}`;
}

export function getFontCollection(fonts, enableFallback) {
    const object = {
        importCSS: "",
        fontFace: "",
        fonts: {},
        flat: {},
    };
    for (const key in fonts) {
        const item = fonts[key];
        if (!item) {
            continue;
        }
        const label = item.label || key;
        const fallback = item.fallback ? item.fallback : "";
        const type = item.type || determineFontType(fallback);
        const fontFile = getFilePath(item.fontFile);
        const cssFile = getFilePath(item.cssFile);
        const value = `${key}${enableFallback && fallback ? `, ${fallback}` : ""}`;
        const fontStyle = item.fontStyle || "normal";
        const fontWeight = item.fontWeight || 400;

        if (cssFile) {
            object.importCSS = `${object.importCSS}@import url("${cssFile}");`;
        }
        if (fontFile) {
            object.fontFace = `${object.fontFace}${generateFontFaceCSS(key, fontFile, fontWeight, fontStyle, item.fontFileFormat)}`;
        }

        const result = { label, fallback, fontFile, fontStyle, fontWeight, cssFile, value };

        if (!object.fonts[type]) {
            object.fonts[type] = {};
        }
        object.flat[key] = result;
        object.fonts[type][key] = result;
    }
    return object;
}
