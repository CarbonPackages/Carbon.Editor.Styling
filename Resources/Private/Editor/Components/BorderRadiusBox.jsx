import React from "react";

export default function BorderRadiusBox({ selected = null, organic = false, style = {}, className }) {
    const size = 12;

    if (organic) {
        return (
            <svg
                style={style}
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 10 10"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    d="M3 .75c.77459204 0 3.17405897.18543111 4.85534979.90104403.4551161.19371245.85720294.42242467 1.12680357.71643066C9.14201923 2.54181228 9.25 2.7409741 9.25 2.97943128c0 .92400893-1.08920903 2.87728657-2.57136342 4.36379611C5.63032329 8.39462103 4.35060267 9.25 3 9.25c-.2129752 0-.39077651-.11403477-.55225147-.2685897-.29323317-.28066663-.53099861-.697952-.73657258-1.1719939C1.03370869 6.24721534.75 4.07399609.75 3.08217029c0-.61510406.29042874-1.1569223.68649464-1.56383648C1.88315236 1.05944209 2.47513268.75 3 .75Z"
                />
            </svg>
        );
    }

    const opacity = !selected || selected == "all" ? 1 : 0.2;
    const topLeft = selected == "topLeft" ? 1 : opacity;
    const topRight = selected == "topRight" ? 1 : opacity;
    const bottomRight = selected == "bottomRight" ? 1 : opacity;
    const bottomLeft = selected == "bottomLeft" ? 1 : opacity;

    return (
        <svg
            style={style}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 10 10"
        >
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
