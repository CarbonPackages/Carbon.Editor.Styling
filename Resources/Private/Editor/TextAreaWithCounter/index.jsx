import React from "react";
import { connect } from "react-redux";
import { TextArea } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import clsx from "clsx";
import style from "../style.module.css";

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
    warningLengthMin: null,
    errorLengthMin: null,
    warningLengthMax: null,
    errorLengthMax: null,
};

function Editor({ id, value, commit, className, identifier, options, i18nRegistry, config }) {
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
    const charCounterAdditionalClass = (() => {
        if ((errorLengthMin && charCount < errorLengthMin) || (errorLengthMax && charCount > errorLengthMax)) {
            return style.errorColor;
        }
        if ((warningLengthMin && charCount < warningLengthMin) || (warningLengthMax && charCount > warningLengthMax)) {
            return style.warningColor;
        }
        return null;
    })();

    return (
        <>
            <TextArea
                id={id}
                value={value === null ? "" : value}
                className={clsx(style.userInput, className)}
                onChange={commit}
                disabled={disabled}
                maxLength={maxlength}
                readOnly={readonly}
                placeholder={placeholder && i18nRegistry.translate(unescape(placeholder))}
                minRows={minRows}
                maxRows={maxRows}
                expandedRows={expandedRows}
            />
            {showCounter && <span className={clsx(style.charCounter, charCounterAdditionalClass)}>{charCounter}</span>}
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.TextAreaWithCounter"),
}));

export default neosifier(Editor);
