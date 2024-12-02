import React from "react";

export default function RoundedBox({
    mode = "borderRadius",
    size = 0,
    color = "currentColor",
    segmented = false,
    selected = null,
    synced = false,
}) {
    if (!segmented) {
        size = size || 12;
        return (
            <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
                <path
                    opacity={selected ? 0.2 : 1}
                    fill={color}
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.5 1.5a1 1 0 00-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1h-5zm0-1.5A2.5 2.5 0 000 2.5v5C0 8.9 1.1 10 2.5 10h5C8.9 10 10 8.9 10 7.5v-5C10 1.1 8.9 0 7.5 0h-5z"
                ></path>
            </svg>
        );
    }

    const opacity = selected == "all" ? 1 : 0.2;

    if (mode == "borderRadius") {
        size = size || 12;

        const topLeft = selected == "topLeft" ? 1 : opacity;
        const topRight = selected == "topRight" ? 1 : opacity;
        const bottomRight = selected == "bottomRight" ? 1 : opacity;
        const bottomLeft = selected == "bottomLeft" ? 1 : opacity;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 10 10">
                <path
                    d="M 2.5 0 C 1.119 0 0 1.119 0 2.5 L 0 4 L 1.5 4 L 1.5 2.5 C 1.5 1.948 1.948 1.5 2.5 1.5 L 4 1.5 L 4 0 Z"
                    fill="currentcolor"
                    opacity={topLeft}
                ></path>
                <path
                    d="M 10 2.5 C 10 1.119 8.881 0 7.5 0 L 6 0 L 6 1.5 L 7.5 1.5 C 8.052 1.5 8.5 1.948 8.5 2.5 L 8.5 4 L 10 4 Z"
                    fill="currentcolor"
                    opacity={topRight}
                ></path>
                <path
                    d="M 7.5 10 C 8.881 10 10 8.881 10 7.5 L 10 6 L 8.5 6 L 8.5 7.5 C 8.5 8.052 8.052 8.5 7.5 8.5 L 6 8.5 L 6 10 Z"
                    fill="currentcolor"
                    opacity={bottomRight}
                ></path>
                <path
                    d="M 0 7.5 C 0 8.881 1.119 10 2.5 10 L 4 10 L 4 8.5 L 2.5 8.5 C 1.948 8.5 1.5 8.052 1.5 7.5 L 1.5 6 L 0 6 Z"
                    fill="currentcolor"
                    opacity={bottomLeft}
                ></path>
            </svg>
        );
    }

    size = size || 14;

    let isTop = selected == "top";
    let isRight = selected == "right";
    let isBottom = selected == "bottom";
    let isLeft = selected == "left";
    if (synced == "y" || synced == "xy") {
        isBottom = isTop ? true : isBottom;
        isTop = isBottom ? true : isTop;
    }
    if (synced == "x" || synced == "xy") {
        isRight = isLeft ? true : isRight;
        isLeft = isRight ? true : isLeft;
    }

    const top = isTop ? 1 : opacity;
    const right = isRight ? 1 : opacity;
    const bottom = isBottom ? 1 : opacity;
    const left = isLeft ? 1 : opacity;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12">
            <path
                d="M 3 0.75 C 3 0.336 3.336 0 3.75 0 L 8.25 0 C 8.664 0 9 0.336 9 0.75 L 9 0.75 C 9 1.164 8.664 1.5 8.25 1.5 L 3.75 1.5 C 3.336 1.5 3 1.164 3 0.75 Z"
                fill={color}
                opacity={top}
            ></path>
            <path
                d="M 10.5 3.75 C 10.5 3.336 10.836 3 11.25 3 L 11.25 3 C 11.664 3 12 3.336 12 3.75 L 12 8.25 C 12 8.664 11.664 9 11.25 9 L 11.25 9 C 10.836 9 10.5 8.664 10.5 8.25 Z"
                fill={color}
                opacity={right}
            ></path>
            <path
                d="M 3 11.25 C 3 10.836 3.336 10.5 3.75 10.5 L 8.25 10.5 C 8.664 10.5 9 10.836 9 11.25 L 9 11.25 C 9 11.664 8.664 12 8.25 12 L 3.75 12 C 3.336 12 3 11.664 3 11.25 Z"
                fill={color}
                opacity={bottom}
            ></path>
            <path
                d="M 0 3.75 C 0 3.336 0.336 3 0.75 3 L 0.75 3 C 1.164 3 1.5 3.336 1.5 3.75 L 1.5 8.25 C 1.5 8.664 1.164 9 0.75 9 L 0.75 9 C 0.336 9 0 8.664 0 8.25 Z"
                fill={color}
                opacity={left}
            ></path>
        </svg>
    );
}
