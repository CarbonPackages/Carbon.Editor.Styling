import manifest from "@neos-project/neos-ui-extensibility";
import React, { Suspense, lazy } from "react";
import LoadingAnimation from "carbon-neos-loadinganimation/LoadingWithStyleX";

const loadingMap = {
    BorderRadius: () => import("./BorderRadius.jsx"),
    TextAreaWithCounter: () => import("./TextAreaWithCounter.jsx"),
};

function generateLazyEditor(name) {
    const LazyEditor = lazy(loadingMap[name]);
    return (props) => (
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
            <LazyEditor {...props} />
        </Suspense>
    );
}

const BorderRadius = generateLazyEditor("BorderRadius");
const TextAreaWithCounter = generateLazyEditor("TextAreaWithCounter");

manifest("Carbon.Editor.Styling:Editors", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    editorsRegistry.set("Carbon.Editor.Styling/TextAreaWithCounter", {
        component: TextAreaWithCounter,
    });

    editorsRegistry.set("Carbon.Editor.Styling/BorderRadius", {
        component: BorderRadius,
    });

    // editorsRegistry.set("Carbon.Editor.Styling/Spacing", {
    //     component: LazySpacing,
    // });

    // editorsRegistry.set("Carbon.Editor.Styling/BorderEditor", {
    //     component: BorderEditor,
    // });

    // editorsRegistry.set("Carbon.Editor.Styling/MarginEditor", {
    //     component: MarginEditor,
    // });

    // editorsRegistry.set("Carbon.Editor.Styling/FontEditor", {
    //     component: FontEditor,
    // });
});
