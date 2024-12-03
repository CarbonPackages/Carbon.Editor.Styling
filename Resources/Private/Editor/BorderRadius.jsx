import React, { useState, useEffect, useRef } from "react";
import { Button } from "@neos-project/react-ui-components";
import TextInput from "./Components/TextInput";
import RoundedBox from "./Components/RoundedBox";
import BorderRadiusBox from "./Components/BorderRadiusBox";
import Circle from "./Components/Circle";
import Dialog from "./Components/Dialog";
import { isSegmented, getNumberAndUnit, limitToMinMax } from "./Helper";
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
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "var(--spacing-Quarter)",
        width: "100%",
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
    preview: (borderRadius, rounded) => ({
        transition: "border-radius var(--transition-Slow) ease, width var(--transition-Slow) ease",
        background: "var(--colors-PrimaryBlue)",
        margin: "var(--spacing-Full) auto 0",
        height: 50,
        borderRadius: rounded ? "50%" : borderRadius,
    }),
    previewBig: (rounded, aspectRatio) => ({
        aspectRatio: aspectRatio || null,
        width: aspectRatio ? null : rounded ? 50 : "100%",
    }),
    previewSmall: {
        height: 80,
        aspectRatio: 1,
        transform: "scale(0.5)",
        margin: -20,
    },
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowMultiple: false,
    allowFullRounded: false,
    allowPercentage: false,
    convertPxToRem: false,
    preview: false,
    previewAspectRatio: null,
    min: 0,
    max: null,
    placeholder: "",
    fullRoundedValue: 9999,
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

    const {
        disabled,
        readonly,
        allowMultiple,
        allowFullRounded,
        allowPercentage,
        convertPxToRem,
        preview,
        previewAspectRatio,
        min,
        max,
        placeholder,
        fullRoundedValue,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    // Content repository to editor
    const values = (() => {
        if (isRound(value)) {
            return {
                rounded: true,
                main: {
                    value: fullRoundedValue,
                    unit: "px",
                },
            };
        }
        const valueIsString = typeof value == "string";
        if (typeof value == "number") {
            value = convertPxToRem ? value * 16 : value;
            return {
                main: getNumberAndUnit(value, min, max),
            };
        }
        if (!valueIsString || !value) {
            return {
                main: getNumberAndUnit(0, min, max),
            };
        }
        const values = value.split(" ").map((value) => getNumberAndUnit(value, min, max, allowPercentage));
        if (!allowMultiple || values.length < 4) {
            return {
                main: values[0],
            };
        }

        return {
            topLeft: values[0],
            topRight: values[1],
            bottomRight: values[2],
            bottomLeft: values[3],
        };
    })();

    function getInitState(direction, key, fallback = null) {
        if (fallback === null) {
            fallback = key == "unit" ? "px" : null;
        }
        const config = values[direction];
        if (!config) {
            return fallback;
        }
        const value = config[key];
        if (typeof value != "undefined") {
            return value;
        }
        return fallback;
    }

    // Main Input
    const [rounded, setRounded] = useState(values?.rounded || false);
    const [mainInputValue, setMainInputValue] = useState(getInitState("main", "value"));
    const [mainUnit, setMainUnit] = useState(getInitState("main", "unit"));
    const [mainMin, setMainMin] = useState(getInitState("main", "min", min));
    const [mainMax, setMainMax] = useState(getInitState("main", "max", max));
    useEffect(() => {
        const isPercentage = mainUnit == "%";
        setMainMin(isPercentage ? 0 : min);
        setMainMax(isPercentage ? 100 : max);
        if (mainInputValue) {
            setTopLeftUnit(mainUnit);
            setTopRightUnit(mainUnit);
            setBottomRightUnit(mainUnit);
            setBottomLeftUnit(mainUnit);
        }
    }, [mainUnit]);

    // Top Left Input
    const [topLeftInputValue, setTopLeftInputValue] = useState(getInitState("topLeft", "value"));
    const [topLeftUnit, setTopLeftUnit] = useState(getInitState("topLeft", "unit"));
    const [topLeftMin, setTopLeftMin] = useState(getInitState("topLeft", "min", min));
    const [topLeftMax, setTopLeftMax] = useState(getInitState("topLeft", "max", max));

    useEffect(() => {
        const isPercentage = topLeftUnit == "%";
        setTopLeftMin(isPercentage ? 0 : min);
        setTopLeftMax(isPercentage ? 100 : max);
    }, [topLeftUnit]);

    // Top Right Input
    const [topRightInputValue, setTopRightInputValue] = useState(getInitState("topRight", "value"));
    const [topRightUnit, setTopRightUnit] = useState(getInitState("topRight", "unit"));
    const [topRightMin, setTopRightMin] = useState(getInitState("topRight", "min", min));
    const [topRightMax, setTopRightMax] = useState(getInitState("topRight", "max", max));
    useEffect(() => {
        const isPercentage = topRightUnit == "%";
        setTopRightMin(isPercentage ? 0 : min);
        setTopRightMax(isPercentage ? 100 : max);
    }, [topRightUnit]);

    // Bottom Right Input
    const [bottomRightInputValue, setBottomRightInputValue] = useState(getInitState("bottomRight", "value"));
    const [bottomRightUnit, setBottomRightUnit] = useState(getInitState("bottomRight", "unit"));
    const [bottomRightMin, setBottomRightMin] = useState(getInitState("bottomRight", "min", min));
    const [bottomRightMax, setBottomRightMax] = useState(getInitState("bottomRight", "max", max));
    useEffect(() => {
        const isPercentage = bottomRightUnit == "%";
        setBottomRightMin(isPercentage ? 0 : min);
        setBottomRightMax(isPercentage ? 100 : max);
    }, [bottomRightUnit]);

    // Bottom Left Input
    const [bottomLeftInputValue, setBottomLeftInputValue] = useState(getInitState("bottomLeft", "value"));
    const [bottomLeftUnit, setBottomLeftUnit] = useState(getInitState("bottomLeft", "unit"));
    const [bottomLeftMin, setBottomLeftMin] = useState(getInitState("bottomLeft", "min", min));
    const [bottomLeftMax, setBottomLeftMax] = useState(getInitState("bottomLeft", "max", max));
    useEffect(() => {
        const isPercentage = bottomLeftUnit == "%";
        setBottomLeftMin(isPercentage ? 0 : min);
        setBottomLeftMax(isPercentage ? 100 : max);
    }, [bottomLeftUnit]);

    // Commit main input
    function commitMainValue() {
        if (mainInputValue == null) {
            return;
        }
        const isRounded = isRound(mainInputValue);
        setRounded(isRounded);
        if (isRounded) {
            commitIfChanged(`${fullRoundedValue}px`);
            return;
        }
        commitIfChanged(convertForCommit(mainInputValue, mainUnit));
    }
    useEffect(commitMainValue, [mainInputValue, mainUnit]);

    // Commit multiple inputs
    function commitMultipleValues() {
        if (mainInputValue !== null) {
            return;
        }
        const tl = convertForCommit(topLeftInputValue, topLeftUnit);
        const tr = convertForCommit(topRightInputValue, topRightUnit);
        const br = convertForCommit(bottomRightInputValue, bottomRightUnit);
        const bl = convertForCommit(bottomLeftInputValue, bottomLeftUnit);
        commitIfChanged(`${tl} ${tr} ${br} ${bl}`);
    }
    useEffect(commitMultipleValues, [
        topLeftInputValue,
        topRightInputValue,
        bottomRightInputValue,
        bottomLeftInputValue,
        topLeftUnit,
        topRightUnit,
        bottomRightUnit,
        bottomLeftUnit,
    ]);

    function commitIfChanged(newValue) {
        if (newValue !== value) {
            commit(newValue);
        }
    }

    function convertForCommit(number, unit) {
        if (!number) {
            return "0";
        }
        let divider = 1;
        if (!unit || unit == "px") {
            unit = convertPxToRem ? "rem" : "px";
            divider = convertPxToRem ? 16 : 1;
        }
        const convertedNumber = number / divider;
        return convertedNumber == 0 ? "0" : `${convertedNumber}${unit}`;
    }

    function isRound(input) {
        return input == `${fullRoundedValue}px` || input == fullRoundedValue;
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
                            id={id}
                            value={topLeftInputValue}
                            unit={topLeftUnit}
                            unitSwitch={allowPercentage ? setTopLeftUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={topLeftMin}
                            max={topLeftMax}
                            onChange={(value) => {
                                setTopLeftInputValue(limitToMinMax(value, topLeftMin, topLeftMax));
                            }}
                            setFocus={selected == "topLeft"}
                            onFocus={() => setSelected("topLeft")}
                            onBlur={() => setPotentialAllSelected("topLeft")}
                        />
                        <TextInput
                            value={topRightInputValue}
                            unit={topRightUnit}
                            unitSwitch={allowPercentage ? setTopRightUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={topRightMin}
                            max={topRightMax}
                            onChange={(value) => {
                                setTopRightInputValue(limitToMinMax(value, topRightMin, topRightMax));
                            }}
                            setFocus={selected == "topRight"}
                            onFocus={() => setSelected("topRight")}
                            onBlur={() => setPotentialAllSelected("topRight")}
                        />
                        <TextInput
                            value={bottomLeftInputValue}
                            unit={bottomLeftUnit}
                            unitSwitch={allowPercentage ? setBottomLeftUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={bottomLeftMin}
                            max={bottomLeftMax}
                            onChange={(value) => {
                                setBottomLeftInputValue(limitToMinMax(value, bottomLeftMin, bottomLeftMax));
                            }}
                            setFocus={selected == "bottomLeft"}
                            onFocus={() => setSelected("bottomLeft")}
                            onBlur={() => setPotentialAllSelected("bottomLeft")}
                        />
                        <TextInput
                            value={bottomRightInputValue}
                            unit={bottomRightUnit}
                            unitSwitch={allowPercentage ? setBottomRightUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={bottomRightMin}
                            max={bottomRightMax}
                            onChange={(value) => {
                                setBottomRightInputValue(limitToMinMax(value, bottomRightMin, bottomRightMax));
                            }}
                            setFocus={selected == "bottomRight"}
                            onFocus={() => setSelected("bottomRight")}
                            onBlur={() => setPotentialAllSelected("bottomRight")}
                        />
                    </div>
                ) : (
                    <TextInput
                        id={id}
                        value={mainInputValue}
                        unit={rounded ? null : mainUnit}
                        unitSwitch={allowPercentage ? setMainUnit : null}
                        readOnly={readonly}
                        placeholder={placeholder}
                        onEnterKey={onEnterKey}
                        type="number"
                        min={mainMin}
                        max={mainMax}
                        setFocus={mainFocus}
                        fakeValue={rounded ? i18nRegistry.translate("Carbon.Editor.Styling:Main:fullRounded") : null}
                        onFakeClick={() => {
                            setMainInputValue(mainMin);
                            setTimeout(() => {
                                setMainFocus(true);
                            }, 0);
                        }}
                        onChange={(value) => {
                            setMainInputValue(limitToMinMax(value, mainMin, mainMax));
                        }}
                        onBlur={() => setMainFocus(false)}
                        containerStyle={styles.fullInput}
                    />
                )}

                {(allowMultiple || allowFullRounded) && (
                    <div {...stylex.props(styles.container, segmented && styles.flexColumn)}>
                        <Button
                            onClick={() => {
                                if (segmented) {
                                    setMainInputValue(topLeftInputValue);
                                    setSelected(null);
                                    setSegmented(false);
                                    setTimeout(() => {
                                        setMainFocus(true);
                                    }, 0);
                                    return;
                                }
                                if (allowFullRounded) {
                                    const fullRounded = isRound(mainInputValue);
                                    const newValue = fullRounded ? min : fullRoundedValue;
                                    setMainInputValue(newValue);
                                    if (fullRounded) {
                                        setTimeout(() => {
                                            setMainFocus(true);
                                        }, 0);
                                    }
                                    return;
                                }
                                setMainFocus(true);
                            }}
                            style="neutral"
                            title={i18nRegistry.translate(
                                `Carbon.Editor.Styling:Main:${segmented || !allowFullRounded || rounded ? "radius" : "fullRounded"}`,
                            )}
                            {...stylex.props(styles.centerContent, readonly && styles.readonly)}
                        >
                            {rounded ? <Circle /> : <RoundedBox selected={selected} />}
                        </Button>
                        {allowMultiple && (
                            <Button
                                onClick={() => {
                                    if (segmented) {
                                        if (selected == "topLeft") {
                                            setSelected("topRight");
                                            return;
                                        }
                                        if (selected == "topRight") {
                                            setSelected("bottomLeft");
                                            return;
                                        }
                                        if (selected == "bottomLeft") {
                                            setSelected("bottomRight");
                                            return;
                                        }
                                        setSelected("topLeft");
                                        return;
                                    }

                                    const newValue = rounded ? min : mainInputValue;
                                    setSegmented(true);
                                    setSelected("topLeft");
                                    setMainInputValue(null);
                                    setRounded(false);
                                    let commited = false;
                                    if (topLeftInputValue == null) {
                                        setTopLeftInputValue(newValue);
                                        commited = true;
                                    }
                                    if (topRightInputValue == null) {
                                        setTopRightInputValue(newValue);
                                        commited = true;
                                    }
                                    if (bottomRightInputValue == null) {
                                        setBottomRightInputValue(newValue);
                                        commited = true;
                                    }
                                    if (bottomLeftInputValue == null) {
                                        setBottomLeftInputValue(newValue);
                                        commited = true;
                                    }
                                    if (!commited) {
                                        setTimeout(commitMultipleValues, 0);
                                    }
                                }}
                                style="neutral"
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:radiusPerSide")}
                                {...stylex.props(styles.centerContent, readonly && styles.readonly)}
                            >
                                <BorderRadiusBox selected={selected} />
                            </Button>
                        )}
                    </div>
                )}
                {!!preview && preview != "big" && (
                    <div {...stylex.props(styles.preview(value, rounded), styles.previewSmall)}></div>
                )}
            </div>
            {preview == "big" && (
                <div {...stylex.props(styles.centerContent)}>
                    <div
                        {...stylex.props(
                            styles.preview(value, rounded),
                            styles.previewBig(rounded, previewAspectRatio),
                        )}
                    ></div>
                </div>
            )}
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.BorderRadius"),
}));

export default neosifier(Editor);
