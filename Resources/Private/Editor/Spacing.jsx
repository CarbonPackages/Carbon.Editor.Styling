import React, { useState, useEffect } from "react";
import { Button, Icon } from "@neos-project/react-ui-components";
import TextInput from "./Components/TextInput";
import RoundedBox from "./Components/RoundedBox";
import SpacingBox from "./Components/SpacingBox";
import { convertValue, limitToMinMax, hasNoValue } from "./Helper";
import { neos } from "@neos-project/neos-ui-decorators";
import { useDebounce } from "use-debounce";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    container: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
    },
    flexColumn: {
        flexDirection: "column",
    },
    highlight: {
        borderRadius: 2,
        outline: "2px solid var(--colors-Warn)",
        outlineOffset: 2,
    },
    segmentedGrid: {
        display: "grid",
        gap: "var(--spacing-Quarter)",
        width: "100%",
    },
    segmentedGridAll: {
        gridTemplate: `". top ." minmax(0, 1fr)
            "left middle right" minmax(0, 1fr)
            ". bottom ." minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)`,
    },
    segmentedGridOneLine: {
        gridTemplate: `"left middle right" minmax(0, 1fr) / minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)`,
    },
    segmentedGridTwoLinesTop: {
        gridTemplate: `". top ." minmax(0, 1fr)
            "left middle right" minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)`,
    },
    segmentedGridTwoLinesBottom: {
        gridTemplate: `"left middle right" minmax(0, 1fr)
            ". bottom ." minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)`,
    },
    segmentedGridTwoLinesTopBottom: {
        gridTemplate: `". top middle" minmax(0, 1fr)
            ". bottom middle" minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr)`,
    },
    area: (area) => ({
        gridArea: area,
    }),
    syncButton: {
        display: "grid",
        background: "var(--colors-ContrastDarker)",
        color: "var(--colors-ContrastBrightest)",
        cursor: "pointer",
        border: 0,
        padding: 0,
        borderRadius: 0,
        gridTemplate: `"content" minmax(0, 1fr) / minmax(0, 1fr)`,
        placeItems: "center",
        fill: "currentColor",
        ":where(:hover,:focus)": {
            color: "var(--colors-PrimaryBlue) !important",
            outline: 0,
        },
        ":focus-visible": {
            outline: "1px solid var(--colors-PrimaryBlue) !important",
        },
        ":where(*)>*": {
            gridArea: "content",
        },
    },
    syncButtonRight: {
        height: "65%",
        alignSelf: "center",
    },
    syncLineBackground: {
        background: "var(--colors-ContrastDarker)",
        height: "calc(100% - 15px)",
        width: "calc(100% - 15px)",
    },
    syncLineX: {
        background: "currentColor",
        height: "1px",
        width: "100%",
    },
    syncLineYRight: {
        border: "1px solid currentColor",
        background: "transparent",
        height: "100%",
        width: "15%",
        borderLeft: "0",
        marginLeft: "calc(-15% + 2px)",
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
    syncLineY: {
        background: "currentColor",
        height: "100%",
        width: "1px",
    },
    centerContent: {
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    fullInput: {
        flex: 1,
    },
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
        ":where(*)>*": {
            pointerEvents: "none",
        },
    },
    readonly: {
        pointerEvents: "none",
    },
    svgButton: (active) => ({
        ":where(*)>svg": {
            opacity: active ? 1 : 0.2,
        },
        ":is(:hover,:focus)>svg": {
            opacity: 1,
        },
    }),
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowEmpty: false,
    allowMultiple: false,
    allowSync: true,
    convertPxToRem: false,
    min: 0,
    max: null,
    placeholder: "",
};

