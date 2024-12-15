import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { neos } from "@neos-project/neos-ui-decorators";
import { Button, Icon, CheckBox } from "@neos-project/react-ui-components";
import Dropdown from "../Components/Dropdown";
import DebugOutput from "../Components/DebugOutput";
import TextInput from "../Components/TextInput";
import { fromContentRepoToEditor, needDarkColor, getDefaultColor } from "./Helper";
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
    allowCurrentColor: true,
    defaultColor: "currentColor",
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
    dropdownColor: (color) => ({
        backgroundColor: color !== "currentColor" ? color : "transparent",
        position: "absolute",
        inset: 0,
        ":is(*)~svg": {
            transition: "color var(--transition-Default)",
        },
    }),
    dropdownColorDark: {
        ":is(*)~svg": {
            color: "#000 !important",
        },
    },
    colorPicker: {
        marginTop: "var(--spacing-Full)",
        ":is(*)>.react-colorful__saturation": {
            borderRadius: "2px 2px 0 0 !important",
        },
        ":is(*)>.react-colorful__last-control": {
            borderRadius: "0 0 2px 2px !important",
        },
    },
    colorInput: {
        margin: "var(--spacing-Full) calc(var(--spacing-Full) * -1) 0 !important",
        height: "var(--spacing-GoldenUnit)",
        background: "var(--colors-ContrastNeutral)",
        color: "var(--colors-ContrastBrightest)",
        border: 0,
        fontSize: "var(--fontSize-Base)",
        cursor: "text",
        padding: "0 var(--fontSize-Base)",
        appearance: "none",
        width: "calc(var(--spacing-Full) * 2 + 100%)",
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
        marginTop: "var(--spacing-Full)",
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
    dropdownCheckbox: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
        cursor: "pointer",
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
        allowCurrentColor,
        allowColorPicker,
        allowColorInput,
        presetColors,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };
    const defaultColor = getDefaultColor({ options, config, defaultOptions });
    const borderStyles = Object.entries({ ...defaultBorderStyles, ...config?.borderStyles, ...options?.borderStyles })
        .map(([key, value]) => (value ? key : false))
        .filter(Boolean);

    // Content repository to editor
    const values = fromContentRepoToEditor({
        value,
        allowEmpty,
        defaultColor,
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
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
    const [hasPresetColor, setHasPresetColor] = useState(false);
    const [currentColor, setSetCurrentColor] = useState(allowCurrentColor ? values.color === "currentColor" : false);

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
        const newValue = `${newWidth}${unit} ${style || "solid"} ${color || defaultColor}`;
        commitIfChanged(newValue);
    }, [width, style, color, convertPxToRem]);

    return (
        <>
            <DebugOutput>VALUE: `{value}`</DebugOutput>
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
                    <Dropdown
                        title={i18nRegistry.translate(
                            `borderStyle.${style}`,
                            style,
                            [],
                            "Carbon.Editor.Styling",
                            "Main",
                        )}
                        headerWidth={30}
                        width={220}
                        header={<BorderPreview style={style} />}
                        readonly={readonly}
                    >
                        {borderStyles.map((borderStyle) => (
                            <Button
                                key={borderStyle}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => {
                                    setStyle(borderStyle);
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
                    </Dropdown>
                )}

                {(allowColorPicker || allowColorInput || hasPresetColor) &&
                    (!allowWidth || (allowWidth && !!width)) && (
                        <Dropdown
                            headerPadding={false}
                            title={
                                currentColor ? i18nRegistry.translate("Carbon.Editor.Styling:Main:textColor") : color
                            }
                            automaticClose={false}
                            header={
                                <div
                                    {...stylex.props(
                                        styles.dropdownColor(color),
                                        needDarkColor(color) && styles.dropdownColorDark,
                                    )}
                                ></div>
                            }
                            width={200}
                            padding
                            headerWidth={40}
                            readonly={readonly}
                            open={colorDropdownOpen}
                            setOpen={setColorDropdownOpen}
                        >
                            {(allowColorPicker || allowColorInput) && allowCurrentColor && (
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
                        </Dropdown>
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
