import manifest from "@neos-project/neos-ui-extensibility";
import React, { Suspense, lazy } from "react";
import LoadingAnimation from "carbon-neos-loadinganimation/LoadingWithStyleX";

const editors = {
    Border: () => import("./Border"),
    BorderRadius: () => import("./BorderRadius"),
    Spacing: () => import("./Spacing"),
    TextAreaWithCounter: () => import("./TextAreaWithCounter"),
    // Font: () => import("./Font"),
};

function generateLazyEditor(name) {
    const LazyEditor = lazy(editors[name]);
    return (props) => (
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
            <LazyEditor {...props} />
        </Suspense>
    );
}

const keys = Object.keys(editors);
const loaded = keys.map((key) => generateLazyEditor(key));

manifest("Carbon.Editor.Styling:Editors", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    keys.forEach((key, index) => {
        editorsRegistry.set(`Carbon.Editor.Styling/${key}`, {
            component: loaded[index],
        });
    });
});
