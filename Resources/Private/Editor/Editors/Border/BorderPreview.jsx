import React from "react";
import * as stylex from "@stylexjs/stylex";

export default function BorderPreview({ style = "solid" }) {
    return <span aria-hidden="true" {...stylex.props(styles.preview(style))}></span>;
}

var styles = stylex.create({
    preview: (borderTopStyle) => ({
        borderTopColor: "currentColor",
        borderTopWidth: 4,
        borderTopStyle,
        width: 30,
    }),
});
