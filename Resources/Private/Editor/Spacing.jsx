import React, { useState, useEffect } from "react";
import { Button, Icon } from "@neos-project/react-ui-components";
import TextInput from "./Components/TextInput";
import RoundedBox from "./Components/RoundedBox";
import SpacingBox from "./Components/SpacingBox";
import { isSegmented, convertValue, limitToMinMax } from "./Helper";
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
        gridTemplate: `". top ." minmax(0, 1fr)
            "left middle right" minmax(0, 1fr)
            ". bottom ." minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)`,
        gap: "var(--spacing-Quarter)",
        width: "100%",
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
        ":hover": {
            color: "var(--colors-PrimaryBlue)",
        },
        ":focus": {
            outline: "1px solid var(--colors-PrimaryBlue)",
        },
        ":where(*)>*": {
            gridArea: "content",
        },
    },
    syncLineBackground: {
        background: "var(--colors-ContrastDarker)",
        height: "calc(100% - 12px)",
        width: "calc(100% - 12px)",
    },
    syncLineX: {
        background: "currentColor",
        height: "1px",
        width: "100%",
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
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowMultiple: false,
    allowSync: true,
    convertToRem: false,
    min: 0,
    max: null,
    placeholder: "",
};

function Editor({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const [segmented, setSegmented] = useState(null);
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);

    useEffect(() => {
        const bool = isSegmented(value);
        setSegmented(bool);
        setSelected(bool && !selected ? "all" : selected);
    }, [value]);

    useEffect(() => {
        if (selected !== null) {
            return;
        }
    }, [selected]);

    const { disabled, readonly, allowMultiple, allowSync, convertToRem, min, max, placeholder } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    // Content repository to editor
    const values = (() => {
        const valueIsString = typeof value == "string";
        const valueIsRem = valueIsString && value.includes("rem");
        if (typeof value == "number") {
            return {
                main: convertValue(value, convertToRem, min, max),
            };
        }
        if (!valueIsString || !value) {
            return {
                main: min,
            };
        }
        const values = value.split(" ").map((value) => convertValue(value, valueIsRem, min, max));
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
        let synced = allowSync
            ? (allValues.left == allValues.right ? "x" : "") + (allValues.top == allValues.bottom ? "y" : "")
            : null;

        return {
            top: values[0],
            right: values[1],
            bottom: values[2],
            left: values[3],
            synced: synced || null,
        };
    })();

    function fallbackToNull(value) {
        return typeof value == "number" ? value : null;
    }

    const [mainInputValue, setMainInputValue] = useState(fallbackToNull(values?.main));
    const [topInputValue, setTopInputValue] = useState(fallbackToNull(values?.top));
    const [rightInputValue, setRightInputValue] = useState(fallbackToNull(values?.right));
    const [bottomInputValue, setBottomInputValue] = useState(fallbackToNull(values?.bottom));
    const [leftInputValue, setLeftInputValue] = useState(fallbackToNull(values?.left));
    const [_syncedValue, setSyncedValue] = useState(values?.synced);
    const [syncedValue] = useDebounce(_syncedValue, 1000);
    const [syncButtonFocus, setSyncButtonFocus] = useState(false);

    function commitIfChanged(newValue) {
        if (newValue !== value) {
            commit(newValue);
        }
    }

    function convertForCommit(number) {
        const unit = convertToRem ? "rem" : "px";
        const divider = convertToRem ? 16 : 1;
        const convertedNumber = minMax(number) / divider;
        return convertedNumber == 0 ? "0" : `${convertedNumber}${unit}`;
    }

    function commitSingleValue() {
        commitIfChanged(convertForCommit(mainInputValue));
    }

    function commitMultipleValues() {
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

    useEffect(() => {
        if (mainInputValue == null) {
            return;
        }
        commitSingleValue();
    }, [mainInputValue]);

    useEffect(() => {
        if (topInputValue == null || rightInputValue == null || bottomInputValue == null || leftInputValue == null) {
            return;
        }
        commitMultipleValues();
    }, [topInputValue, rightInputValue, bottomInputValue, leftInputValue]);

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

    useEffect(() => {
        if (potentailAllSelected && potentailAllSelected == selected) {
            setSelected("all");
        }
        setPotentialAllSelected(false);
    }, [potentailAllSelected]);

    return (
        <>
            <div {...stylex.props(styles.container, highlight && styles.highlight, disabled && styles.disabled)}>
                {segmented ? (
                    <div {...stylex.props(styles.segmentedGrid)}>
                        <TextInput
                            containerStyle={styles.area("top")}
                            id={id}
                            value={topInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                value = minMax(value);
                                setTopInputValue(value);
                                if (syncedValue == "y" || syncedValue == "xy") {
                                    setBottomInputValue(value);
                                }
                            }}
                            setFocus={selected == "top"}
                            onFocus={() => setSelected("top")}
                            onBlur={() => setPotentialAllSelected("top")}
                        />
                        <TextInput
                            containerStyle={styles.area("right")}
                            value={rightInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                value = minMax(value);
                                setRightInputValue(value);
                                if (syncedValue == "x" || syncedValue == "xy") {
                                    setLeftInputValue(value);
                                }
                            }}
                            setFocus={selected == "right"}
                            onFocus={() => setSelected("right")}
                            onBlur={() => setPotentialAllSelected("right")}
                        />
                        <TextInput
                            containerStyle={styles.area("bottom")}
                            value={bottomInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                value = minMax(value);
                                setBottomInputValue(value);
                                if (syncedValue == "y" || syncedValue == "xy") {
                                    setTopInputValue(value);
                                }
                            }}
                            setFocus={selected == "bottom"}
                            onFocus={() => setSelected("bottom")}
                            onBlur={() => setPotentialAllSelected("bottom")}
                        />
                        <TextInput
                            containerStyle={styles.area("left")}
                            value={leftInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                value = minMax(value);
                                setLeftInputValue(value);
                                if (syncedValue == "x" || syncedValue == "xy") {
                                    setRightInputValue(value);
                                }
                            }}
                            setFocus={selected == "left"}
                            onFocus={() => setSelected("left")}
                            onBlur={() => setPotentialAllSelected("left")}
                        />
                        {allowSync && (
                            <button
                                type="button"
                                {...stylex.props(styles.area("middle"), styles.syncButton)}
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:snycValues")}
                                onBlur={() => setSyncButtonFocus(false)}
                                onClick={() => {
                                    setSyncButtonFocus(true);
                                    const map = {
                                        x: "y",
                                        y: "xy",
                                        xy: null,
                                    };
                                    const newValue = _syncedValue ? map[_syncedValue] : "x";
                                    setSyncedValue(newValue);
                                }}
                            >
                                {(_syncedValue == "x" || _syncedValue == "xy") && (
                                    <span {...stylex.props(styles.syncLineX)}></span>
                                )}
                                {(_syncedValue == "y" || _syncedValue == "xy") && (
                                    <span {...stylex.props(styles.syncLineY)}></span>
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
                        append="px"
                        readOnly={readonly}
                        placeholder={placeholder}
                        onEnterKey={onEnterKey}
                        type="number"
                        min={min}
                        max={max}
                        setFocus={mainFocus}
                        onChange={(value) => {
                            setMainInputValue(minMax(value));
                        }}
                        onBlur={() => setMainFocus(false)}
                        containerStyle={styles.fullInput}
                    />
                )}

                {allowMultiple && (
                    <div {...stylex.props(styles.container, segmented && styles.flexColumn)}>
                        <Button
                            onClick={() => {
                                if (segmented) {
                                    setMainInputValue(topInputValue);
                                    setSelected(null);
                                    setSegmented(false);
                                    setTimeout(() => {
                                        setMainFocus(true);
                                    }, 0);
                                    return;
                                }
                                setMainFocus(true);
                            }}
                            style="neutral"
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:globalSpacing")}
                            {...stylex.props(styles.centerContent, readonly && styles.readonly)}
                        >
                            <RoundedBox selected={selected} />
                        </Button>
                        {allowMultiple && (
                            <Button
                                onClick={() => {
                                    if (segmented) {
                                        const map = {
                                            top: "right",
                                            right: "bottom",
                                            bottom: "left",
                                            left: "top",

                                            xtop: "bottom",
                                            xright: "bottom",
                                            xbottom: "left",
                                            xleft: "top",

                                            ytop: "right",
                                            yright: "left",
                                            ybottom: "left",
                                            yleft: "top",

                                            xytop: "left",
                                            xyright: "top",
                                            xybottom: "left",
                                            xyleft: "top",
                                        };
                                        if (!selected || selected == "all") {
                                            setSelected("top");
                                            return;
                                        }
                                        setSelected(map[(syncedValue || "") + selected]);
                                        return;
                                    }

                                    const newValue = mainInputValue;
                                    setSegmented(true);
                                    setSelected("top");
                                    setMainInputValue(null);
                                    let commited = false;
                                    if (topInputValue == null) {
                                        setTopInputValue(newValue);
                                        commited = true;
                                    }
                                    if (rightInputValue == null) {
                                        setRightInputValue(newValue);
                                        commited = true;
                                    }
                                    if (bottomInputValue == null) {
                                        setBottomInputValue(newValue);
                                        commited = true;
                                    }
                                    if (leftInputValue == null) {
                                        setLeftInputValue(newValue);
                                        commited = true;
                                    }
                                    if (!commited) {
                                        commitMultipleValues();
                                    }
                                }}
                                style="neutral"
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:spacingPerSide")}
                                {...stylex.props(styles.centerContent, readonly && styles.readonly)}
                            >
                                <SpacingBox selected={selected} useSyncValue={syncButtonFocus} synced={_syncedValue} />
                            </Button>
                        )}
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
