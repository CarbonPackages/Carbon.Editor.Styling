import React, { Suspense, lazy } from "react";
import LoadingAnimation from "carbon-neos-loadinganimation/LoadingWithStyleX";

const LazyEditor = lazy(() => import("./TextAreaWithCounter.jsx"));

export default function Editor(props) {
    return (
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
            <LazyEditor {...props} />
        </Suspense>
    );
}
