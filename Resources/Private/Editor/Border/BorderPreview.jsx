import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    preview: (borderTopColor, borderTopWidth, borderTopStyle) => ({
        borderTopColor,
        borderTopWidth,
        borderTopStyle,
        width: 30,
    }),
});

export default function BorderPreview({ color = "currentColor", width = 4, style = "solid" }) {
    return <div aria-hidden="true" {...stylex.props(styles.preview(color, width, style))}></div>;
}
