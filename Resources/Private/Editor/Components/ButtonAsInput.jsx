import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    look: {
        margin: 0,
        height: "var(--spacing-GoldenUnit)",
        background: "var(--colors-ContrastNeutral)",
        color: "var(--colors-ContrastBrightest)",
        border: 0,
        fontSize: "var(--fontSize-Base)",
        borderRadius: 2,
        padding: "0 0 0 var(--fontSize-Base)",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        width: "100%",
        textAlign: "left",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    button: {
        cursor: "text",
    },
    text: {
        cursor: "default",
    },
    ellipsis: {
        minWidth: 0,
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
});

export default function ButtonAsInput({ onClick, disabled, highlight, children }) {
    const hasOnClick = onClick && typeof onClick === "function";

    return (
        <>
            {hasOnClick ? (
                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    {...stylex.props(styles.look, styles.button)}
                >
                    <span {...stylex.props(styles.ellipsis)}>{children}</span>
                </button>
            ) : (
                <div {...stylex.props(styles.look, styles.text)}>
                    <span {...stylex.props(styles.ellipsis)}>{children}</span>
                </div>
            )}
        </>
    );
}
