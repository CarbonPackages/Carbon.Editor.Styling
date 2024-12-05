import React, { useState, useEffect, useRef } from "react";
import UnitSwitch from "./UnitSwitch";
import { hasNoValue, limitToMinMax } from "../Helper";
import { useDebouncedCallback } from "use-debounce";
import { neos } from "@neos-project/neos-ui-decorators";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    basicLook: {
        margin: 0,
        height: "var(--spacing-GoldenUnit)",
        background: "var(--colors-ContrastNeutral)",
        color: "var(--colors-ContrastBrightest)",
        border: 0,
        fontSize: "var(--fontSize-Base)",
        cursor: "text",
    },
    inputLook: (unitSwitch) => ({
        borderRadius: 2,
        paddingBlock: 0,
        paddingLeft: "var(--fontSize-Base)",
        paddingRight: unitSwitch ? 0 : "var(--fontSize-Base)",
    }),
    input: {
        appearance: "none",
        width: "100%",
        textAlign: "left",
    },
    hidden: {
        display: "none",
    },
    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    focus: {
        outline: "none",
        color: "var(--colors-ContrastDarkest)",
        background: "var(--colors-ContrastBrightest)",
    },
    highlight: {
        borderRadius: 2,
        outline: "2px solid var(--colors-Warn)",
        outlineOffset: 2,
    },
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
        ":where(*)>*": {
            pointerEvents: "none",
        },
    },
});

