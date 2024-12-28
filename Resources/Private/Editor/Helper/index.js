export function hasNoValue(value) {
    return (
        value == null ||
        value == undefined ||
        (typeof value === "string" && !value.trim().length) ||
        (typeof value === "number" && isNaN(value))
    );
}

export function getNumberAndUnit(input, min, max, allowPercentage = false, allowEmpty = false) {
    const defaultUnit = "px";
    if (typeof input == "string") {
        const match = input.match(/^(-?\d*\.?\d+)(.*)$/);
        const allowedUnits = [defaultUnit];
        if (allowPercentage) {
            allowedUnits.push("%");
        }
        // A match means, there is always a number at the start
        if (match) {
            let value = parseFloat(match[1]);
            let unit = match[2];
            if (allowPercentage && unit.startsWith("%")) {
                min = 0;
                max = 100;
                unit = "%";
            } else if (unit.startsWith("rem") || unit.startsWith("em")) {
                unit = "rem";
                value = value * 16;
            }
            if (!allowedUnits.includes(unit)) {
                unit = defaultUnit;
            }

            return {
                value: limitToMinMax(value, min, max),
                unit,
                min,
                max,
            };
        }
    }
    const noValueIsSet = hasNoValue(input);
    if (noValueIsSet) {
        input = 0;
    }
    return {
        value: allowEmpty && noValueIsSet ? null : limitToMinMax(input, min, max),
        unit: defaultUnit,
        min,
        max,
    };
}

export function convertValue(input, min, max) {
    const { value } = getNumberAndUnit(input, min, max);
    return value;
}

// Return the value if it is between min and max, otherwise return the min or max value
export function limitToMinMax(value, min, max) {
    if (typeof value == "string") {
        value = parseFloat(value);
    }
    if (!value || typeof value != "number") {
        value = 0;
    }
    value = Math.round(value);

    if (typeof min == "number") {
        value = Math.max(min, value);
    }
    if (typeof max == "number") {
        value = Math.min(max, value);
    }

    return value;
}
