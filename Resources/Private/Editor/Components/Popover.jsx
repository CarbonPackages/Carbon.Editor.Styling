import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as stylex from "@stylexjs/stylex";
import { nanoid } from "nanoid";

const styles = stylex.create({
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
    },
    button: (anchorName) => ({
        anchorName,
    }),
    popoverLeft: {
        left: "anchor(left)",
        //  positionTryFallbacks: "--left-top, --right-bottom, --right-top",
    },
    popoverRight: {
        right: "anchor(right)",
        // positionTryFallbacks: "--right-top, --left-bottom, --left-top",
    },
    popover: (anchorName) => ({
        positionAnchor: anchorName,
        padding: 0,
        backgroundColor: "var(--colors-ContrastDark)",
        border: 0,
        position: "absolute",
        margin: 0,
        inset: "auto",
        top: "anchor(bottom)",
        transition:
            "opacity var(--transition-Default), display var(--transition-Default), overlay var(--transition-Default)",
        transitionBehavior: "allow-discrete",
        display: {
            default: "none",
            ":popover-open": "grid",
            "@starting-style": "grid",
        },
        opacity: {
            default: 0,
            ":popover-open": 1,
            "@starting-style": 0,
        },
    }),
});

/*
@position-try --left-bottom {
    inset: auto;
    top: anchor(bottom);
    left: anchor(left);
}

@position-try --right-bottom {
    inset: auto;
    top: anchor(bottom);
    right: anchor(right);
}

@position-try --left-top {
    inset: auto;
    bottom: anchor(top);
    left: anchor(left);
}

@position-try --right-top {
    inset: auto;
    bottom: anchor(top);
    right: anchor(right);
}
*/

export default function Popover({
    buttonContent,
    buttonStyles,
    contentStyles,
    children,
    open,
    title,
    readonly,
    disabled,
    automaticClose = true,
    right = false,
}) {
    const popover = useRef();
    const id = useMemo(() => nanoid(), []);
    const [isOpen, setIsOpen] = useState(false);
    const anchorName = `--popover-${id}`;
    const elementID = `popover-${id}`;

    useEffect(() => {
        if (!popover.current || typeof open !== "boolean") {
            return;
        }

        if (open) {
            popover.current.showPopover();
            return;
        }

        popover.current.hidePopover();
    }, [open]);

    useEffect(() => {
        function update({ newState }) {
            setIsOpen(newState === "open");
        }

        if (popover && popover.current) {
            popover.current.addEventListener("toggle", update, false);
            return function cleanup() {
                popover.current.removeEventListener("toggle", update, false);
            };
        }
    }, []);

    return (
        <>
            <button
                type="button"
                disabled={readonly || disabled}
                title={isOpen ? null : title}
                {...stylex.props(styles.button(anchorName), buttonStyles, (readonly || disabled) && styles.disabled)}
                popovertarget={elementID}
            >
                {buttonContent}
            </button>
            <dialog
                ref={popover}
                id={elementID}
                popover="auto"
                onClick={() => {
                    if (automaticClose) {
                        popover.current.hidePopover();
                    }
                }}
                {...stylex.props(
                    styles.popover(anchorName),
                    right ? styles.popoverRight : styles.popoverLeft,
                    contentStyles,
                )}
            >
                {children}
            </dialog>
        </>
    );
}
