import React, { useRef, useEffect, useCallback } from "react";
import { Button, IconButton } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import * as stylex from "@stylexjs/stylex";

const backdropFadeIn = stylex.keyframes({
    from: {
        backgroundColor: "rgb(0 0 0 / 0%)",
        backdropFilter: "blur(0px)",
    },
    to: {
        backgroundColor: "rgb(0 0 0 / 80%)",
        backdropFilter: "blur(1px)",
    },
});

const slideDialogContents = stylex.keyframes({
    from: {
        opacity: 0,
        transform: "scale(.9)",
    },
});

const variableIsFunction = (variable) => variable && typeof variable === "function";

const styles = stylex.create({
    dialog: {
        "--dialog-max-width": `calc(100vw - var(--spacing-GoldenUnit))`,
        "--dialog-total-max-height": "calc(100vh - var(--spacing-GoldenUnit))",
        "--dialog-max-height": "calc(100vh - var(--spacing-GoldenUnit))",
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--colors-ContrastDarker)",
        borderWidth: 0,
        padding: 0,
        color: "var(--colors-ContrastBrightest)",
        boxShadow: "0 0 0 2px var(--colors-ContrastDark), 0 20px 40px #0006",
        animationName: slideDialogContents,
        animationDuration: "var(--transition-Default)",
        animationTimingFunction: "ease-in-out",
        maxWidth: "var(--dialog-max-width)",
        maxHeight: "var(--dialog-total-max-height)",
        ":where([open])": {
            "::backdrop": {
                // Not all browsers support CSS custom properties for ::backdrop
                animationName: backdropFadeIn,
                animationDuration: "0.3s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
            },
        },
    },
    dialogWithFooter: {
        "--dialog-max-height": "calc(100vh - var(--spacing-GoldenUnit) * 2)",
    },
    fullWidth: {
        minWidth: "var(--dialog-max-width)",
    },
    fullHeight: {
        minHeight: "var(--dialog-total-max-height)",
    },
    title: (hasClose) => ({
        padding: "var(--spacing-Full)",
        paddingRight: hasClose ? "calc(var(--spacing-Full) + var(--spacing-GoldenUnit)" : null,
        margin: 0,
        fontSize: 20,
        lineHeight: 1.2,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "var(--colors-ContrastDark)",
    }),
    footer: {
        display: "flex",
        justifyContent: "end",
        flexDirection: "row-reverse",
    },
    blurFooterBackground: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: "blur(6px)",
    },
    closeButton: {
        position: "absolute !important",
        top: 0,
        right: 0,
        zIndex: 1000,
    },
});

export function DialogFooter({ children }) {
    return <>{children}</>;
}

function Dialog({
    open,
    setOpen,
    children,
    i18nRegistry,
    onApply,
    onCancel,
    showCloseButton,
    onCloseButton,
    style,
    title,
    fullWidth = false,
    fullHeight = false,
    disabledApply = false,
    applyLabel = "Neos.Neos:Main:applyChanges",
    cancelLabel = "Neos.Neos:Main:cancel",
    closeLabel = "Neos.Neos:Main:close",
    footer,
    blurFooterBackground = false,
}) {
    const Footer = React.Children.toArray(children).find((child) => child.type === DialogFooter);
    const Children = React.Children.toArray(children).find((child) => child.type !== DialogFooter);

    const dialog = useRef();
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    useEffect(() => {
        dialog.current?.addEventListener("close", handleClose);
        return () => {
            dialog.current?.removeEventListener("close", handleClose);
        };
    }, [dialog, handleClose]);

    useEffect(() => {
        if (!dialog.current) {
            return;
        }
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    const hasApply = variableIsFunction(onApply);
    const hasCancel = variableIsFunction(onCancel);
    const hasClose = variableIsFunction(onCloseButton);
    const hasFooter = footer || hasApply || hasCancel || Footer?.length;

    return (
        <dialog
            ref={dialog}
            {...stylex.props(
                styles.dialog,
                hasFooter && !blurFooterBackground && styles.dialogWithFooter,
                fullWidth && styles.fullWidth,
                fullHeight && styles.fullHeight,
                style,
            )}
        >
            {title && <h2 {...stylex.props(styles.title(hasClose))}>{title}</h2>}
            {Children}
            {Boolean(hasFooter) && (
                <div {...stylex.props(styles.footer, blurFooterBackground && styles.blurFooterBackground)}>
                    {hasApply && (
                        <Button style="success" hoverStyle="success" onClick={onApply} disabled={disabledApply}>
                            {i18nRegistry.translate(applyLabel)}
                        </Button>
                    )}
                    {hasCancel && (
                        <Button onClick={onCancel} hoverStyle="warn">
                            {i18nRegistry.translate(cancelLabel)}
                        </Button>
                    )}
                    {footer}
                    {Footer}
                </div>
            )}
            {showCloseButton && (
                <IconButton
                    icon="times"
                    style="clean"
                    title={i18nRegistry.translate(closeLabel)}
                    onClick={() => {
                        setOpen(false);
                        if (hasClose) {
                            onCloseButton();
                        }
                    }}
                    iconProps={{ size: "lg" }}
                    className={stylex.props(styles.closeButton).className}
                />
            )}
        </dialog>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

export default neosifier(Dialog);
