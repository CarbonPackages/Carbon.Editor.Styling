import React, { useState, Children } from "react";
import { TextArea } from "@neos-project/react-ui-components";
import { injectNeosProps } from "../Helper/Neos";
import * as stylex from "@stylexjs/stylex";

const defaultOptions = {
    disabled: false,
    maxlength: null,
    readonly: false,
    placeholder: "",
    minRows: 2,
    maxRows: 24,
    expandedRows: 6,
    showCounter: true,
    countPlaceholder: false,
    allowLineBreaks: true,
    warningLengthMin: null,
    errorLengthMin: null,
    warningLengthMax: null,
    errorLengthMax: null,
};

const styles = stylex.create({
    childrenContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    charCounter: (type, focus) => ({
        display: "block",
        textAlign: "right",
        fontSize: "var(--fontSize-Small)",
        marginBottom: "-1.1em",
        lineHeight: 1.1,
        userSelect: "none",
        transition: "color var(--transition-Default), opacity var(--transition-Default)",
        opacity: focus ? 1 : 0.8,
        color: type ? `var(--colors-${type})` : null,
    }),
});

function TextAreaWithCounter({ id, value, commit, className, options, i18nRegistry, onEnterKey, config, children }) {
    const [focus, setFocus] = useState(false);
    const {
        disabled,
        maxlength,
        readonly,
        placeholder,
        minRows,
        maxRows,
        expandedRows,
        showCounter,
        countPlaceholder,
        allowLineBreaks,
        warningLengthMin,
        errorLengthMin,
        warningLengthMax,
        errorLengthMax,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };
    const charCountValue = value || (countPlaceholder && placeholder) || "";
    const charCount =
        typeof Intl !== "undefined" && Intl.Segmenter
            ? [...new Intl.Segmenter().segment(charCountValue)].length
            : charCountValue.length;
    const charCounter = i18nRegistry.translate(
        "numberOfChars",
        null,
        [charCount],
        "Carbon.Editor.Styling",
        "Main",
        charCount,
    );
    const charCounterType = (() => {
        if ((errorLengthMin && charCount < errorLengthMin) || (errorLengthMax && charCount > errorLengthMax)) {
            return "Error";
        }
        if ((warningLengthMin && charCount < warningLengthMin) || (warningLengthMax && charCount > warningLengthMax)) {
            return "Warn";
        }
        return null;
    })();

    const onKeyPress = (event) => {
        if (!allowLineBreaks && event.key === "Enter") {
            onEnterKey();
            event.preventDefault();
        }
    };

    const hasChildren = !!Children.count(children);

    return (
        <>
            <TextArea
                id={id}
                value={value === null ? "" : value}
                className={className}
                onKeyPress={onKeyPress}
                onChange={commit}
                onFocus={() => {
                    setFocus(true);
                }}
                onBlur={() => {
                    setFocus(false);
                }}
                disabled={disabled}
                maxLength={maxlength}
                readOnly={readonly}
                placeholder={placeholder && i18nRegistry.translate(unescape(placeholder))}
                minRows={minRows}
                maxRows={maxRows}
                expandedRows={expandedRows}
            />
            {Boolean(hasChildren && showCounter) && (
                <div {...stylex.props(styles.childrenContainer)}>
                    <div>{children}</div>
                    {showCounter && (
                        <span {...stylex.props(styles.charCounter(charCounterType, focus))}>{charCounter}</span>
                    )}
                </div>
            )}
            {Boolean(!hasChildren && showCounter) && (
                <span {...stylex.props(styles.charCounter(charCounterType, focus))}>{charCounter}</span>
            )}
            {Boolean(hasChildren && !showCounter) && children}
        </>
    );
}

export default injectNeosProps(TextAreaWithCounter, "TextAreaWithCounter");
