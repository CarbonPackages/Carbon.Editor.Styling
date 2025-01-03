import React from "react";
import SvgPath from "./SvgPath";

export default function RoundedBox({ style = {}, className }) {
    const size = 12;
    return (
        <svg style={style} className={className} width={size} height={size} viewBox="0 0 10 10" fill="none">
            <SvgPath
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 1.5a1 1 0 00-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1h-5zm0-1.5A2.5 2.5 0 000 2.5v5C0 8.9 1.1 10 2.5 10h5C8.9 10 10 8.9 10 7.5v-5C10 1.1 8.9 0 7.5 0h-5z"
            />
        </svg>
    );
}
