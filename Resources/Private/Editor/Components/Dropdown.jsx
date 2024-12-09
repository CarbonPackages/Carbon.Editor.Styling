import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DropDown } from "@neos-project/react-ui-components";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
    wrapper: {
        display: "contents",
    },
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
        ":where(*)>*": {
            pointerEvents: "none",
        },
    },
    dropdown: {
        width: "var(--dropdown-header-width) !important",
        alignSelf: "start",
    },
    header: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    headerNoPadding: {
        padding: "0 !important",
    },
    padding: {
        padding: "var(--spacing-Full) !important",
    },
    content: {
        width: "var(--dropdown-content-width) !important",
        maxWidth: "var(--dropdown-content-width) !important",
        transform: "translateX(-100%) translateX(var(--dropdown-header-width))",
    },
});

const setProperty = (name, value) => document.body.style.setProperty(name, value);

export default function Dropdown({
    open,
    setOpen,
    children,
    title,
    width,
    readonly,
    padding,
    header,
    headerWidth,
    headerPadding = true,
    automaticClose = true,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const headerCustomProperty = useMemo(() => {
        return headerPadding
            ? `calc(${headerWidth}px + var(--spacing-GoldenUnit) + var(--spacing-Full))`
            : `${headerWidth}px`;
    }, [headerWidth, headerPadding]);

    const contentCustomProperty = useMemo(() => {
        return padding ? `calc(${width}px + var(--spacing-Full) * 2)` : `${width}px`;
    }, [width, padding]);

    const setCustomProperties = useCallback(() => {
        setProperty("--dropdown-header-width", headerCustomProperty);
        setProperty("--dropdown-content-width", contentCustomProperty);
    }, [headerCustomProperty, contentCustomProperty, setProperty]);

    useEffect(() => {
        if (isOpen) {
            setCustomProperties();
        }
        if (typeof setOpen === "function") {
            setOpen(isOpen);
        }
    }, [setCustomProperties, isOpen]);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <div
            className={stylex.props(styles.wrapper).className}
            style={{
                "--dropdown-content-width": contentCustomProperty,
                "--dropdown-header-width": headerCustomProperty,
            }}
        >
            <DropDown.Stateless
                title={isOpen ? null : title}
                className={stylex.props(styles.dropdown, readonly && styles.disabled).className}
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
                onClose={(event) => {
                    if (automaticClose || !event) {
                        // If no event is set, the click is outside
                        setIsOpen(false);
                    }
                }}
            >
                <DropDown.Header
                    className={stylex.props(styles.header, headerPadding || styles.headerNoPadding).className}
                >
                    {header}
                </DropDown.Header>
                <DropDown.Contents
                    className={stylex.props(styles.content, padding && styles.padding).className}
                    scrollable={true}
                >
                    {children}
                </DropDown.Contents>
            </DropDown.Stateless>
        </div>
    );
}
