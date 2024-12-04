import React from "react";

export default function SpacingBox({ selected = null, synced = false, useSyncValue = false, style }) {
    const size = 14;
    const opacity = !useSyncValue && (!selected || selected == "all") ? 1 : 0.2;

    let isTop = selected == "top";
    let isRight = selected == "right";
    let isBottom = selected == "bottom";
    let isLeft = selected == "left";

    if (useSyncValue) {
        if (synced == "y" || synced == "xy") {
            isTop = true;
            isBottom = true;
        }
        if (synced == "x" || synced == "xy") {
            isLeft = true;
            isRight = true;
        }
    } else {
        if (synced == "y" || synced == "xy") {
            isBottom = isTop ? true : isBottom;
            isTop = isBottom ? true : isTop;
        }
        if (synced == "x" || synced == "xy") {
            isRight = isLeft ? true : isRight;
            isLeft = isRight ? true : isLeft;
        }
    }

    const top = isTop ? 1 : opacity;
    const right = isRight ? 1 : opacity;
    const bottom = isBottom ? 1 : opacity;
    const left = isLeft ? 1 : opacity;

    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12">
            <path
                d="M 3 0.75 C 3 0.336 3.336 0 3.75 0 L 8.25 0 C 8.664 0 9 0.336 9 0.75 L 9 0.75 C 9 1.164 8.664 1.5 8.25 1.5 L 3.75 1.5 C 3.336 1.5 3 1.164 3 0.75 Z"
                fill="currentColor"
                opacity={top}
            ></path>
            <path
                d="M 10.5 3.75 C 10.5 3.336 10.836 3 11.25 3 L 11.25 3 C 11.664 3 12 3.336 12 3.75 L 12 8.25 C 12 8.664 11.664 9 11.25 9 L 11.25 9 C 10.836 9 10.5 8.664 10.5 8.25 Z"
                fill="currentColor"
                opacity={right}
            ></path>
            <path
                d="M 3 11.25 C 3 10.836 3.336 10.5 3.75 10.5 L 8.25 10.5 C 8.664 10.5 9 10.836 9 11.25 L 9 11.25 C 9 11.664 8.664 12 8.25 12 L 3.75 12 C 3.336 12 3 11.664 3 11.25 Z"
                fill="currentColor"
                opacity={bottom}
            ></path>
            <path
                d="M 0 3.75 C 0 3.336 0.336 3 0.75 3 L 0.75 3 C 1.164 3 1.5 3.336 1.5 3.75 L 1.5 8.25 C 1.5 8.664 1.164 9 0.75 9 L 0.75 9 C 0.336 9 0 8.664 0 8.25 Z"
                fill="currentColor"
                opacity={left}
            ></path>
        </svg>
    );
}
