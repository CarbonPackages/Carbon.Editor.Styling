import manifest from "@neos-project/neos-ui-extensibility";

import { LazyTextAreaWithCounter, LazyBorderRadius } from "./index.js";

manifest("Carbon.Editor.Styling:Editors", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    editorsRegistry.set("Carbon.Editor.Styling/TextAreaWithCounter", {
        component: LazyTextAreaWithCounter,
    });

    editorsRegistry.set("Carbon.Editor.Styling/BorderRadius", {
        component: LazyBorderRadius,
    });
});
