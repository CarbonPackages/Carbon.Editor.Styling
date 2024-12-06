import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Button, DropDown } from "@neos-project/react-ui-components";
import TextInput from "../Components/TextInput";
import RoundedBox from "../Components/RoundedBox";
import ButtonAsInput from "../Components/ButtonAsInput";
import Dialog from "../Components/Dialog";
import Circle from "./Circle";
import BorderRadiusBox from "./BorderRadiusBox";
import { getModeRaw, fromContentRepoToEditor, getAspectRatio, getInitState, convertForCommit } from "./Helper";
import { getNumberAndUnit, limitToMinMax, hasNoValue } from "../Helper";
import { neos } from "@neos-project/neos-ui-decorators";
import { useDebounce } from "use-debounce";
import * as stylex from "@stylexjs/stylex";
import LoadingAnimation from "carbon-neos-loadinganimation/LoadingWithStyleX";

const LazyOrganicEditor = lazy(() => import("./OrganicEditor"));

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

    const aspectRatio = getAspectRatio(previewAspectRatio);

    // Content repository to editor
    const values = fromContentRepoToEditor({
        value,
        allowPercentage,
        allowEmpty,
        convertPxToRem,
        min,
        max,
        allowFullRounded,
        fullRoundedValue,
        allowOrganic,
        allowMultiple,
    });

    // Set states
    const [mode, setMode] = useState(values.mode);
    const [organicEditorOpen, setOrganicEditorOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [bigPreview, setBigPreview] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [selected, setSelected] = useState(null);
    const [mainFocus, setMainFocus] = useState(false);
    const [_potentailAllSelected, setPotentialAllSelected] = useState(false);
    const [potentailAllSelected] = useDebounce(_potentailAllSelected, 500);
    // Main Input
    const [mainInputValue, setMainInputValue] = useState(getInitState(values, "main", "value"));
    const [mainUnit, setMainUnit] = useState(getInitState(values, "main", "unit"));
    const [mainMin, setMainMin] = useState(getInitState(values, "main", "min", min));
    const [mainMax, setMainMax] = useState(getInitState(values, "main", "max", max));
    // Organic Input
    const [organicInputValue, setOrganicInputValue] = useState(getInitState(values, "organic", "value"));
    const [organicInputValueInDialog, setOrganicInputValueInDialog] = useState(
        getInitState(values, "organic", "value"),
    );
    // Top Left Input
    const [topLeftInputValue, setTopLeftInputValue] = useState(getInitState(values, "topLeft", "value"));
    const [topLeftUnit, setTopLeftUnit] = useState(getInitState(values, "topLeft", "unit"));
    const [topLeftMin, setTopLeftMin] = useState(getInitState(values, "topLeft", "min", min));
    const [topLeftMax, setTopLeftMax] = useState(getInitState(values, "topLeft", "max", max));
    // Top Right Input
    const [topRightInputValue, setTopRightInputValue] = useState(getInitState(values, "topRight", "value"));
    const [topRightUnit, setTopRightUnit] = useState(getInitState(values, "topRight", "unit"));
    const [topRightMin, setTopRightMin] = useState(getInitState(values, "topRight", "min", min));
    const [topRightMax, setTopRightMax] = useState(getInitState(values, "topRight", "max", max));
    // Bottom Right Input
    const [bottomRightInputValue, setBottomRightInputValue] = useState(getInitState(values, "bottomRight", "value"));
    const [bottomRightUnit, setBottomRightUnit] = useState(getInitState(values, "bottomRight", "unit"));
    const [bottomRightMin, setBottomRightMin] = useState(getInitState(values, "bottomRight", "min", min));
    const [bottomRightMax, setBottomRightMax] = useState(getInitState(values, "bottomRight", "max", max));
    // Bottom Left Input
    const [bottomLeftInputValue, setBottomLeftInputValue] = useState(getInitState(values, "bottomLeft", "value"));
    const [bottomLeftUnit, setBottomLeftUnit] = useState(getInitState(values, "bottomLeft", "unit"));
    const [bottomLeftMin, setBottomLeftMin] = useState(getInitState(values, "bottomLeft", "min", min));
    const [bottomLeftMax, setBottomLeftMax] = useState(getInitState(values, "bottomLeft", "max", max));

    // Callback functions
    const getMode = useCallback(() => {
        return getModeRaw({ value, allowFullRounded, fullRoundedValue, allowOrganic, allowMultiple });
    }, [value, allowFullRounded, fullRoundedValue, allowOrganic, allowMultiple]);

    const commitIfChanged = useCallback(
        (newValue) => {
            if (newValue !== value) {
                commit(newValue);
            }
        },
        [value, commit],
    );

    // Commit main input
    const commitMainValue = useCallback(() => {
        if (mode === "single") {
            commitIfChanged(convertForCommit(mainInputValue, mainUnit, convertPxToRem, allowEmpty));
        }
    }, [mode, mainInputValue, mainUnit, allowEmpty, commitIfChanged, convertForCommit, convertPxToRem]);

    // Commit organic input
    const commitOrganicValue = useCallback(() => {
        if (organicInputValue && mode === "organic") {
            commitIfChanged(organicInputValue);
        }
    }, [organicInputValue, mode, commitIfChanged]);

    // Commit multiple inputs
    const commitMultipleValues = useCallback(() => {
        if (
            mode !== "multiple" ||
            topLeftInputValue === null ||
            topRightInputValue === null ||
            bottomRightInputValue === null ||
            bottomLeftInputValue === null
        ) {
            return;
        }
        const tl = convertForCommit(topLeftInputValue, topLeftUnit, convertPxToRem);
        const tr = convertForCommit(topRightInputValue, topRightUnit, convertPxToRem);
        const br = convertForCommit(bottomRightInputValue, bottomRightUnit, convertPxToRem);
        const bl = convertForCommit(bottomLeftInputValue, bottomLeftUnit, convertPxToRem);
        commitIfChanged(`${tl} ${tr} ${br} ${bl}`);
    }, [
        mode,
        topLeftInputValue,
        topRightInputValue,
        bottomRightInputValue,
        bottomLeftInputValue,
        topLeftUnit,
        topRightUnit,
        bottomRightUnit,
        bottomLeftUnit,
        commitIfChanged,
        convertPxToRem,
        convertForCommit,
    ]);

    // Update on changes

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

    useEffect(() => {
        const isPercentage = mainUnit === "%";
        setMainMin(isPercentage ? 0 : min);
        setMainMax(isPercentage ? 100 : max);
    }, [mainUnit, min, max]);

    useEffect(() => {
        const isPercentage = topLeftUnit === "%";
        setTopLeftMin(isPercentage ? 0 : min);
        setTopLeftMax(isPercentage ? 100 : max);
    }, [topLeftUnit, min, max]);

    useEffect(() => {
        const isPercentage = topRightUnit === "%";
        setTopRightMin(isPercentage ? 0 : min);
        setTopRightMax(isPercentage ? 100 : max);
    }, [topRightUnit, min, max]);

    useEffect(() => {
        const isPercentage = bottomRightUnit === "%";
        setBottomRightMin(isPercentage ? 0 : min);
        setBottomRightMax(isPercentage ? 100 : max);
    }, [bottomRightUnit, min, max]);

    useEffect(() => {
        const isPercentage = bottomLeftUnit === "%";
        setBottomLeftMin(isPercentage ? 0 : min);
        setBottomLeftMax(isPercentage ? 100 : max);
    }, [bottomLeftUnit, min, max]);

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
    }, [mode, fullRoundedValue]);

    useEffect(commitMainValue, [mainInputValue, mainUnit, commitMainValue]);

    useEffect(commitOrganicValue, [organicInputValue, commitOrganicValue]);

    useEffect(commitMultipleValues, [
        topLeftInputValue,
        topRightInputValue,
        bottomRightInputValue,
        bottomLeftInputValue,
        topLeftUnit,
        topRightUnit,
        bottomRightUnit,
        bottomLeftUnit,
        commitMultipleValues,
    ]);

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
                        setOpen={setOrganicEditorOpen}
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
                        onClose={() => setDropdownOpen(false)}
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
                                            return;
                                        }
                                        const newValue = mainInputValue || min;
                                        setSelected("topLeft");
                                        if (topLeftInputValue === null) {
                                            setTopLeftInputValue(newValue);
                                        }
                                        if (topRightInputValue === null) {
                                            setTopRightInputValue(newValue);
                                        }
                                        if (bottomRightInputValue === null) {
                                            setBottomRightInputValue(newValue);
                                        }
                                        if (bottomLeftInputValue === null) {
                                            setBottomLeftInputValue(newValue);
                                        }
                                        setTimeout(() => setMode("multiple"), 0);
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