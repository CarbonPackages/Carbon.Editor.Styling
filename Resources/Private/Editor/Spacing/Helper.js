import { convertValue, hasNoValue } from "../Helper";

export function fromContentRepoToEditor({ value, min, max, allowEmpty, allowMultiple, allowSync }) {
    if (typeof value == "number") {
        return {
            main: convertValue(value, min, max),
        };
    }
    if (hasNoValue(value)) {
        return {
            main: allowEmpty ? null : min,
        };
    }
    // After running hasNoValue, we can assume that value is a string
    const values = value.split(" ").map((value) => convertValue(value, min, max));

    if (!allowMultiple || values.length == 1) {
        return {
            main: values[0],
        };
    }

    if (values.length == 2) {
        return {
            top: values[0],
            right: values[1],
            bottom: values[0],
            left: values[1],
            synced: allowSync && "xy",
        };
    }

    if (values.length == 3) {
        return {
            top: values[0],
            right: values[1],
            bottom: values[1],
            left: values[1],
            synced: allowSync && "x",
        };
    }

    const allValues = {
        top: values[0],
        right: values[1],
        bottom: values[2],
        left: values[3],
    };
    const synced = allowSync
        ? (allValues.left == allValues.right ? "x" : "") + (allValues.top == allValues.bottom ? "y" : "")
        : null;

    return {
        ...allValues,
        synced: synced || null,
    };
}

export function multipleSettings({ allowMultiple, allowSync }) {
    const specialMultipleSettings = typeof allowMultiple === "string";
    const multipleDirections = {
        top: specialMultipleSettings ? allowMultiple.includes("top") : allowMultiple,
        right: specialMultipleSettings ? allowMultiple.includes("right") : allowMultiple,
        bottom: specialMultipleSettings ? allowMultiple.includes("bottom") : allowMultiple,
        left: specialMultipleSettings ? allowMultiple.includes("left") : allowMultiple,
    };
    const hasYAxies = multipleDirections.top && multipleDirections.bottom;
    const allowSyncX = allowSync && multipleDirections.left && multipleDirections.right;
    const allowSyncY = allowSync && hasYAxies;
    let segmentedGrid =
        hasYAxies && (multipleDirections.left || multipleDirections.right)
            ? "segmentedGridAll"
            : "segmentedGridTwoLinesTopBottom";
    // Top and bottom are disabled, everything fits in one line
    if (!multipleDirections.top && !multipleDirections.bottom) {
        segmentedGrid = "segmentedGridOneLine";
    }
    // Either top or bottom is disabled
    if (!hasYAxies && segmentedGrid == "segmentedGridTwoLinesTopBottom") {
        segmentedGrid = multipleDirections.top ? "segmentedGridTwoLinesTop" : "segmentedGridTwoLinesBottom";
    }

    // Add sync variants
    if (
        (allowSyncY && segmentedGrid === "segmentedGridTwoLinesTopBottom") ||
        (allowSyncX && segmentedGrid === "segmentedGridOneLine")
    ) {
        segmentedGrid += "Sync";
    }

    return {
        multipleDirections,
        allowSyncX,
        allowSyncY,
        segmentedGrid,
    };
}

export const numberOrNull = (value) => (typeof value == "number" ? value : null);
