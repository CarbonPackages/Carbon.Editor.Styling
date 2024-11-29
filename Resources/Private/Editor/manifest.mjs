import manifest from "@neos-project/neos-ui-extensibility";

import { TextAreaWithCounter } from "./index.mjs";

manifest("Carbon.Editor.Styling:Editors", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    editorsRegistry.set("Carbon.Editor.Styling/TextAreaWithCounter", {
        component: TextAreaWithCounter,
    });
});
