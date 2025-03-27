import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Draggable from "react-draggable";
import * as stylex from "@stylexjs/stylex";

const initialHandlePositions = {
    top: {
        top: -7,
        left: "50%",
        marginLeft: -7,
    },
    bottom: {
        bottom: -7,
        left: "50%",
        marginLeft: -7,
    },
    left: {
        top: "50%",
        marginTop: -7,
        left: -7,
    },
    right: {
        right: -7,
        top: "50%",
        marginTop: -7,
    },
};

const fallbackValue = ["30% 70% 70% 30%", "30% 30% 70% 70%"];
const renderTooltip = (percent) => <span {...stylex.props(styles.tooltip)}>{percent}%</span>;

export default function OrganicEditor({ onChange = () => {}, value }) {
    const [boxSize, setBoxSize] = useState({ width: 500, height: 500 });
    const [grabbing, setGrabbing] = useState(false);
    const [handleCoordinates, setHandleCoordinates] = useState({
        tx: boxSize.width / 2,
        bx: boxSize.width / 2,
        ly: boxSize.height / 2,
        ry: boxSize.height / 2,
    });
    const [boxBorderRadius, setBoxBorderRadius] = useState("inital");
    const [debouncedHandleCoordinates] = useDebounce(handleCoordinates, 10);
    const [defaultPosition, setDefaultPosition] = useState(null);
    const [top, setTop] = useState(null);
    const [bottom, setBottom] = useState(null);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);

    useEffect(() => {
        const [leftPart, rightPart] =
            typeof value === "string" && value.includes("/") ? value.split("/") : fallbackValue;
        const [top, , , bottom] = leftPart
            .trim()
            .split(" ")
            .map((item) => parseInt(item));
        const [left, right] = rightPart
            .trim()
            .split(" ")
            .map((item) => parseInt(item));
        const { width, height } = boxSize;
        const coords = {
            tx: (width / 100) * top,
            bx: (width / 100) * bottom,
            ly: (height / 100) * left,
            ry: (height / 100) * right,
        };
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const positions = {
            top: {
                x: coords.tx - halfWidth,
                y: 0,
            },
            bottom: {
                x: coords.bx - halfWidth,
                y: 0,
            },
            left: {
                x: 0,
                y: coords.ly - halfHeight,
            },
            right: {
                x: 0,
                y: coords.ry - halfHeight,
            },
        };
        setDefaultPosition(positions);
        setHandleCoordinates(coords);
    }, []);

    const dragBoundY = {
        top: -boxSize.height / 2,
        bottom: boxSize.height / 2,
    };

    const dragBoundX = {
        left: -boxSize.width / 2,
        right: boxSize.width / 2,
    };

    useEffect(() => {
        onChange(boxBorderRadius);
    }, [boxBorderRadius]);

    useEffect(() => {
        const { width, height } = boxSize;
        const { tx, bx, ly, ry } = debouncedHandleCoordinates;
        const top = Math.round((tx / width) * 100);
        const bottom = Math.round((bx / width) * 100);
        const left = Math.round((ly / height) * 100);
        const right = Math.round((ry / height) * 100);

        setTop(top);
        setBottom(bottom);
        setLeft(left);
        setRight(right);
        setBoxBorderRadius(
            `${top}% ${100 - top}% ${100 - bottom}% ${bottom}% / ${left}% ${right}% ${100 - right}% ${100 - left}%`,
        );
    }, [debouncedHandleCoordinates, boxSize]);

    if (!defaultPosition) {
        return null;
    }

    return (
        <div {...stylex.props(styles.box(boxBorderRadius, boxSize), grabbing && styles.grabbing)}>
            <Draggable
                defaultPosition={defaultPosition.left}
                onStart={() => setGrabbing("left")}
                onStop={() => setGrabbing(false)}
                onDrag={(e, ui) => {
                    setHandleCoordinates({
                        ...handleCoordinates,
                        ly: handleCoordinates.ly + ui.deltaY,
                    });
                }}
                axis="y"
                bounds={dragBoundY}
            >
                <div {...stylex.props(styles.handle(grabbing === "left"), styles.handleLeft)}>
                    {renderTooltip(left)}
                </div>
            </Draggable>
            <Draggable
                defaultPosition={defaultPosition.right}
                onStart={() => setGrabbing("right")}
                onStop={() => setGrabbing(false)}
                onDrag={(e, ui) =>
                    setHandleCoordinates({
                        ...handleCoordinates,
                        ry: handleCoordinates.ry + ui.deltaY,
                    })
                }
                axis="y"
                bounds={dragBoundY}
            >
                <div {...stylex.props(styles.handle(grabbing === "right"), styles.handleRight)}>
                    {renderTooltip(right)}
                </div>
            </Draggable>
            <Draggable
                defaultPosition={defaultPosition.top}
                onStart={() => setGrabbing("top")}
                onStop={() => setGrabbing(false)}
                onDrag={(e, ui) => {
                    setHandleCoordinates({
                        ...handleCoordinates,
                        tx: handleCoordinates.tx + ui.deltaX,
                    });
                }}
                axis="x"
                bounds={dragBoundX}
            >
                <div {...stylex.props(styles.handle(grabbing === "top"), styles.handleTop)}>{renderTooltip(top)}</div>
            </Draggable>
            <Draggable
                defaultPosition={defaultPosition.bottom}
                onStart={() => setGrabbing("bottom")}
                onStop={() => setGrabbing(false)}
                onDrag={(e, ui) =>
                    setHandleCoordinates({
                        ...handleCoordinates,
                        bx: handleCoordinates.bx + ui.deltaX,
                    })
                }
                axis="x"
                bounds={dragBoundX}
            >
                <div {...stylex.props(styles.handle(grabbing === "bottom"), styles.handleBottom)}>
                    {renderTooltip(bottom)}
                </div>
            </Draggable>
        </div>
    );
}

var styles = stylex.create({
    box: (borderRadius, size) => ({
        backgroundColor: "var(--colors-PrimaryBlue)",
        position: "relative",
        borderRadius: borderRadius,
        width: size.width,
        height: size.height,
        margin: "var(--spacing-GoldenUnit)",
    }),
    handle: (grabbing) => ({
        position: "absolute",
        border: "3px solid #fff",
        width: 14,
        height: 14,
        borderRadius: "50%",
        cursor: "grab",
        opacity: grabbing ? 1 : 0.8,
        transition: "opacity var(--transition-Default)",
        ":is(:hover,:focus)": {
            opacity: 1,
        },
        ":is(:hover,:focus)>*": {
            opacity: 1,
        },
        ":not(:hover)>*": {
            opacity: grabbing ? 1 : 0,
        },
        ":active": {
            cursor: "grabbing",
        },
    }),
    handleTop: {
        top: -7,
        left: "50%",
        marginLeft: -7,
    },
    handleBottom: {
        bottom: -7,
        left: "50%",
        marginLeft: -7,
    },
    handleLeft: {
        top: "50%",
        marginTop: -7,
        left: -7,
    },
    handleRight: {
        right: -7,
        top: "50%",
        marginTop: -7,
    },
    tooltip: {
        position: "absolute",
        display: "block",
        padding: "var(--spacing-Quarter) var(--spacing-Half)",
        backgroundColor: "var(--colors-ContrastDarker)",
        color: "var(--colors-ContrastBrightest)",
        borderRadius: 2,
        zIndex: 1,
        pointerEvents: "none",
        transform: "translate(-50%, calc(-100% - 6px))",
        transition: "opacity var(--transition-Default)",
    },
    grabbing: {
        cursor: "grabbing",
    },
});
