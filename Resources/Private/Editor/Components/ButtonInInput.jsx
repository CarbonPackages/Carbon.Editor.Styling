import React, { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    button: {
        margin: 0,
        padding: "0 14px 0 0",
        height: "var(--spacing-GoldenUnit)",
        backgroundColor: "transparent",
        color: "inherit",
        borderWidth: 0,
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
        ":is(*) .neos-svg-inline--fa": {
            color: "currentColor",
        },
    },
});

export default function ButtonInInput({ children, title, onActive, onClick = () => {} }) {
    return (
        <button
            type="button"
            title={title}
            onMouseDown={onActive ? () => onActive(true) : null}
            onBlur={onActive ? () => onActive(false) : null}
            onClick={onClick}
            {...stylex.props(styles.button)}
        >
            {children}
        </button>
    );
}
