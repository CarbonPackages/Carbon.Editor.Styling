import { getNumberAndUnit } from "../Helper";

export function fromContentRepoToEditor({ value, allowEmpty, borderStyles, minBorderWidth, maxBorderWidth }) {
    const [stringWidthUnit, style, color] = typeof value === "string" ? value.split(" ") : [];
    const { value: width } = getNumberAndUnit(stringWidthUnit, minBorderWidth, maxBorderWidth, false, allowEmpty);

    return {
        width,
        style: style || borderStyles[0],
        color: color || "currentColor",
    };
}

export function needDarkColor(color) {
    if (!color) {
        return false;
    }
    color = color.replace("#", "");
    if (color.length == 3) {
        color += color;
    }
    return parseInt(color, 16) > 0xffffff / 2 ? true : false;
}