function Component({
    debounce = 500,
    i18nRegistry,
    value,
    onChange,
    onChangeDebounced,
    placeholder,
    unit,
    unitSwitch,
    containerStyle,
    inputStyle,
    onFocus,
    onBlur,
    onEnterKey,
    onKeyPress,
    onKeyDown,
    type = "text",
    disabled,
    min,
    max,
    title,
    highlight,
    allowFloat = false,
    setFocus = false,
    allowEmpty = false,
    // neos is set as prop because we don't want to pass it to the input element
    neos,
    ...rest
}) {
    const isNumericInput = type == "number";
    const inputRef = useRef(null);
    const [state, setState] = useState(value);
    const [isFocus, setIsFocus] = useState(false);
    const [fakeFocus, setFakeFocus] = useState(!!rest.fakeFocus);
    useEffect(() => {
        setFakeFocus(!!rest.fakeFocus);
    }, [rest.fakeFocus]);

    useEffect(() => {
        commitValue(state);
    }, [rest.max, rest.min]);

    function commitValue(newValue, force = false) {
        if (!onChangeDebounced && !onChange) {
            return;
        }

        // Remove spaces at start
        if (typeof newValue === "string") {
            while (newValue.startsWith(" ")) {
                newValue = newValue.substring(1);
            }
        }

        if (hasNoValue(newValue)) {
            if (allowEmpty) {
                debouncedCommit("");
                return;
            }
            newValue = minMax(0);
            setState(newValue);
        } else if (typeof newValue == "number") {
            newValue = minMax(newValue);
        }

        if (isNumericInput && typeof newValue === "string") {
            // Replace , with . and remove all letters and spaces
            newValue = newValue.replace(",", ".").replace(/[a-zA-Z\s]/g, "");

            if (hasOperator(newValue)) {
                // If a user enter multiple -- or ++ at the end, we decrease or increase it
                // Example ++ => +1, +++ => +10 and so on
                const multiplePlusAtEnd = newValue.match(/\+([\+]+)$/)?.[0].length || 0;
                const multipleMinusAtEnd = multiplePlusAtEnd ? 0 : newValue.match(/-([-]+)$/)?.[0].length || 0;
                if (multiplePlusAtEnd || multipleMinusAtEnd) {
                    const operator = multiplePlusAtEnd ? "+" : "-";
                    const value = multiplePlusAtEnd || multipleMinusAtEnd;
                    const number = 10 ** (value - 2);
                    newValue = `${newValue.slice(0, -value)}${operator}${number}`
                }

                // Remove all left double -- and ++
                while(newValue.includes("++") || newValue.includes("--")) {
                    newValue = newValue.replaceAll("++", "+").replaceAll("--", "-");
                }

                while (startWithOperator(newValue)) {
                    newValue = newValue.substring(1);
                }
                if (!newValue.length) {
                    newValue = "";
                }
                if (endWithOperator(newValue)) {
                    return;
                }
                if (newValue) {
                    try {
                        newValue = (0, eval)(newValue.replaceAll(":", "/"));
                    } catch (error) {
                    }
                }
            } else {
                newValue = parseFloat(newValue);
            }

            if (!allowFloat) {
                newValue = Math.round(newValue);
            }
            newValue = `${minMax(newValue)}`;
            if (state !== newValue) {
                setState(newValue);
            }
        }
        debouncedCommit(newValue, force);
    }

    function debouncedCommit(newValue, force = false) {
        if (newValue === value && !force) {
            return;
        }
        if (onChangeDebounced) {
            onChangeDebounced(newValue);
        } else {
            onChange(newValue);
        }
    }
    const debounced = useDebouncedCallback(commitValue, debounce);

    useEffect(() => {
        setState(value);
    }, [value]);

    useEffect(() => {
        if (onChangeDebounced && onChange && state != value) {
            onChange(state);
        }
    }, [state]);

    useEffect(() => {
        if (inputRef && inputRef.current && (rest.autoFocus || setFocus)) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (inputRef && inputRef.current && setFocus) {
            inputRef.current.focus();
        }
    }, [setFocus]);

    function hasOperator(value) {
        return (
            value.includes("+") ||
            value.includes("-") ||
            value.includes("*") ||
            value.includes("/") ||
            value.includes(":")
        );
    }

    function startWithOperator(value) {
        return value.startsWith("*") || value.startsWith("/") || value.startsWith(":");
    }

    function endWithOperator(value) {
        return (
            value.endsWith("+") ||
            value.endsWith("-") ||
            value.endsWith("*") ||
            value.endsWith("/") ||
            value.endsWith(":")
        );
    }

    function minMax(value) {
        return limitToMinMax(value, min, max);
    }

    return (
        <div
            {...stylex.props(
                unit && [styles.flex, styles.inputLook(unitSwitch), styles.basicLook],
                unit && (isFocus || fakeFocus) && styles.focus,
                highlight && styles.highlight,
                disabled && styles.disabled,
                containerStyle,
            )}
            onClick={() => {
                if (unit && !disabled) {
                    inputRef?.current?.focus();
                }
            }}
            title={title}
        >
            <input
                {...rest}
                {...stylex.props(
                    styles.input,
                    styles.basicLook,
                    isNumericInput && styles.numberInput,
                    !unit && styles.inputLook(false),
                    (isFocus || fakeFocus) && styles.focus,
                    inputStyle,
                )}
                onFocus={(event) => {
                    setIsFocus(true);
                    if (onFocus) {
                        onFocus(event);
                    }
                }}
                onBlur={(event) => {
                    setIsFocus(false);
                    if (onBlur) {
                        onBlur(event);
                    }
                }}
                value={state === null ? "" : state}
                role="textbox"
                aria-multiline="false"
                aria-disabled={disabled ? "true" : "false"}
                type={isNumericInput ? "text" : type}
                inputmode={isNumericInput ? "numeric" : null}
                placeholder={placeholder ? i18nRegistry.translate(unescape(placeholder)) : null}
                disabled={disabled}
                onChange={(event) => {
                    const value = event.target.value;
                    setState(value);
                    debounced(value);
                }}
                onKeyDown={(event) => {
                    if (typeof onKeyDown === "function") {
                        onKeyDown(event);
                    }

                    const key = event.key;
                    if (isNumericInput && (key == "ArrowDown" || key == "ArrowUp")) {
                        const { metaKey, shiftKey, altKey } = event;
                        const operator = key == "ArrowDown" ? -1 : 1;
                        let newValue = parseFloat(state) || 0;
                        // We have to handle the alt key differently, because of the rounding error in JavaScript
                        if (altKey) {
                            newValue = (newValue * 10 + operator) / 10;
                        } else {
                            const multiplier = shiftKey ? 10 : metaKey ? 100 : 1;
                            newValue = newValue + operator * multiplier;
                        }
                        newValue = `${minMax(newValue)}`;
                        if (state !== newValue) {
                            setState(newValue);
                            debounced(newValue);
                        }
                        event.preventDefault();
                    }
                }}
                onKeyPress={(event) => {
                    const key = event.key;
                    if (key == "Enter" && typeof onEnterKey === "function") {
                        onEnterKey();
                        return;
                    }
                    if (typeof onKeyPress === "function") {
                        onKeyPress(event);
                    }

                    if (isNumericInput) {
                        // Don't allow double . or ,
                        const value = event.target.value;
                        if ((value.includes(".") || value.includes(",")) && (key == "." || key == ",")) {
                            event.preventDefault();
                        }
                        // Allow only numbers and operators
                        if (isNaN(key) && !hasOperator(key) && key != "." && key != "," && key != " ") {
                            event.preventDefault();
                        }
                    }
                }}
                ref={inputRef}
            />
            {!(allowEmpty && hasNoValue(state)) && (
                <>
                    {unitSwitch && unit ? <UnitSwitch unit={unit} onActive={setFakeFocus} onClick={unitSwitch} /> : unit}
                </>
            )}
        </div>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

export default neosifier(Component);
