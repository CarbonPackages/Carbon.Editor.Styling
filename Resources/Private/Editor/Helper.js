export const isSegmented = (value) => typeof value == "string" && value.includes(" ");

export const convertValue = (input, rem, min, max) => {
    if (typeof input == "string") {
        input = parseFloat(input);
    }
    const multiplier = rem ? 16 : 1;
    return limitToMinMax(input * multiplier, min, max);
};

// Return the value if it is between min and max, otherwise return the min or max value
export function limitToMinMax(value, min, max) {
    if (typeof value == "string") {
        value = parseInt(value);
    }
    if (!value) {
        value = 0;
    }
    value = Math.round(value);
    if (!max) {
        return Math.max(min, value);
    }
    return Math.min(Math.max(min, value), max);
}
