import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { neos } from "@neos-project/neos-ui-decorators";
import { Button, DropDown, Icon, CheckBox } from "@neos-project/react-ui-components";
import DebugOutput from "../Components/DebugOutput";
import TextInput from "../Components/TextInput";
import { fromContentRepoToEditor, needDarkColor } from "./Helper";
import { hasNoValue } from "../Helper";
import BorderPreview from "./BorderPreview";
import { HexColorPicker, HexColorInput } from "react-colorful";
import * as stylex from "@stylexjs/stylex";

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowEmpty: true,
    allowWidth: true,
    allowStyle: true,
    allowColorPicker: true,
    allowColorInput: true,
    convertPxToRem: false,
    presetColors: [],
    minBorderWidth: 0,
    maxBorderWidth: 100,
    placeholder: "",
};
const defaultBorderStyles = {
    solid: true,
    dashed: true,
    dotted: true,
    double: true,
    groove: false,
    ridge: false,
    inset: false,
    outset: false,
};

const styles = stylex.create({
    container: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
    },
    highlight: {
        borderRadius: 2,
        outline: "2px solid var(--colors-Warn)",
        outlineOffset: 2,
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
    dropdown: {
        width: "auto !important",
        alignSelf: "start",
    },
    dropdownHeaderColor: {
        position: "relative",
        padding: 0,
        width: "var(--spacing-GoldenUnit) !important",
        ":is(*)>svg": {
            transition: "color var(--transition-Default)",
        },
    },
    dropdownHeaderColorDark: {
        ":is(*)>svg": {
            color: "#000 !important",
        },
    },
    dropdownColor: (color) => ({
        backgroundColor: color !== "currentColor" ? color : "transparent",
        position: "absolute",
        inset: 0,
    }),
    colorPicker: {
        ":is(*)>:is(.react-colorful__saturation,.react-colorful__last-control)": {
            borderRadius: "0 !important",
        },
    },
    colorInput: {
        margin: "var(--spacing-Quarter) 0 0 !important",
        height: "var(--spacing-GoldenUnit)",
        background: "var(--colors-ContrastNeutral)",
        color: "var(--colors-ContrastBrightest)",
        border: 0,
        fontSize: "var(--fontSize-Base)",
        cursor: "text",
        padding: "0 var(--fontSize-Base)",
        appearance: "none",
        width: "100%",
        textAlign: "left",
        ":focus": {
            outline: "none",
            color: "var(--colors-ContrastDarkest)",
            background: "var(--colors-ContrastBrightest)",
        },
    },
    presetColorContainer: {
        display: "flex",
        gap: "var(--spacing-Half)",
        flexWrap: "wrap",
        margin: "var(--spacing-Half)",
    },
    presetButton: (backgroundColor) => ({
        width: 30,
        height: 30,
        padding: "0 !important",
        backgroundColor,
        border: 0,
        outline: "var(--colors-ContrastNeutral) solid 1px",
        borderRadius: 2,
        cursor: "pointer",
    }),
    dropdownHeader: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    dropdownColorContent: {
        right: 0,
        left: "auto !important",
        width: "200px !important",
        maxWidth: "200px !important",
    },
    dropdownCheckbox: {
        padding: "var(--spacing-Full) var(--spacing-Half)",
        display: "flex",
        gap: "var(--spacing-Quarter)",
        cursor: "pointer",
    },
    dropdownContent: {
        right: 0,
        left: "auto !important",
        width: "max-content !important",
        maxWidth: "220px !important",
    },
    dropdownButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "var(--spacing-Half)",
        textAlign: "left",
    },
});

