import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@neos-project/react-ui-components";
import { RoundedBox, Circle } from "./Icons";
import { TextInput } from "./Components";
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
        gridTemplateColumns: "repeat(2, 1fr)",
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
    previewSmall: (middle) => ({
        height: 80,
        aspectRatio: 1,
        transform: "scale(0.5)",
        margin: -20,
    }),
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowMultiple: false,
    allowFullRounded: false,
    convertToRem: false,
    preview: false,
    previewAspectRatio: null,
    min: 0,
    max: null,
    placeholder: "",
    fullRoundedValue: 9999,
};

function Editor({ id, value, commit, highlight, identifier, options, i18nRegistry, config, onEnterKey }) {
    const [segmented, setSegmented] = useState(null);
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);

    useEffect(() => {
        const isSegmented = typeof value == "string" && value.includes(" ");
        setSegmented(isSegmented);
        setSelected(isSegmented && !selected ? "all" : selected);
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
        convertToRem,
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
            };
        }
        const valueIsString = typeof value == "string";
        const valueIsRem = valueIsString && value.includes("rem");
        const convertValue = (input, rem = valueIsRem) => {
            if (typeof input == "string") {
                input = parseFloat(input);
            }
            const multiplier = rem ? 16 : 1;
            return minMax(input * multiplier);
        };
        if (typeof value == "number") {
            return {
                main: convertValue(value, convertToRem),
            };
        }
        if (!valueIsString || !value) {
            return {
                main: min,
            };
        }
        const values = value.split(" ").map((value) => convertValue(value));
        if (values.length < 4) {
            return {
                main: values[0],
            };
        }

        return {
            topLeft: values[0],
            topRight: values[1],
            bottomRight: values[2],
            botomLeft: values[3],
        };
    })();

    function fallbackToNull(value) {
        return typeof value == "number" ? value : null;
    }

    const [rounded, setRounded] = useState(values?.rounded || false);
    const [mainInputValue, setMainInputValue] = useState(
        values?.rounded ? fullRoundedValue : fallbackToNull(values?.main),
    );
    const [topLeftInputValue, setTopLeftInputValue] = useState(fallbackToNull(values?.topLeft));
    const [topRightInputValue, setTopRightInputValue] = useState(fallbackToNull(values?.topRight));
    const [bottomRightInputValue, setBottomRightInputValue] = useState(fallbackToNull(values?.bottomRight));
    const [bottomLeftInputValue, setBottomLeftInputValue] = useState(fallbackToNull(values?.botomLeft));

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
        const isRounded = isRound(mainInputValue);
        setRounded(isRounded);
        if (isRounded) {
            commitIfChanged(`${fullRoundedValue}px`);
            return;
        }
        commitIfChanged(convertForCommit(mainInputValue));
    }

    function commitMultipleValues() {
        commitIfChanged(
            `${convertForCommit(topLeftInputValue)} ${convertForCommit(topRightInputValue)} ${convertForCommit(bottomRightInputValue)} ${convertForCommit(bottomLeftInputValue)}`,
        );
    }

    useEffect(() => {
        if (mainInputValue == null) {
            return;
        }
        commitSingleValue();
    }, [mainInputValue]);

    useEffect(() => {
        if (
            topLeftInputValue == null ||
            topRightInputValue == null ||
            bottomRightInputValue == null ||
            bottomLeftInputValue == null
        ) {
            return;
        }
        commitMultipleValues();
    }, [topLeftInputValue, topRightInputValue, bottomRightInputValue, bottomLeftInputValue]);

    function isRound(input) {
        return input == `${fullRoundedValue}px` || input == fullRoundedValue;
    }

    function getSingleValue(value) {
        if (typeof value == "string") {
            return minMax(value.split(" ")[0]);
        }
        return minMax(value);
    }

    // Return the value if it is between min and max, otherwise return the min or max value
    function minMax(value) {
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
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                setTopLeftInputValue(minMax(value));
                            }}
                            setFocus={selected == "topLeft"}
                            onFocus={() => setSelected("topLeft")}
                            onBlur={() => setPotentialAllSelected("topLeft")}
                        />
                        <TextInput
                            value={topRightInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                setTopRightInputValue(minMax(value));
                            }}
                            setFocus={selected == "topRight"}
                            onFocus={() => setSelected("topRight")}
                            onBlur={() => setPotentialAllSelected("topRight")}
                        />
                        <TextInput
                            value={bottomLeftInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                setBottomLeftInputValue(minMax(value));
                            }}
                            setFocus={selected == "bottomLeft"}
                            onFocus={() => setSelected("bottomLeft")}
                            onBlur={() => setPotentialAllSelected("bottomLeft")}
                        />
                        <TextInput
                            value={bottomRightInputValue}
                            append="px"
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={min}
                            max={max}
                            onChange={(value) => {
                                setBottomRightInputValue(minMax(value));
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
                        append={rounded ? null : "px"}
                        readOnly={readonly}
                        placeholder={placeholder}
                        onEnterKey={onEnterKey}
                        type="number"
                        min={min}
                        max={max}
                        setFocus={mainFocus}
                        fakeValue={rounded ? i18nRegistry.translate("Carbon.Editor.Styling:Main:fullRounded") : null}
                        onFakeClick={() => {
                            setMainInputValue(min);
                            setTimeout(() => {
                                setMainFocus(true);
                            }, 0);
                        }}
                        onChange={(value) => {
                            setMainInputValue(minMax(value));
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
                            {rounded ? <Circle /> : <RoundedBox segmented={false} selected={selected} />}
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

                                    setSegmented(true);
                                    setSelected("topLeft");
                                    setMainInputValue(null);
                                    const newValue = rounded ? min : mainInputValue;
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
                                        commitMultipleValues();
                                    }
                                }}
                                style="neutral"
                                title={i18nRegistry.translate("Carbon.Editor.Styling:Main:radiusPerSide")}
                                {...stylex.props(styles.centerContent, readonly && styles.readonly)}
                            >
                                <RoundedBox segmented={true} selected={selected} />
                            </Button>
                        )}
                    </div>
                )}

                {!!preview && preview != "big" && (
                    <div {...stylex.props(styles.preview(value, rounded), styles.previewSmall(!!segmented))}></div>
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
