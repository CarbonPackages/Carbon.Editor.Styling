import React from "react";

export default function SvgPath({ d, ...rest }) {
    return <path d={d} fill="currentcolor" {...rest}></path>;
}
