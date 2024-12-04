import React from "react";
import { neos } from "@neos-project/neos-ui-decorators";

function Editor({ labels }) {}

const neosifier = neos((globalRegistry) => {
    const i18nRegistry = globalRegistry.get("i18n");
    const labels = {};
    ["copy", "desktop", "mobile", "plaintext"].forEach((key) => {
        labels[key] = i18nRegistry.translate(`Carbon.Editor.Styling:Main:${key}`);
    });
    return { labels };
});
export default neosifier(Editor);
