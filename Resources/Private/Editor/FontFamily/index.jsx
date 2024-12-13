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
    fontGroup: {
        padding: "var(--spacing-Half) var(--spacing-Full)",
        backgroundColor: "var(--colors-ContrastDarker)",
        paddingLeft: "var(--spacing-Full)",
        textTransform: "uppercase",
        fontWeight: 700,
        lineHeight: "30px",
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
    const { importCSS, fontFace, fonts, flat } = getFontCollection(
        { ...defaultOptions.fonts, ...config.fonts, ...options.fonts },
        enableFallback,
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFont, setSelectedFont] = useState(null);

    useEffect(() => {
        if (!value) {
            setSelectedFont(null);
            return;
        }
        const [font] = value.split(",");
        setSelectedFont(flat[font]);
    }, [value]);

    const translatedPlaceholder = placeholder ? i18nRegistry.translate(placeholder) : "";

    return (
        <>
            {(!!importCSS || !!fontFace) && (
                <style>
                    {importCSS}
                    {fontFace}
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
                            value && styles.font(value, selectedFont?.fontWeight, selectedFont?.fontStyle),
                        )}
                    >
                        <span>{selectedFont?.label || translatedPlaceholder}</span>
                        {enableFallback && selectedFont?.fallback && (
                            <small {...stylex.props(styles.font(selectedFont.fallback))}>{selectedFont.fallback}</small>
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
                    {Object.entries(fonts).map(([type, items]) => (
                        <>
                            <div key={type} {...stylex.props(styles.fontGroup)}>
                                {i18nRegistry.translate(`fontType.${type}`, type, [], "Carbon.Editor.Styling", "Main")}
                            </div>
                            {Object.values(items).map(({ label, fontFile, cssFile, value, fontWeight, fontStyle }) => (
                                <button
                                    key={label}
                                    onClick={() => {
                                        commit(value);
                                    }}
                                    {...stylex.props(styles.button)}
                                >
                                    <span {...stylex.props(styles.font(value, fontWeight, fontStyle), styles.bigFont)}>
                                        {label}
                                    </span>
                                    {!!fontFile && showIcons && <Icon icon="file" title={fontFile} />}
                                    {!!cssFile && showIcons && <Icon icon="link" title={cssFile} />}
                                </button>
                            ))}
                        </>
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
