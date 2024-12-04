import React from "react";

export default function Circle({ style = {}, className }) {
    const size = 12;
    return (
        <svg style={style} className={className} width={size} height={size} viewBox="0 0 10 10">
            <circle stroke="currentColor" stroke-width="1.5" cx="5" cy="5" r="4.25" fill="none" />
        </svg>
    );
}
