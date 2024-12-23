import { convertValue, hasNoValue } from "../../Helper";

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

    const [top, right, bottom, left] = values;
    switch (values.length) {
        case 2:
            return {
                top,
                right,
                bottom: top,
                left: right,
                synced: allowSync && "xy",
            };
        case 3:
            return {
                top,
                right,
                bottom,
                left: right,
                synced: allowSync && "x",
            };
    }

    const synced = allowSync ? (left === right ? "x" : "") + (top === bottom ? "y" : "") : null;
    return {
        top,
        right,
        bottom,
        left,
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
