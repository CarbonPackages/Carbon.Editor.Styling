import React, { useState, useEffect } from "react";
import { injectNeosProps } from "../Helper/Neos";
import TextInput from "../Components/TextInput";
import DebugOutput from "../Components/DebugOutput";
import * as stylex from "@stylexjs/stylex";

const defaultOptions = {
    disabled: false,
    readonly: false,
    min: 0,
    max: null,
    subtractFromMax: 10,
};

const styles = stylex.create({
    container: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
        alignItems: "end",
    },
    field: {
        flexGrow: 1,
    },
    inputDivider: {
        display: "flex",
        minHeight: "var(--spacing-GoldenUnit)",
        alignItems: "center",
        justifyContent: "center",
    },
    fontMono: {
        fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    label: {
        fontSize: "var(--fontSize-Small)",
        WebkitFontSmoothing: "antialiased",
        cursor: "pointer",
        userSelect: "none",
        marginBottom: 4,
        padding: 0,
        display: "block",
    },
    textCenter: {
        textAlign: "center",
    },
});

function Timestamp({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const { disabled, readonly, min, max, subtractFromMax } = { ...defaultOptions, ...config, ...options };
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const updateHMS = (hms) => {
        if (hms.hours !== hours) {
            setHours(hms.hours);
        }
        if (hms.minutes !== minutes) {
            setMinutes(hms.minutes);
        }
        if (hms.seconds !== seconds) {
            setSeconds(hms.seconds);
        }
    };

    // Update on init
    useEffect(() => {
        updateHMS(secondsToHMS(value || 0));
    }, []);

    useEffect(() => {
        const total = minMaxSeconds(getTotalSeconds(hours, minutes, seconds), min, max, subtractFromMax);
        updateHMS(secondsToHMS(total));
        if (total !== value) {
            commit(total);
        }
    }, [hours, minutes, seconds]);

    const showMinutes = enableMinutes(value, min, max);

    return (
        <>
            <DebugOutput>VALUE: `{value}`</DebugOutput>
            <div {...stylex.props(styles.container)}>
                {enableHours(value, min, max) && (
                    <>
                        <div {...stylex.props(styles.field)}>
                            <label {...stylex.props(styles.label, styles.textCenter)} htmlFor={`${id}-hours`}>
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:hours")}
                            </label>
                            <TextInput
                                id={`${id}-hours`}
                                value={hours}
                                highlight={highlight}
                                disabled={disabled}
                                readonly={readonly}
                                type="number"
                                textAlign="center"
                                inputStyle={styles.fontMono}
                                min={0}
                                onChange={(value) => {
                                    setHours(parseInt(value, 10));
                                }}
                            />
                        </div>
                        <span {...stylex.props(styles.inputDivider, styles.fontMono)}>:</span>
                    </>
                )}
                {showMinutes && (
                    <>
                        <div {...stylex.props(styles.field)}>
                            <label {...stylex.props(styles.label, styles.textCenter)} htmlFor={`${id}-minutes`}>
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:minutes")}
                            </label>
                            <TextInput
                                id={`${id}-minutes`}
                                value={minutes}
                                highlight={highlight}
                                disabled={disabled}
                                readonly={readonly}
                                type="number"
                                textAlign="center"
                                inputStyle={styles.fontMono}
                                min={0}
                                onChange={(value) => {
                                    setMinutes(parseInt(value, 10));
                                }}
                            />
                        </div>
                        <span {...stylex.props(styles.inputDivider, styles.fontMono)}>:</span>
                    </>
                )}
                <div {...stylex.props(styles.field)}>
                    <label {...stylex.props(styles.label, showMinutes && styles.textCenter)} htmlFor={`${id}-seconds`}>
                        {i18nRegistry.translate("Carbon.Editor.Styling:Main:seconds")}
                    </label>
                    <TextInput
                        id={`${id}-seconds`}
                        value={seconds}
                        highlight={highlight}
                        disabled={disabled}
                        readonly={readonly}
                        type="number"
                        textAlign={showMinutes ? "center" : "left"}
                        inputStyle={styles.fontMono}
                        min={0}
                        onChange={(value) => {
                            setSeconds(parseInt(value, 10));
                        }}
                    />
                </div>
            </div>
        </>
    );
}

function getTotalSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

function minMaxSeconds(totalSeconds, min, max, subtractFromMax) {
    if (max && subtractFromMax) {
        max = max - subtractFromMax;
    }

    if (min !== null && totalSeconds < min) {
        return min;
    }
    if (max !== null && totalSeconds > max) {
        return max;
    }
    return totalSeconds;
}

function secondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
}

function enableField(threshold, totalSeconds, min, max) {
    if (totalSeconds >= threshold) {
        return true;
    }
    if (min !== null && min >= threshold) {
        return true;
    }
    if (max === null || max >= threshold) {
        return true;
    }
    return false;
}

function enableHours(totalSeconds, min, max) {
    return enableField(3600, totalSeconds, min, max);
}

function enableMinutes(totalSeconds, min, max) {
    return enableField(60, totalSeconds, min, max);
}

export default injectNeosProps(Timestamp, "Timestamp");
