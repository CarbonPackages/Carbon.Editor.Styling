import React, { useState, useEffect, useCallback } from "react";
import { Button, Icon } from "@neos-project/react-ui-components";
import { injectNeosProps } from "../../Helper/Neos";
import TextInput from "../../Components/TextInput";
import RoundedBox from "../../Components/RoundedBox";
import SpacingBox from "../../Components/SpacingBox";
import DebugOutput from "../../Components/DebugOutput";
import { fromContentRepoToEditor, multipleSettings, numberOrNull } from "./Helper";
import { convertValue, limitToMinMax, hasNoValue } from "../../Helper";
import { useDebounce } from "use-debounce";
import * as stylex from "@stylexjs/stylex";

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

function Spacing({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const { disabled, readonly, allowEmpty, allowMultiple, allowSync, convertPxToRem, min, max, placeholder } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    // Content repository to editor
    const values = fromContentRepoToEditor({ value, min, max, allowEmpty, allowMultiple, allowSync });
    const { multipleDirections, allowSyncX, allowSyncY, segmentedGrid } = multipleSettings({
        allowMultiple,
        allowSync,
    });
    const getMode = useCallback(
        (input) => {
            if (allowMultiple && typeof input === "string" && value.includes(" ")) {
                return "multiple";
            }

            return "single";
        },
        [allowMultiple, value],
    );

    // Set states
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);
    const [mode, setMode] = useState(getMode(value));
    const [mainInputValue, setMainInputValue] = useState(numberOrNull(values?.main));
    const [topInputValue, setTopInputValue] = useState(numberOrNull(values?.top));
    const [rightInputValue, setRightInputValue] = useState(numberOrNull(values?.right));
    const [bottomInputValue, setBottomInputValue] = useState(numberOrNull(values?.bottom));
    const [leftInputValue, setLeftInputValue] = useState(numberOrNull(values?.left));
    const [_syncedValue, setSyncedValue] = useState(values?.synced);
    const [syncedValue] = useDebounce(_syncedValue, 1000);

    // Callback functions
    const minMax = useCallback((value) => limitToMinMax(value, min, max), [value, min, max, limitToMinMax]);

    const commitIfChanged = useCallback(
        (newValue) => {
            if (newValue !== value) {
                commit(newValue);
            }
        },
        [value, commit],
    );

    const convertForCommit = useCallback(
        (number) => {
            const unit = convertPxToRem ? "rem" : "px";
            const divider = convertPxToRem ? 16 : 1;
            const convertedNumber = minMax(number) / divider;
            return convertedNumber == 0 ? "0" : `${convertedNumber}${unit}`;
        },
        [convertPxToRem, minMax],
    );

    const commitSingleValue = useCallback(() => {
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
    }, [mainInputValue, mode, hasNoValue, commitIfChanged, convertForCommit, allowEmpty]);

    const commitMultipleValues = useCallback(() => {
        if (mode !== "multiple") {
            return;
        }
        const left = multipleDirections.left ? leftInputValue : 0;
        const right = multipleDirections.right ? rightInputValue : 0;
        const top = multipleDirections.top ? topInputValue : 0;
        const bottom = multipleDirections.bottom ? bottomInputValue : 0;

        const syncX = left === right;
        const syncY = top === bottom;

        if (syncX && syncY) {
            commitIfChanged(`${convertForCommit(top)} ${convertForCommit(left)}`);
            return;
        }
        if (syncX) {
            commitIfChanged(`${convertForCommit(top)} ${convertForCommit(left)} ${convertForCommit(bottom)}`);
            return;
        }

        commitIfChanged(
            `${convertForCommit(top)} ${convertForCommit(right)} ${convertForCommit(bottom)} ${convertForCommit(left)}`,
        );
    }, [mode, commitIfChanged, convertForCommit, topInputValue, rightInputValue, bottomInputValue, leftInputValue]);

    // Update on changes
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
        if (mode === "single") {
            commitSingleValue();
            return;
        }
        commitMultipleValues();
    }, [mode]);

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

    useEffect(() => {
        if (potentailAllSelected && potentailAllSelected == selected) {
            setSelected("all");
        }
        setPotentialAllSelected(false);
    }, [potentailAllSelected]);

    return (
        <>
            <DebugOutput>VALUE: `{value}`</DebugOutput>
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
                                    segmentedGrid == "segmentedGridTwoLinesTopBottomSync" && styles.syncButtonRight,
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
                                {allowSyncX && (_syncedValue == "x" || _syncedValue == "xy") && (
                                    <span {...stylex.props(styles.syncLineX)}></span>
                                )}
                                {allowSyncY && (_syncedValue == "y" || _syncedValue == "xy") && (
                                    <span
                                        {...stylex.props(
                                            segmentedGrid == "segmentedGridTwoLinesTopBottomSync"
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
                            mode == "multiple" &&
                                segmentedGrid != "segmentedGridOneLine" &&
                                segmentedGrid != "segmentedGridOneLineSync" &&
                                styles.flexColumn,
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

var styles = stylex.create({
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
    segmentedGridOneLineSync: {
        gridTemplate: `"left middle right" minmax(0, 1fr) / minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)`,
    },
    segmentedGridOneLine: {
        gridTemplate: `"left right" minmax(0, 1fr) / minmax(0, 1fr) minmax(0, 1fr)`,
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
        gridTemplate: `"top" minmax(0, 1fr) "bottom" minmax(0, 1fr) / minmax(0, 1fr)`,
    },
    segmentedGridTwoLinesTopBottomSync: {
        gridTemplate: `"top middle" minmax(0, 1fr)
            "bottom middle" minmax(0, 1fr) / minmax(0, 4fr) minmax(0, 1fr)`,
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

export default injectNeosProps(Spacing, "Spacing");
