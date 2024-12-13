import React, { useState, useEffect, useCallback } from "react";
import { Icon, IconButton } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import { DropDown } from "@neos-project/react-ui-components";
import { getFontCollection } from "./Helper";
import * as stylex from "@stylexjs/stylex";

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowEmpty: true,
    placeholder: "",
    enableFallback: true,
    showIcons: true,
    fonts: {},
};

const styles = stylex.create({
    font: (fontFamily, fontWeight, fontStyle) => ({
        fontFamily,
        fontWeight,
        fontStyle,
    }),
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
        ":where(*)>*": {
            pointerEvents: "none",
        },
    },
    placeholder: {
        opacity: 0.65,
    },
    highlight: {
        borderRadius: 2,
        outline: "2px solid var(--colors-Warn)",
        outlineOffset: 2,
    },
    button: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--spacing-Half) var(--spacing-Full)",
        border: 0,
        color: "var(--colors-ContrastBrightest)",
        gap: "var(--spacing-Half)",
        textAlign: "left",
        minHeight: "var(--spacing-GoldenUnit)",
        background: "var(--colors-ContrastDarkest)",
        cursor: "pointer",

        ":not(:first-child)": {
            borderTop: "1px solid var(--colors-ContrastNeutral)",
        },
        ":hover": {
            background: "var(--colors-PrimaryBlue)",
        },
        ":focus": {
            outline: "1px solid var(--colors-PrimaryBlue)",
        },
    },
    bigFont: {
        fontSize: 18,
    },
    fontWithFallback: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "var(--spacing-Quarter)",
        lineHeight: 1,
        height: 40,
    },
});

function FontFamily({ id, value, commit, options, highlight, i18nRegistry, onEnterKey, config }) {
    const { disabled, readonly, allowEmpty, placeholder, enableFallback, showIcons } = {
        ...defaultOptions,
        ...config,
        ...options,
    };
    const fonts = getFontCollection({ ...defaultOptions.fonts, ...config.fonts, ...options.fonts }, enableFallback);
    const css = Object.values(fonts)
        .map(({ css }) => css)
        .join("");
    const cssImports = Object.values(fonts)
        .map(({ cssImports }) => cssImports)
        .join("");

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFont, setSelectedFont] = useState("");
    const [selectedFallback, setSelectedFallback] = useState("");

    useEffect(() => {
        if (!value) {
            setSelectedFont("");
            setSelectedFallback("");
            return;
        }
        const [font, ...fallback] = value.split(",");
        setSelectedFont(font);
        setSelectedFallback(fallback.join(","));
    }, [value]);

    const translatedPlaceholder = placeholder ? i18nRegistry.translate(placeholder) : "";

    return (
        <>
            {(!!css || !!cssImports) && (
                <style>
                    {cssImports}
                    {css}
                </style>
            )}
            <DropDown.Stateless
                className={
                    stylex.props(highlight && styles.highlight, readonly || (disabled && styles.disabled)).className
                }
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onClose={() => setIsOpen(false)}
            >
                <DropDown.Header id={id} className={stylex.props(!!value && allowEmpty && styles.header).className}>
                    <span
                        {...stylex.props(
                            !value && styles.placeholder,
                            styles.fontWithFallback,
                            value && styles.font(value),
                        )}
                    >
                        <span>{selectedFont || translatedPlaceholder}</span>
                        {enableFallback && selectedFont && selectedFallback && (
                            <small {...stylex.props(styles.font(selectedFallback))}>{selectedFallback}</small>
                        )}
                    </span>
                    {allowEmpty && !!value && (
                        <IconButton
                            icon="times"
                            onClick={(event) => {
                                commit("");
                                event.stopPropagation();
                            }}
                        />
                    )}
                </DropDown.Header>
                <DropDown.Contents scrollable={true}>
                    {Object.values(fonts).map(({ label, fontFile, cssFile, value }) => (
                        <button
                            className={stylex.props(styles.button).className}
                            key={label}
                            onClick={() => {
                                commit(value);
                            }}
                        >
                            <span {...stylex.props(styles.font(value), styles.bigFont)}>{label}</span>
                            {!!fontFile && showIcons && <Icon icon="file" title={fontFile} />}
                            {!!cssFile && showIcons && <Icon icon="link" title={cssFile} />}
                        </button>
                    ))}
                </DropDown.Contents>
            </DropDown.Stateless>
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.BackgroundSize"),
}));

export default neosifier(FontFamily);
