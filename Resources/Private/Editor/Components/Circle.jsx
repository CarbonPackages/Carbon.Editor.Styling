import React from "react";

export default function Circle({ active = true }) {
    const size = 12;
    return (
        <svg width={size} height={size} viewBox="0 0 10 10">
            <circle
                opacity={active ? 1 : 0.2}
                stroke="currentColor"
                stroke-width="1.5"
                cx="5"
                cy="5"
                r="4.25"
                fill="none"
            />
        </svg>
    );
}
