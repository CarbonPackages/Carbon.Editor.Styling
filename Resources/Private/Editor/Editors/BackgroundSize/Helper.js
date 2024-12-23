import { getNumberAndUnit } from "../../Helper";

export function fromContentRepoToEditor({ value, min, max, allowPercentage, allowContain, allowAuto, allowCover }) {
    if (allowAuto && value === "auto") {
        return {
            mode: "auto",
        };
    }
    if (allowContain && value === "contain") {
        return {
            mode: "contain",
        };
    }
    if (allowCover && value === "cover") {
        return {
            mode: "cover",
        };
    }

    const { value: size, unit: mode } = getNumberAndUnit(value, min, max, allowPercentage, false);

    return {
        mode,
        size,
    };
}
