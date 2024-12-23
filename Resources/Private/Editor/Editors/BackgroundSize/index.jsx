import React, { useState, useEffect, useCallback } from "react";
import { Button, Icon } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import { fromContentRepoToEditor } from "./Helper";
import { limitToMinMax } from "../../Helper";
import Dropdown from "../../Components/Dropdown";
import DebugOutput from "../../Components/DebugOutput";
import TextInput from "../../Components/TextInput";
import ButtonAsInput from "../../Components/ButtonAsInput";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    container: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
    },
    column: {
        flexDirection: "column",
    },
    inputContainer: {
        flex: 1,
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
    dropdownButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "var(--spacing-Half)",
        textAlign: "left",
        paddingRight: "0 !important",
    },
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    placeholder: "",
    min: 1,
    max: null,
    allowPixel: true,
    allowPercentage: true,
    allowContain: true,
    allowAuto: true,
    allowCover: true,
};

function BackgroundSize({ id, value, commit, options, highlight, i18nRegistry, onEnterKey, config }) {
    const {
        disabled,
        readonly,
        placeholder,
        min,
        max,
        allowPixel,
        allowPercentage,
        allowContain,
        allowAuto,
        allowCover,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    const [mode, setMode] = useState(null);
    const [unit, setUnit] = useState(null);
    const [size, setSize] = useState(null);
    const [minInput, setMinInput] = useState(null);
    const [maxInput, setMaxInput] = useState(null);
    const [isLength, setIsLength] = useState(null);

    const numberOfModes = [allowPixel || allowPercentage, allowContain, allowAuto, allowCover].filter(Boolean).length;

    const commitIfChanged = useCallback(
        (newValue) => {
            if (newValue !== value) {
                commit(newValue);
            }
        },
        [value, commit],
    );

    useEffect(() => {
        const values = fromContentRepoToEditor({
            value,
            min,
            max,
            allowPercentage,
            allowContain,
            allowAuto,
            allowCover,
        });
        setUnit(values.mode === "px" ? "px" : "%");
        setMode(values.mode);
        const minVal = values.mode == "%" ? 1 : min;
        const maxval = values.mode == "%" ? 100 : max;
        const sizeVal = limitToMinMax(values.size || 100, minVal, maxval);
        setSize(sizeVal);
        setMinInput(minVal);
        setMaxInput(maxval);
        setIsLength(values.mode === "px" || values.mode === "%");
    }, []);

    useEffect(() => {
        if (mode === "%") {
            setUnit(mode);
            setMinInput(1);
            setMaxInput(100);
            const newSize = limitToMinMax(size, 1, 100);
            setSize(newSize);
            commitIfChanged(`${newSize}${mode}`);
            setIsLength(true);
            return;
        }
        if (mode === "px") {
            setUnit(mode);
            setMinInput(min);
            setMaxInput(max);
            const newSize = limitToMinMax(size, min, max);
            setSize(newSize);
            commitIfChanged(`${newSize}${mode}`);
            setIsLength(true);
            return;
        }
        commitIfChanged(mode);
        setIsLength(false);
    }, [mode]);

    useEffect(() => {
        if (mode === "%" || mode === "px") {
            commitIfChanged(`${size}${mode}`);
        }
    }, [size]);

    if (!numberOfModes) {
        console.error(
            "Invalid configuration. At least one type (allowPixel, allowPercentage, allowContain, allowAuto, allowCover) must be true.",
        );
        return null;
    }

    return (
        <>
            <DebugOutput>
                VALUE: "{value}" SIZE "{size}"
            </DebugOutput>
            <div {...stylex.props(styles.container, highlight && styles.highlight, disabled && styles.disabled)}>
                {(allowPercentage || allowPixel) && isLength && (
                    <TextInput
                        id={id}
                        value={size}
                        unit={unit}
                        unitSwitch={allowPercentage && allowPixel ? setMode : null}
                        onChange={setSize}
                        readOnly={readonly}
                        onEnterKey={onEnterKey}
                        placeholder={placeholder}
                        type="number"
                        min={minInput}
                        max={maxInput}
                        containerStyle={styles.inputContainer}
                    />
                )}
                {!isLength && (
                    <ButtonAsInput id={id} style={styles.inputContainer}>
                        {mode}
                    </ButtonAsInput>
                )}
                {numberOfModes > 1 && (
                    <Dropdown
                        title={i18nRegistry.translate(
                            `Carbon.Editor.Styling:Main:backgroundSize.${isLength ? "length" : mode}.description`,
                        )}
                        readonly={readonly}
                        width={165}
                        header={i18nRegistry.translate(`Carbon.Editor.Styling:Main:backgroundSize.${mode}`)}
                    >
                        {allowPixel && (
                            <Button
                                title={i18nRegistry.translate(
                                    "Carbon.Editor.Styling:Main:backgroundSize.length.description",
                                )}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => {
                                    setMode("px");
                                }}
                            >
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:backgroundSize.px")}
                            </Button>
                        )}
                        {allowPercentage && (
                            <Button
                                title={i18nRegistry.translate(
                                    "Carbon.Editor.Styling:Main:backgroundSize.length.description",
                                )}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => setMode("%")}
                            >
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:backgroundSize.%")}
                            </Button>
                        )}
                        {allowCover && (
                            <Button
                                title={i18nRegistry.translate(
                                    "Carbon.Editor.Styling:Main:backgroundSize.cover.description",
                                )}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => setMode("cover")}
                            >
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:backgroundSize.cover")}
                            </Button>
                        )}
                        {allowContain && (
                            <Button
                                title={i18nRegistry.translate(
                                    "Carbon.Editor.Styling:Main:backgroundSize.contain.description",
                                )}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => setMode("contain")}
                            >
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:backgroundSize.contain")}
                            </Button>
                        )}
                        {allowAuto && (
                            <Button
                                title={i18nRegistry.translate(
                                    "Carbon.Editor.Styling:Main:backgroundSize.auto.description",
                                )}
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => setMode("auto")}
                            >
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:backgroundSize.auto")}
                            </Button>
                        )}
                    </Dropdown>
                )}
            </div>
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.BackgroundSize"),
}));

export default neosifier(BackgroundSize);