function Editor({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);

    useEffect(() => {
        const newMode = getMode(value);
        if (mode !== newMode) {
            setMode(newMode);
        }
        if (newMode === "multiple" && !selected) {
            setSelected("all");
        }
    }, [value]);

    useEffect(() => {
        if (selected !== null) {
            return;
        }
    }, [selected]);

    const { disabled, readonly, allowEmpty, allowMultiple, allowSync, convertPxToRem, min, max, placeholder } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

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

    // Content repository to editor
    const values = (() => {
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
    })();

    function fallbackToNull(value) {
        return typeof value == "number" ? value : null;
    }

    const [mode, setMode] = useState(getMode(value));
    const [mainInputValue, setMainInputValue] = useState(fallbackToNull(values?.main));
    const [topInputValue, setTopInputValue] = useState(fallbackToNull(values?.top));
    const [rightInputValue, setRightInputValue] = useState(fallbackToNull(values?.right));
    const [bottomInputValue, setBottomInputValue] = useState(fallbackToNull(values?.bottom));
    const [leftInputValue, setLeftInputValue] = useState(fallbackToNull(values?.left));
    const [_syncedValue, setSyncedValue] = useState(values?.synced);
    const [syncedValue] = useDebounce(_syncedValue, 1000);

    useEffect(() => {
        if (mode === "single") {
            commitSingleValue();
            return;
        }
        commitMultipleValues();
    }, [mode]);

    function commitIfChanged(newValue) {
        if (newValue !== value) {
            commit(newValue);
        }
    }

    function convertForCommit(number) {
        const unit = convertPxToRem ? "rem" : "px";
        const divider = convertPxToRem ? 16 : 1;
        const convertedNumber = minMax(number) / divider;
        return convertedNumber == 0 ? "0" : `${convertedNumber}${unit}`;
    }

    function commitSingleValue() {
        if (mode !== "single") {
            return;
        }
        if (!hasNoValue(mainInputValue)) {
            commitIfChanged(convertForCommit(mainInputValue));
            return;
        }
        if (allowEmpty) {
            commitIfChanged("");
        }
    }

    function commitMultipleValues() {
        if (mode !== "multiple") {
            return;
        }
        const syncX = leftInputValue == rightInputValue;
        const syncY = topInputValue == bottomInputValue;
        if (syncX && syncY) {
            commitIfChanged(`${convertForCommit(topInputValue)} ${convertForCommit(leftInputValue)}`);
            return;
        }
        if (syncX) {
            commitIfChanged(
                `${convertForCommit(topInputValue)} ${convertForCommit(leftInputValue)} ${convertForCommit(bottomInputValue)}`,
            );
            return;
        }

        commitIfChanged(
            `${convertForCommit(topInputValue)} ${convertForCommit(rightInputValue)} ${convertForCommit(bottomInputValue)} ${convertForCommit(leftInputValue)}`,
        );
    }

    useEffect(commitSingleValue, [mainInputValue]);

    useEffect(commitMultipleValues, [topInputValue, rightInputValue, bottomInputValue, leftInputValue]);

    useEffect(() => {
        if (syncedValue == "y" || syncedValue == "xy") {
            setBottomInputValue(topInputValue);
        }
        if (syncedValue == "x" || syncedValue == "xy") {
            setRightInputValue(leftInputValue);
        }
    }, [syncedValue]);

    // Return the value if it is between min and max, otherwise return the min or max value
    function minMax(value) {
        return limitToMinMax(value, min, max);
    }

    function getMode(input) {
        if (allowMultiple && typeof input === "string" && value.includes(" ")) {
            return "multiple";
        }

        return "single";
    }

    useEffect(() => {
        if (potentailAllSelected && potentailAllSelected == selected) {
            setSelected("all");
        }
        setPotentialAllSelected(false);
    }, [potentailAllSelected]);

    return (
        <>
            value: "{value}" {segmentedGrid}
            <div {...stylex.props(styles.container, highlight && styles.highlight, disabled && styles.disabled)}>
                {mode === "multiple" ? (
                    <div {...stylex.props(styles.segmentedGrid, styles[segmentedGrid])}>
                        {multipleDirections.top && (
                            <TextInput
                                containerStyle={styles.area("top")}
                                id={id}
                                value={topInputValue}
                                unit="px"
                                readOnly={readonly}
                                placeholder={placeholder}
                                onEnterKey={onEnterKey}
                                type="number"
                                min={min}
                                max={max}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:top")}
                                onChange={(value) => {
                                    if (syncedValue == "y" || syncedValue == "xy") {
                                        setBottomInputValue(value);
                                    }
                                }}
                                onChangeDebounced={(value) => {
                                    value = minMax(value);
                                    setTopInputValue(value);
                                    if (syncedValue == "y" || syncedValue == "xy") {
                                        setBottomInputValue(value);
                                    }
                                }}
                                setFocus={selected == "top"}
                                fakeFocus={selected == "bottom" && (syncedValue == "y" || syncedValue == "xy")}
                                onFocus={() => setSelected("top")}
                                onBlur={() => setPotentialAllSelected("top")}
                            />
                        )}
                        {multipleDirections.right && (
                            <TextInput
                                containerStyle={styles.area("right")}
                                value={rightInputValue}
                                unit="px"
                                readOnly={readonly}
                                placeholder={placeholder}
                                onEnterKey={onEnterKey}
                                type="number"
                                min={min}
                                max={max}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:right")}
                                onChange={(value) => {
                                    if (syncedValue == "x" || syncedValue == "xy") {
                                        setLeftInputValue(value);
                                    }
                                }}
                                onChangeDebounced={(value) => {
                                    value = minMax(value);
                                    setRightInputValue(value);
                                    if (syncedValue == "x" || syncedValue == "xy") {
                                        setLeftInputValue(value);
                                    }
                                }}
                                setFocus={selected == "right"}
                                fakeFocus={selected == "left" && (syncedValue == "x" || syncedValue == "xy")}
                                onFocus={() => setSelected("right")}
                                onBlur={() => setPotentialAllSelected("right")}
                            />
                        )}
                        {multipleDirections.bottom && (
                            <TextInput
                                containerStyle={styles.area("bottom")}
                                value={bottomInputValue}
                                unit="px"
                                readOnly={readonly}
                                placeholder={placeholder}
                                onEnterKey={onEnterKey}
                                type="number"
                                min={min}
                                max={max}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:bottom")}
                                onChange={(value) => {
                                    if (syncedValue == "y" || syncedValue == "xy") {
                                        setTopInputValue(value);
                                    }
                                }}
                                onChangeDebounced={(value) => {
                                    value = minMax(value);
                                    setBottomInputValue(value);
                                    if (syncedValue == "y" || syncedValue == "xy") {
                                        setTopInputValue(value);
                                    }
                                }}
                                setFocus={selected == "bottom"}
                                fakeFocus={selected == "top" && (syncedValue == "y" || syncedValue == "xy")}
                                onFocus={() => setSelected("bottom")}
                                onBlur={() => setPotentialAllSelected("bottom")}
                            />
                        )}
                        {multipleDirections.left && (
                            <TextInput
                                containerStyle={styles.area("left")}
                                value={leftInputValue}
                                unit="px"
                                readOnly={readonly}
                                placeholder={placeholder}
                                onEnterKey={onEnterKey}
                                type="number"
                                min={min}
                                max={max}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:left")}
                                onChange={(value) => {
                                    if (syncedValue == "x" || syncedValue == "xy") {
                                        setRightInputValue(value);
                                    }
                                }}
                                onChangeDebounced={(value) => {
                                    value = minMax(value);
                                    setLeftInputValue(value);
                                    if (syncedValue == "x" || syncedValue == "xy") {
                                        setRightInputValue(value);
                                    }
                                }}
                                setFocus={selected == "left"}
                                fakeFocus={selected == "right" && (syncedValue == "x" || syncedValue == "xy")}
                                onFocus={() => setSelected("left")}
                                onBlur={() => setPotentialAllSelected("left")}
                            />
                        )}
                        {(allowSyncX || allowSyncY) && (
                            <button
                                type="button"
                                {...stylex.props(
                                    styles.area("middle"),
                                    styles.syncButton,
                                    segmentedGrid == "segmentedGridTwoLinesTopBottom" && styles.syncButtonRight,
                                )}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:snycValues")}
                                onClick={() => {
                                    const order = allowSyncX ? ["x"] : [];
                                    if (allowSyncY) {
                                        order.push("y");
                                    }
                                    if (allowSyncX && allowSyncY) {
                                        order.push("xy");
                                    }
                                    order.push(null);
                                    const currentIndex = order.indexOf(_syncedValue);
                                    const nextIndex = (currentIndex + 1) % order.length;
                                    setSyncedValue(order[nextIndex]);
                                }}
                            >
                                {(_syncedValue == "x" || _syncedValue == "xy") && (
                                    <span {...stylex.props(styles.syncLineX)}></span>
                                )}
                                {(_syncedValue == "y" || _syncedValue == "xy") && (
                                    <span
                                        {...stylex.props(
                                            segmentedGrid == "segmentedGridTwoLinesTopBottom"
                                                ? styles.syncLineYRight
                                                : styles.syncLineY,
                                        )}
                                    ></span>
                                )}
                                <span {...stylex.props(styles.syncLineBackground)}></span>
                                <Icon icon={_syncedValue ? "lock" : "lock-open"} />
                            </button>
                        )}
                    </div>
                ) : (
                    <TextInput
                        id={id}
                        value={mainInputValue}
                        unit="px"
                        readOnly={readonly}
                        placeholder={placeholder}
                        onEnterKey={onEnterKey}
                        type="number"
                        min={min}
                        max={max}
                        setFocus={mainFocus}
                        allowEmpty={allowEmpty}
                        onChange={(value) => {
                            if (allowEmpty && hasNoValue(value)) {
                                setMainInputValue(null);
                                return;
                            }
                            setMainInputValue(minMax(value));
                        }}
                        onBlur={() => setMainFocus(false)}
                        containerStyle={styles.fullInput}
                    />
                )}

                {allowMultiple && (
                    <div
                        {...stylex.props(
                            styles.container,
                            mode == "multiple" && segmentedGrid != "segmentedGridOneLine" && styles.flexColumn,
                        )}
                    >
                        <Button
                            onClick={() => {
                                if (mode == "multiple") {
                                    setSelected(null);
                                    setMode("single");
                                    setTimeout(() => {
                                        setMainFocus(true);
                                    }, 0);
                                    return;
                                }
                                setMainFocus(true);
                            }}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:globalSpacing")}
                            className={
                                stylex.props(
                                    styles.svgButton(mode == "single"),
                                    styles.centerContent,
                                    readonly && styles.readonly,
                                ).className
                            }
                        >
                            <RoundedBox
                                selected={selected}
                                style={stylex.props(styles.svgButton(mode == "single")).style}
                            />
                        </Button>
                        <Button
                            onClick={() => {
                                const order = [];
                                if (multipleDirections.top) {
                                    order.push("top");
                                }
                                if (multipleDirections.right) {
                                    order.push("right");
                                }
                                if (multipleDirections.bottom) {
                                    order.push("bottom");
                                }
                                if (multipleDirections.left) {
                                    order.push("left");
                                }
                                if (mode == "multiple") {
                                    const currentIndex = order.indexOf(selected);
                                    const nextIndex = (currentIndex + 1) % order.length;
                                    setSelected(order[nextIndex]);
                                    return;
                                }

                                const newValue = mainInputValue;

                                setSelected(order[0]);
                                if (topInputValue == null) {
                                    setTopInputValue(newValue);
                                }
                                if (rightInputValue == null) {
                                    setRightInputValue(newValue);
                                }
                                if (bottomInputValue == null) {
                                    setBottomInputValue(newValue);
                                }
                                if (leftInputValue == null) {
                                    setLeftInputValue(newValue);
                                }
                                setTimeout(() => {
                                    setMode("multiple");
                                }, 10);
                            }}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:spacingPerSide")}
                            className={
                                stylex.props(
                                    styles.svgButton(mode == "multiple"),
                                    styles.centerContent,
                                    readonly && styles.readonly,
                                ).className
                            }
                        >
                            <SpacingBox
                                selected={selected}
                                synced={_syncedValue}
                                directions={multipleDirections}
                                style={stylex.props(styles.svgButton(mode == "multiple")).style}
                            />
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.Spacing"),
}));

export default neosifier(Editor);