function Border({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const {
        disabled,
        readonly,
        allowEmpty,
        convertPxToRem,
        minBorderWidth,
        maxBorderWidth,
        placeholder,
        allowWidth,
        allowStyle,
        allowColorPicker,
        allowColorInput,
        presetColors,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };
    const borderStyles = Object.entries({ ...defaultBorderStyles, ...config?.borderStyles, ...options?.borderStyles })
        .map(([key, value]) => (value ? key : false))
        .filter(Boolean);

    // Content repository to editor
    const values = fromContentRepoToEditor({
        value,
        allowEmpty,
        borderStyles,
        minBorderWidth,
        maxBorderWidth,
    });

    const commitIfChanged = useCallback(
        (newValue) => {
            if (newValue !== value) {
                commit(newValue);
            }
        },
        [value, commit],
    );

    const [width, setWidth] = useState(values.width);
    const [style, setStyle] = useState(values.style);
    const [color, setColor] = useState(values.color);
    const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
    const [hasPresetColor, setHasPresetColor] = useState(false);
    const [currentColor, setSetCurrentColor] = useState(values.color === "currentColor");

    useEffect(() => {
        setSetCurrentColor(color === "currentColor");
    }, [color]);

    useEffect(() => {
        setHasPresetColor(Array.isArray(presetColors) && !!presetColors.length);
    }, [presetColors]);

    useEffect(() => {
        const hasValue = !hasNoValue(width);
        if (allowEmpty && !hasValue) {
            commitIfChanged("");
        }
        const number = hasValue ? (typeof width === "string" ? parseInt(width) : width) : minBorderWidth;
        if (number === 0) {
            commitIfChanged("0");
            return;
        }

        const newWidth = convertPxToRem ? width / 16 : width;
        const unit = convertPxToRem ? "rem" : "px";
        const newValue = `${newWidth}${unit} ${style || "solid"} ${color || "currentColor"}`;
        commitIfChanged(newValue);
    }, [width, style, color, convertPxToRem]);

    return (
        <>
            <DebugOutput>VALUE: "{value}"</DebugOutput>
            <div {...stylex.props(styles.container, highlight && styles.highlight, disabled && styles.disabled)}>
                {allowWidth && (
                    <TextInput
                        id={id}
                        allowEmpty={allowEmpty}
                        value={width}
                        onChange={(value) => setWidth(hasNoValue(value) ? "" : parseInt(value))}
                        unit="px"
                        readOnly={readonly}
                        onEnterKey={onEnterKey}
                        placeholder={placeholder}
                        type="number"
                        min={minBorderWidth}
                        max={maxBorderWidth}
                        containerStyle={styles.fullInput}
                    />
                )}
                {allowStyle && borderStyles.length > 1 && (!allowWidth || (allowWidth && !!width)) && (
                    <DropDown.Stateless
                        title={
                            styleDropdownOpen
                                ? null
                                : i18nRegistry.translate(
                                      `borderStyle.${style}`,
                                      style,
                                      [],
                                      "Carbon.Editor.Styling",
                                      "Main",
                                  )
                        }
                        className={stylex.props(styles.dropdown, readonly && styles.disabled).className}
                        isOpen={styleDropdownOpen}
                        onToggle={() => setStyleDropdownOpen(!styleDropdownOpen)}
                        onClose={() => setStyleDropdownOpen(false)}
                    >
                        <DropDown.Header className={stylex.props(styles.dropdownHeader).className}>
                            <BorderPreview style={style} />
                        </DropDown.Header>
                        <DropDown.Contents className={stylex.props(styles.dropdownContent).className}>
                            {borderStyles.map((borderStyle) => (
                                <Button
                                    key={borderStyle}
                                    className={stylex.props(styles.dropdownButton).className}
                                    onClick={() => {
                                        setStyle(borderStyle);
                                        setStyleDropdownOpen(false);
                                    }}
                                >
                                    <BorderPreview style={borderStyle} />
                                    {i18nRegistry.translate(
                                        `borderStyle.${borderStyle}`,
                                        borderStyle,
                                        [],
                                        "Carbon.Editor.Styling",
                                        "Main",
                                    )}
                                </Button>
                            ))}
                        </DropDown.Contents>
                    </DropDown.Stateless>
                )}
                {(allowColorPicker || allowColorInput || hasPresetColor) &&
                    (!allowWidth || (allowWidth && !!width)) && (
                        <DropDown.Stateless
                            title={
                                colorDropdownOpen
                                    ? null
                                    : currentColor
                                      ? i18nRegistry.translate("Carbon.Editor.Styling:Main:textColor")
                                      : color
                            }
                            className={stylex.props(styles.dropdown, readonly && styles.disabled).className}
                            isOpen={colorDropdownOpen}
                            onToggle={() => setColorDropdownOpen(!colorDropdownOpen)}
                            onClose={(event) => {
                                if (!event) {
                                    // If no event is set, the click is outside
                                    setColorDropdownOpen(false);
                                }
                            }}
                        >
                            <DropDown.Header
                                className={
                                    stylex.props(
                                        styles.dropdownHeaderColor,
                                        needDarkColor(color) && styles.dropdownHeaderColorDark,
                                    ).className
                                }
                            >
                                <div {...stylex.props(styles.dropdownColor(color))}></div>
                            </DropDown.Header>
                            <DropDown.Contents className={stylex.props(styles.dropdownColorContent).className}>
                                {(allowColorPicker || allowColorInput) && (
                                    <label {...stylex.props(styles.dropdownCheckbox)}>
                                        <CheckBox
                                            onChange={() => {
                                                if (!currentColor) {
                                                    setColorDropdownOpen(false);
                                                }
                                                setColor(currentColor ? "#000000" : "currentColor");
                                            }}
                                            isChecked={currentColor}
                                        />
                                        <span>{i18nRegistry.translate("Carbon.Editor.Styling:Main:useTextColor")}</span>
                                    </label>
                                )}
                                {!currentColor && allowColorPicker && (
                                    <HexColorPicker
                                        color={color}
                                        onChange={setColor}
                                        {...stylex.props(styles.colorPicker)}
                                    />
                                )}
                                {!currentColor && allowColorInput && (
                                    <HexColorInput
                                        prefixed={true}
                                        color={color}
                                        onChange={setColor}
                                        {...stylex.props(styles.colorInput)}
                                    />
                                )}
                                {hasPresetColor && (
                                    <div {...stylex.props(styles.presetColorContainer)}>
                                        {presetColors.map((preset) => (
                                            <button
                                                type="button"
                                                title={preset}
                                                onClick={() => setColor(preset)}
                                                {...stylex.props(styles.presetButton(preset))}
                                            ></button>
                                        ))}
                                    </div>
                                )}
                            </DropDown.Contents>
                        </DropDown.Stateless>
                    )}
            </div>
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.Border"),
}));

export default neosifier(Border);
