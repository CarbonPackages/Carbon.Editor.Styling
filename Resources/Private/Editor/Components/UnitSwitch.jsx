import React, { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { neos } from "@neos-project/neos-ui-decorators";

const styles = stylex.create({
    button: {
        margin: 0,
        padding: "0 14px 0 0",
        height: "var(--spacing-GoldenUnit)",
        background: "transparent",
        color: "inherit",
        border: 0,
        fontSize: "inherit",
        cursor: "pointer",
        ":where(:hover,:focus)": {
            color: "var(--colors-PrimaryBlue) !important",
            outline: 0,
        },
        ":focus-visible": {
            color: "inherit !important",
            outline: 0,
            boxShadow:
                "-14px 0px 0 0px var(--colors-ContrastNeutral), -14px 0px 0 1px var(--colors-PrimaryBlue), 0 0px 0px 1px var(--colors-PrimaryBlue)",
        },
    },
});

function UnitSwitch({ units = ["px", "%"], unit = "px", onActive, onClick = () => {}, i18nRegistry }) {
    const currentIndex = units.indexOf(unit);
    const nextIndex = (currentIndex + 1) % units.length;
    const nextUnit = units[nextIndex];
    const title = i18nRegistry.translate("changeToUnit", nextUnit, [nextUnit], "Carbon.Editor.Styling", "Main");

    return (
        <button
            type="button"
            title={title}
            onMouseDown={onActive ? () => onActive(true) : null}
            onBlur={onActive ? () => onActive(false) : null}
            onClick={() => onClick(nextUnit)}
            {...stylex.props(styles.button)}
        >
            {unit}
        </button>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

export default neosifier(UnitSwitch);
