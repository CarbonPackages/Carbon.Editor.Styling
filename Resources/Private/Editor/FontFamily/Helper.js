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

function generateFontObject(key, item, enableFallback) {
    const label = item.label || key;
    const fallback = item.fallback ? item.fallback : "";
    const type = item.type || determineFontType(fallback);
    const fontFile = getFilePath(item.fontFile);
    const cssFile = getFilePath(item.cssFile);
    const value = `${key}${enableFallback && fallback ? `, ${fallback}` : ""}`;
    const fontStyle = item.fontStyle || "normal";
    const fontWeight = item.fontWeight || 400;
    const importCSS = cssFile ? `@import url("${cssFile}");` : "";
    const fontFace = fontFile ? generateFontFaceCSS(key, fontFile, fontWeight, fontStyle, item.fontFileFormat) : "";

    return { label, fallback, fontFile, fontStyle, fontWeight, cssFile, value, importCSS, fontFace, type };
}

export function getFontCollection(fonts, enableFallback, placeholderFont) {
    const object = {
        importCSS: "",
        fontFace: "",
        fonts: {},
        flat: {},
    };
    if (placeholderFont && placeholderFont.name) {
        const { importCSS, fontFace } = generateFontObject(placeholderFont.name, placeholderFont, enableFallback);
        if (importCSS) {
            object.importCSS = importCSS;
        }
        if (fontFace) {
            object.fontFace = fontFace;
        }
    }
    for (const key in fonts) {
        const item = fonts[key];
        if (!item) {
            continue;
        }
        const { importCSS, fontFace, type, ...result } = generateFontObject(key, item, enableFallback);

        if (importCSS) {
            object.importCSS = `${object.importCSS}${importCSS}`;
        }
        if (fontFace) {
            object.fontFace = `${object.fontFace}${fontFace}`;
        }

        if (!object.fonts[type]) {
            object.fonts[type] = {};
        }
        object.flat[key] = result;
        object.fonts[type][key] = result;
    }
    return object;
}
