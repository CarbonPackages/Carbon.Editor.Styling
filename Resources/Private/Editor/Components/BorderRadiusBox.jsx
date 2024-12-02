import React from "react";

export default function BorderRadiusBox({ selected = null }) {
    const size = 12;
    const opacity = selected == "all" ? 1 : 0.2;
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
