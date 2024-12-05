import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button, DropDown } from "@neos-project/react-ui-components";
import TextInput from "./Components/TextInput";
import RoundedBox from "./Components/RoundedBox";
import BorderRadiusBox from "./Components/BorderRadiusBox";
import ButtonAsInput from "./Components/ButtonAsInput";
import Circle from "./Components/Circle";
import Dialog from "./Components/Dialog";
import { getNumberAndUnit, limitToMinMax, hasNoValue } from "./Helper";
import { neos } from "@neos-project/neos-ui-decorators";
import { useDebounce } from "use-debounce";
import * as stylex from "@stylexjs/stylex";
import LoadingAnimation from "carbon-neos-loadinganimation/LoadingWithStyleX";

const LazyOrganicEditor = lazy(() => import("./Components/OrganicEditor"));

const styles = stylex.create({
    container: {
        display: "flex",
        gap: "var(--spacing-Quarter)",
    },
    flexColumn: {
        flexDirection: "column",
    },
    highlight: {
        borderRadius: 2,
        outline: "2px solid var(--colors-Warn)",
        outlineOffset: 2,
    },
    segmentedGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "var(--spacing-Quarter)",
        width: "100%",
    },
    centerContent: {
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    preview: (borderRadius, rounded) => ({
        transition: "border-radius var(--transition-Slow) ease, width var(--transition-Slow) ease",
        background: "var(--colors-PrimaryBlue)",
        height: 80,
        borderRadius: rounded ? "50%" : borderRadius,
    }),
    previewBig: (rounded, aspectRatio) => ({
        margin: "var(--spacing-Full) auto 0",
        display: "block",
        aspectRatio: aspectRatio || null,
        width: aspectRatio && aspectRatio < 3.4 ? null : rounded ? 80 : "100%",
        height: !aspectRatio && aspectRatio < 3.4 ? 80 : null,
    }),
    previewSmall: {
        aspectRatio: 1,
        transform: "scale(0.5)",
        margin: -20,
    },
    bigPreviewContainer: (show) => ({
        display: "grid",
        gridTemplateRows: show ? "1fr" : "0fr",
        transition: "grid-template-rows var(--transition-Default) ease-in-out",
    }),
    previewButton: {
        transition: "opacity var(--transition-Default) ease",
    },
    previewButtonInvisible: {
        opacity: 0,
        pointerEvents: "none",
    },
    bigPreviewButton: {
        width: "100%",
        height: "auto",
        overflow: "hidden",
        background: "transparent !important",
        outline: "none !important",
    },
    dropdown: {
        width: "auto !important",
        alignSelf: "start",
    },
    dropdownHeader: {
        position: "relative",
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
    dropdownSvg: {
        minWidth: 15,
        minHeight: 15,
    },
});

const defaultOptions = {
    disabled: false,
    readonly: false,
    allowEmpty: false,
    allowMultiple: false,
    allowOrganic: false,
    allowFullRounded: false,
    allowPercentage: false,
    convertPxToRem: false,
    preview: true,
    previewAspectRatio: null,
    min: 0,
    max: 24,
    placeholder: "",
    fullRoundedValue: 9999,
};

function Editor({ id, value, commit, highlight, options, i18nRegistry, config, onEnterKey }) {
    const [organicEditorOpen, setOrganicEditorOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [bigPreview, setBigPreview] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);

    useEffect(() => {
        const newMode = getMode(value);
        if (mode !== newMode) {
            setMode(newMode);
        }
        if (newMode === "multiple" && !selected) {
            setSelected("all");
        }
        setShowPreview(value !== "");
    }, [value]);

    useEffect(() => {
        if (selected !== null) {
            return;
        }
    }, [selected]);

    const {
        disabled,
        readonly,
        allowEmpty,
        allowMultiple,
        allowOrganic,
        allowFullRounded,
        allowPercentage,
        convertPxToRem,
        preview,
        previewAspectRatio,
        min,
        max,
        placeholder,
        fullRoundedValue,
    } = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    const aspectRatio = (() => {
        if (typeof previewAspectRatio === "number") {
            return previewAspectRatio;
        }

        if (typeof previewAspectRatio !== "string") {
            return null;
        }

        return (0, eval)(previewAspectRatio.replaceAll(":", "/"));
    })();

    // Content repository to editor
    const values = (() => {
        const mode = getMode(value);
        if (mode === "rounded") {
            return {
                mode,
            };
        }

        if (mode === "organic") {
            return {
                mode,
                organic: value,
            };
        }

        if (mode === "single") {
            let main = "";
            if (typeof value === "number") {
                main = getNumberAndUnit(convertPxToRem ? value * 16 : value, min, max);
            } else {
                main = getNumberAndUnit(value, min, max, allowPercentage, allowEmpty);
            }
            return {
                mode,
                main,
            };
        }

        // Multiple mode is the last
        const values = value.split(" ").map((value) => getNumberAndUnit(value, min, max, allowPercentage));
        return {
            mode,
            topLeft: values[0],
            topRight: values[1],
            bottomRight: values[2],
            bottomLeft: values[3],
        };
    })();

    function getInitState(direction, key, fallback = null) {
        if (fallback === null) {
            fallback = key === "unit" ? "px" : null;
        }
        const config = values[direction];
        if (!config) {
            return fallback;
        }
        const value = config[key];
        if (typeof value !== "undefined") {
            return value;
        }
        return fallback;
    }

    const [mode, setMode] = useState(values.mode);

    // Main Input
    const [mainInputValue, setMainInputValue] = useState(getInitState("main", "value"));
    const [mainUnit, setMainUnit] = useState(getInitState("main", "unit"));
    const [mainMin, setMainMin] = useState(getInitState("main", "min", min));
    const [mainMax, setMainMax] = useState(getInitState("main", "max", max));
    useEffect(() => {
        const isPercentage = mainUnit === "%";
        setMainMin(isPercentage ? 0 : min);
        setMainMax(isPercentage ? 100 : max);
        if (mode === "single") {
            setTopLeftUnit(mainUnit);
            setTopRightUnit(mainUnit);
            setBottomRightUnit(mainUnit);
            setBottomLeftUnit(mainUnit);
        }
    }, [mainUnit]);

    const [organicInputValue, setOrganicInputValue] = useState(getInitState("organic", "value"));
    const [organicInputValueInDialog, setOrganicInputValueInDialog] = useState(getInitState("organic", "value"));

    // Top Left Input
    const [topLeftInputValue, setTopLeftInputValue] = useState(getInitState("topLeft", "value"));
    const [topLeftUnit, setTopLeftUnit] = useState(getInitState("topLeft", "unit"));
    const [topLeftMin, setTopLeftMin] = useState(getInitState("topLeft", "min", min));
    const [topLeftMax, setTopLeftMax] = useState(getInitState("topLeft", "max", max));

    useEffect(() => {
        const isPercentage = topLeftUnit === "%";
        setTopLeftMin(isPercentage ? 0 : min);
        setTopLeftMax(isPercentage ? 100 : max);
    }, [topLeftUnit]);

    // Top Right Input
    const [topRightInputValue, setTopRightInputValue] = useState(getInitState("topRight", "value"));
    const [topRightUnit, setTopRightUnit] = useState(getInitState("topRight", "unit"));
    const [topRightMin, setTopRightMin] = useState(getInitState("topRight", "min", min));
    const [topRightMax, setTopRightMax] = useState(getInitState("topRight", "max", max));
    useEffect(() => {
        const isPercentage = topRightUnit === "%";
        setTopRightMin(isPercentage ? 0 : min);
        setTopRightMax(isPercentage ? 100 : max);
    }, [topRightUnit]);

    // Bottom Right Input
    const [bottomRightInputValue, setBottomRightInputValue] = useState(getInitState("bottomRight", "value"));
    const [bottomRightUnit, setBottomRightUnit] = useState(getInitState("bottomRight", "unit"));
    const [bottomRightMin, setBottomRightMin] = useState(getInitState("bottomRight", "min", min));
    const [bottomRightMax, setBottomRightMax] = useState(getInitState("bottomRight", "max", max));
    useEffect(() => {
        const isPercentage = bottomRightUnit === "%";
        setBottomRightMin(isPercentage ? 0 : min);
        setBottomRightMax(isPercentage ? 100 : max);
    }, [bottomRightUnit]);

    // Bottom Left Input
    const [bottomLeftInputValue, setBottomLeftInputValue] = useState(getInitState("bottomLeft", "value"));
    const [bottomLeftUnit, setBottomLeftUnit] = useState(getInitState("bottomLeft", "unit"));
    const [bottomLeftMin, setBottomLeftMin] = useState(getInitState("bottomLeft", "min", min));
    const [bottomLeftMax, setBottomLeftMax] = useState(getInitState("bottomLeft", "max", max));
    useEffect(() => {
        const isPercentage = bottomLeftUnit === "%";
        setBottomLeftMin(isPercentage ? 0 : min);
        setBottomLeftMax(isPercentage ? 100 : max);
    }, [bottomLeftUnit]);

    // Commit on mode change
    useEffect(() => {
        if (mode === "rounded") {
            commitIfChanged(`${fullRoundedValue}px`);
            return;
        }
        if (mode === "single") {
            commitMainValue();
            return;
        }
        if (mode === "organic") {
            commitOrganicValue();
            return;
        }
        if (mode === "multiple") {
            commitMultipleValues();
            return;
        }
    }, [mode]);

    // Commit main input
    function commitMainValue() {
        if (mode === "single") {
            commitIfChanged(convertForCommit(mainInputValue, mainUnit, allowEmpty));
        }
    }
    useEffect(commitMainValue, [mainInputValue, mainUnit]);

    // Commit organic input
    function commitOrganicValue() {
        if (organicInputValue && mode === "organic") {
            commitIfChanged(organicInputValue);
        }
    }
    useEffect(commitOrganicValue, [organicInputValue]);

    // Commit multiple inputs
    function commitMultipleValues() {
        if (
            mode !== "multiple" ||
            topLeftInputValue === null ||
            topRightInputValue === null ||
            bottomRightInputValue === null ||
            bottomLeftInputValue === null
        ) {
            return;
        }
        const tl = convertForCommit(topLeftInputValue, topLeftUnit);
        const tr = convertForCommit(topRightInputValue, topRightUnit);
        const br = convertForCommit(bottomRightInputValue, bottomRightUnit);
        const bl = convertForCommit(bottomLeftInputValue, bottomLeftUnit);
        commitIfChanged(`${tl} ${tr} ${br} ${bl}`);
    }
    useEffect(commitMultipleValues, [
        topLeftInputValue,
        topRightInputValue,
        bottomRightInputValue,
        bottomLeftInputValue,
        topLeftUnit,
        topRightUnit,
        bottomRightUnit,
        bottomLeftUnit,
    ]);

    function commitIfChanged(newValue) {
        if (newValue !== value) {
            commit(newValue);
        }
    }

    function convertForCommit(number, unit, allowEmpty = false) {
        if (hasNoValue(number)) {
            return allowEmpty ? "" : "0";
        }
        let divider = 1;
        if (!unit || unit === "px") {
            unit = convertPxToRem ? "rem" : "px";
            divider = convertPxToRem ? 16 : 1;
        }
        const convertedNumber = number / divider;
        return convertedNumber === 0 ? "0" : `${convertedNumber}${unit}`;
    }

    function getMode(input) {
        if (allowFullRounded && input && (input === `${fullRoundedValue}px` || input === fullRoundedValue)) {
            return "rounded";
        }

        if (typeof input === "string") {
            if (allowOrganic && input.includes("/")) {
                return "organic";
            }
            if (allowMultiple && value.includes(" ") && value.trim().split(" ").length === 4) {
                return "multiple";
            }
        }

        return "single";
    }

    useEffect(() => {
        if (potentailAllSelected && potentailAllSelected === selected) {
            setSelected("all");
        }
        setPotentialAllSelected(false);
    }, [potentailAllSelected]);

    return (
        <>
            <div {...stylex.props(styles.container, highlight && styles.highlight, disabled && styles.disabled)}>
                {mode === "multiple" && (
                    <div {...stylex.props(styles.segmentedGrid)}>
                        <TextInput
                            id={id}
                            value={topLeftInputValue}
                            unit={topLeftUnit}
                            unitSwitch={allowPercentage ? setTopLeftUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={topLeftMin}
                            max={topLeftMax}
                            onChange={(value) => {
                                setTopLeftInputValue(limitToMinMax(value, topLeftMin, topLeftMax));
                            }}
                            setFocus={selected === "topLeft"}
                            onFocus={() => setSelected("topLeft")}
                            onBlur={() => setPotentialAllSelected("topLeft")}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:topLeft")}
                        />
                        <TextInput
                            value={topRightInputValue}
                            unit={topRightUnit}
                            unitSwitch={allowPercentage ? setTopRightUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={topRightMin}
                            max={topRightMax}
                            onChange={(value) => {
                                setTopRightInputValue(limitToMinMax(value, topRightMin, topRightMax));
                            }}
                            setFocus={selected === "topRight"}
                            onFocus={() => setSelected("topRight")}
                            onBlur={() => setPotentialAllSelected("topRight")}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:topRight")}
                        />
                        <TextInput
                            value={bottomLeftInputValue}
                            unit={bottomLeftUnit}
                            unitSwitch={allowPercentage ? setBottomLeftUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={bottomLeftMin}
                            max={bottomLeftMax}
                            onChange={(value) => {
                                setBottomLeftInputValue(limitToMinMax(value, bottomLeftMin, bottomLeftMax));
                            }}
                            setFocus={selected === "bottomLeft"}
                            onFocus={() => setSelected("bottomLeft")}
                            onBlur={() => setPotentialAllSelected("bottomLeft")}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:bottomLeft")}
                        />
                        <TextInput
                            value={bottomRightInputValue}
                            unit={bottomRightUnit}
                            unitSwitch={allowPercentage ? setBottomRightUnit : null}
                            readOnly={readonly}
                            placeholder={placeholder}
                            onEnterKey={onEnterKey}
                            type="number"
                            min={bottomRightMin}
                            max={bottomRightMax}
                            onChange={(value) => {
                                setBottomRightInputValue(limitToMinMax(value, bottomRightMin, bottomRightMax));
                            }}
                            setFocus={selected === "bottomRight"}
                            onFocus={() => setSelected("bottomRight")}
                            onBlur={() => setPotentialAllSelected("bottomRight")}
                            title={i18nRegistry.translate("Carbon.Editor.Styling:Main:bottomRight")}
                        />
                    </div>
                )}
                {mode === "single" && (
                    <TextInput
                        id={id}
                        allowEmpty={allowEmpty}
                        value={mainInputValue}
                        unit={mainUnit}
                        unitSwitch={allowPercentage ? setMainUnit : null}
                        readOnly={readonly}
                        placeholder={placeholder}
                        onEnterKey={onEnterKey}
                        type="number"
                        min={mainMin}
                        max={mainMax}
                        setFocus={mainFocus}
                        onChange={(value) => {
                            if (allowEmpty && hasNoValue(value)) {
                                setMainInputValue("");
                                return;
                            }
                            setMainInputValue(limitToMinMax(value, mainMin, mainMax));
                        }}
                        onBlur={() => setMainFocus(false)}
                        containerStyle={styles.fullInput}
                    />
                )}
                {mode === "rounded" && (
                    <ButtonAsInput
                        id={id}
                        readonly={readonly}
                        onClick={() => {
                            setMode("single");
                            setTimeout(() => {
                                setMainFocus(true);
                            }, 0);
                        }}
                    >
                        {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")}
                    </ButtonAsInput>
                )}
                {mode === "organic" && (
                    <ButtonAsInput
                        readonly={readonly}
                        onClick={() => {
                            setOrganicEditorOpen(true);
                        }}
                    >
                        {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.organic")}
                    </ButtonAsInput>
                )}

                {allowOrganic && (
                    <Dialog
                        open={organicEditorOpen}
                        title={i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.organic")}
                        onApply={() => {
                            setOrganicEditorOpen(false);
                            if (mode !== "organic") {
                                setMode("organic");
                            }
                            setTimeout(() => {
                                setOrganicInputValue(organicInputValueInDialog);
                            }, 10);
                        }}
                        onCancel={() => setOrganicEditorOpen(false)}
                    >
                        {organicEditorOpen && (
                            <Suspense fallback={<LoadingAnimation isLoading={true} />}>
                                <LazyOrganicEditor onChange={setOrganicInputValueInDialog} />
                            </Suspense>
                        )}
                    </Dialog>
                )}

                {(allowMultiple || allowFullRounded) && (
                    <DropDown.Stateless
                        title={i18nRegistry.translate(`Carbon.Editor.Styling:Main:borderRadius.${mode}`)}
                        className={stylex.props(styles.dropdown, readonly && styles.disabled).className}
                        isOpen={dropdownOpen}
                        onToggle={() => setDropdownOpen(!dropdownOpen)}
                        onClose={() => false}
                    >
                        <DropDown.Header className={stylex.props(styles.dropdownHeader).className}>
                            {mode === "multiple" && <BorderRadiusBox selected={selected} />}
                            {mode === "single" && <RoundedBox />}
                            {mode === "rounded" && <Circle />}
                            {mode === "organic" && <BorderRadiusBox organic={true} />}
                        </DropDown.Header>
                        <DropDown.Contents className={stylex.props(styles.dropdownContent).className}>
                            <Button
                                className={stylex.props(styles.dropdownButton).className}
                                onClick={() => {
                                    setDropdownOpen(false);
                                    if (mode === "single") {
                                        setMainFocus(true);
                                        return;
                                    }

                                    if (mode === "multiple") {
                                        setSelected(null);
                                    }
                                    if (mainInputValue === null) {
                                        setMainInputValue(mainMin);
                                    }
                                    setMode("single");
                                    setTimeout(() => {
                                        setMainFocus(true);
                                    }, 0);
                                }}
                            >
                                <RoundedBox {...stylex.props(styles.dropdownSvg)} />{" "}
                                {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.single")}
                            </Button>
                            {allowFullRounded && (
                                <Button
                                    className={stylex.props(styles.dropdownButton).className}
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        if (mode !== "rounded") {
                                            setMode("rounded");
                                        }
                                    }}
                                >
                                    <Circle {...stylex.props(styles.dropdownSvg)} />
                                    {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")}
                                </Button>
                            )}
                            {allowMultiple && (
                                <Button
                                    className={stylex.props(styles.dropdownButton).className}
                                    onClick={() => {
                                        if (mode === "multiple") {
                                            const order = ["topLeft", "topRight", "bottomRight", "bottomLeft"];
                                            const currentIndex = order.indexOf(selected);
                                            const nextIndex = (currentIndex + 1) % order.length;
                                            setSelected(order[nextIndex]);
                                            return;
                                        }
                                        setMode("multiple");
                                        const newValue = mainInputValue || min;
                                        setSelected("topLeft");
                                        let commited = false;
                                        if (topLeftInputValue === null) {
                                            setTopLeftInputValue(newValue);
                                            commited = true;
                                        }
                                        if (topRightInputValue === null) {
                                            setTopRightInputValue(newValue);
                                            commited = true;
                                        }
                                        if (bottomRightInputValue === null) {
                                            setBottomRightInputValue(newValue);
                                            commited = true;
                                        }
                                        if (bottomLeftInputValue === null) {
                                            setBottomLeftInputValue(newValue);
                                            commited = true;
                                        }
                                        if (!commited) {
                                            setTimeout(commitMultipleValues, 0);
                                        }
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <BorderRadiusBox {...stylex.props(styles.dropdownSvg)} selected={selected} />
                                    {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.multiple")}
                                </Button>
                            )}
                            {allowOrganic && (
                                <Button
                                    className={stylex.props(styles.dropdownButton).className}
                                    onClick={() => {
                                        setOrganicEditorOpen(true);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <BorderRadiusBox {...stylex.props(styles.dropdownSvg)} organic={true} />
                                    {i18nRegistry.translate("Carbon.Editor.Styling:Main:borderRadius.organic")}
                                </Button>
                            )}
                        </DropDown.Contents>
                    </DropDown.Stateless>
                )}

                {preview && (
                    <Button
                        style="clean"
                        hoverStyle="clean"
                        title={i18nRegistry.translate(
                            `Carbon.Editor.Styling:Main:${bigPreview ? "hide" : "show"}BigPreview`,
                        )}
                        className={
                            stylex.props(
                                styles.centerContent,
                                styles.previewButton,
                                !showPreview && styles.previewButtonInvisible,
                            ).className
                        }
                        onClick={() => setBigPreview(!bigPreview)}
                    >
                        <span {...stylex.props(styles.preview(value, mode === "rounded"), styles.previewSmall)}></span>
                    </Button>
                )}
            </div>
            {preview && (
                <div {...stylex.props(styles.bigPreviewContainer(showPreview ? bigPreview : false))}>
                    <Button
                        style="clean"
                        hoverStyle="clean"
                        title={i18nRegistry.translate("Carbon.Editor.Styling:Main:hideBigPreview")}
                        className={stylex.props(styles.centerContent, styles.bigPreviewButton).className}
                        onClick={() => setBigPreview(false)}
                    >
                        <span
                            {...stylex.props(
                                styles.preview(value, mode === "rounded"),
                                styles.previewBig(mode === "rounded", aspectRatio),
                            )}
                        ></span>
                    </Button>
                </div>
            )}
        </>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Editor.Styling.BorderRadius"),
}));

export default neosifier(Editor);
