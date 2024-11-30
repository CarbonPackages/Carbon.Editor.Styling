import React, { useState } from "react";
import { connect } from "react-redux";
import { TextArea } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import clsx from "clsx";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
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

function Editor({ id, value, commit, className, identifier, options, i18nRegistry, config }) {
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
    const charCountValue = value ? value : countPlaceholder && placeholder ? placeholder : "";
    const charCount =
        typeof Intl != "undefined" && Intl.Segmenter
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
        if (allowLineBreaks) {
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

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
            {showCounter && <span {...stylex.props(styles.charCounter(charCounterType, focus))}>{charCounter}</span>}
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.TextAreaWithCounter"),
}));

export default neosifier(Editor);
