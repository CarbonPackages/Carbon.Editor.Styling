function getFilePath(file) {
    if (!file || typeof file !== "string") {
        return null;
    }
    if (file.startsWith("resource://")) {
        return file.replace("resource://", "/_Resources/Static/Packages/");
    }
    return file;
}

export function getFontCollection(fonts, enableFallback) {
    const object = {};
    for (const key in fonts) {
        const item = fonts[key];
        if (!item) {
            continue;
        }

        const label = item.label || key;
        const fallback = enableFallback && item.fallback ? item.fallback : "";
        const fontFile = getFilePath(item.fontFile);
        const cssFile = getFilePath(item.cssFile);
        const value = `${key}${fallback ? `, ${fallback}` : ""}`;
        let css = null;
        let cssImports = null;
        if (fontFile) {
            const format = item.format || fontFile.split(".").pop();
            const fontStyle = item.fontStyle || "normal";
            const fontWeight = item.fontWeight || 400;
            css = `@font-face{font-family:${key};font-weight:${fontWeight};font-style:${fontStyle};font-display:swap;src:url("${fontFile}") format("${format}")}`;
        }
        if (cssFile) {
            cssImports = `@import url("${cssFile}");`;
        }
        object[key] = { label, fallback, fontFile, cssFile, value, css, cssImports };
    }
    return object;
}
