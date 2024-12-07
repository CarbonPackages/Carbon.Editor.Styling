import { getNumberAndUnit, hasNoValue } from "../Helper";

export function getModeRaw({ value, allowFullRounded, fullRoundedValue, allowOrganic, allowMultiple }) {
    if (allowFullRounded && value && (value === `${fullRoundedValue}px` || value === fullRoundedValue)) {
        return "rounded";
    }

    if (typeof value === "string") {
        if (allowOrganic && value.includes("/")) {
            return "organic";
        }
        if (allowMultiple && value.includes(" ") && value.trim().split(" ").length === 4) {
            return "multiple";
        }
    }

    return "single";
}

export function getAspectRatio(input) {
    if (typeof input === "number") {
        return input;
    }

    if (typeof input !== "string") {
        return null;
    }

    return (0, eval)(input.replaceAll(":", "/"));
}

export function convertForCommit(number, unit, convertPxToRem, allowEmpty = false) {
    if (hasNoValue(number)) {
        return allowEmpty ? "" : "0";
    }

    const divider = !unit || unit === "px" ? (convertPxToRem ? 16 : 1) : 1;
    unit = !unit || unit === "px" ? (convertPxToRem ? "rem" : "px") : unit;

    const convertedNumber = number / divider;
    return convertedNumber === 0 ? "0" : `${convertedNumber}${unit}`;
}

export function getInitState(values, direction, key, fallback = null) {
    if (fallback === null) {
        fallback = key === "unit" ? "px" : null;
    }
    const config = values[direction];
    if (!config) {
        return fallback;
    }
    const value = config[key];
    return typeof value !== "undefined" ? value : fallback;
}

export function fromContentRepoToEditor(input) {
    const { value, convertPxToRem, min, max, allowPercentage, allowEmpty } = input;
    const mode = getModeRaw(input);
    if (mode === "rounded") {
        return {
            mode,
        };
    }

    if (mode === "organic") {
        return {
            mode,
            organic: value,
        };
    }

    if (mode === "single") {
        let main = "";
        if (typeof value === "number") {
            main = getNumberAndUnit(convertPxToRem ? value * 16 : value, min, max);
        } else {
            main = getNumberAndUnit(value, min, max, allowPercentage, allowEmpty);
        }
        return {
            mode,
            main,
        };
    }

    // Multiple mode is the last
    const values = value.split(" ").map((value) => getNumberAndUnit(value, min, max, allowPercentage));
    return {
        mode,
        topLeft: values[0],
        topRight: values[1],
        bottomRight: values[2],
        bottomLeft: values[3],
    };
}
