import React, { useState, useEffect, useRef } from "react";
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
    inputLook: {
        borderRadius: 2,
        padding: "0 var(--fontSize-Base)",
    },
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
    placeholder,
    append,
    containerStyle,
    inputStyle,
    onFocus,
    onBlur,
    onEnterKey,
    onKeyPress,
    onKeyDown,
    type = "text",
    fakeValue,
    onFakeClick,
    disabled,
    // neos is set as prop because we don't want to pass it to the input element
    neos,
    highlight,
    allowFloat = false,
    setFocus = false,
    ...rest
}) {
    const isNumericInput = type == "number";
    const inputRef = useRef(null);
    const [state, setState] = useState(value);
    const [isFocus, setIsFocus] = useState(false);
    const debounced = useDebouncedCallback((newValue) => {
        if (!onChange) {
            return;
        }
        if (isNumericInput) {
            // Replace , with . and remove all letters and spaces
            newValue = newValue.replace(",", ".").replace(/[a-zA-Z\s]/g, "");
            if (hasOperator(newValue)) {
                while (startWithOperator(newValue)) {
                    newValue = newValue.substring(1);
                }
                if (endWithOperator(newValue)) {
                    return;
                }
                newValue = (0, eval)(newValue);
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
        if (newValue != value) {
            onChange(newValue);
        }
    }, debounce);
    useEffect(() => {
        setState(value);
    }, [value]);

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
        return value.includes("+") || value.includes("-") || value.includes("*") || value.includes("/");
    }

    function startWithOperator(value) {
        return value.startsWith("*") || value.startsWith("/");
    }

    function endWithOperator(value) {
        return value.endsWith("+") || value.endsWith("-") || value.endsWith("*") || value.endsWith("/");
    }

    function minMax(value) {
        if (typeof rest.min === "number" && value < rest.min) {
            return rest.min;
        }
        if (typeof rest.max === "number" && value > rest.max) {
            return rest.max;
        }
        return value;
    }

    return (
        <div
            {...stylex.props(
                append && [styles.flex, styles.inputLook, styles.basicLook],
                append && isFocus && styles.focus,
                highlight && styles.highlight,
                disabled && styles.disabled,
                containerStyle,
            )}
            onClick={() => {
                if (append && !fakeValue && !disabled) {
                    inputRef?.current?.focus();
                }
            }}
        >
            {fakeValue && !onFakeClick ? (
                <div {...stylex.props(!append && [styles.inputLook, styles.basicLook, styles.flex])}>{fakeValue}</div>
            ) : null}
            {fakeValue && onFakeClick ? (
                <button
                    type="button"
                    onClick={onFakeClick}
                    {...stylex.props(styles.input, !append && [styles.inputLook, styles.basicLook, styles.flex])}
                >
                    {fakeValue}
                </button>
            ) : null}
            <input
                {...rest}
                {...stylex.props(
                    styles.input,
                    styles.basicLook,
                    isNumericInput && styles.numberInput,
                    !append && styles.inputLook,
                    isFocus && styles.focus,
                    fakeValue && styles.hidden,
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
            {append}
        </div>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

export default neosifier(Component);
