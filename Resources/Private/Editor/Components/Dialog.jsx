import React, { useRef, useEffect } from "react";
import { Button, IconButton } from "@neos-project/react-ui-components";
import { neos } from "@neos-project/neos-ui-decorators";
import * as stylex from "@stylexjs/stylex";

const backdropFadeIn = stylex.keyframes({
    from: {
        background: "rgb(0 0 0 / 0%)",
        backdropFilter: "blur(0px)",
    },
    to: {
        background: "rgb(0 0 0 / 80%)",
        backdropFilter: "blur(1px)",
    },
});

const slideDialogContents = stylex.keyframes({
    from: {
        opacity: 0,
        transform: "scale(.9)",
    },
});

const styles = stylex.create({
    dialog: {
        position: "fixed",
        inset: 0,
        background: "var(--colors-ContrastDarker)",
        border: "2px solid var(--colors-ContrastDark)",
        padding: 0,
        color: "var(--colors-ContrastBrightest)",
        boxShadow: "0 20px 40px #0006",
        animation: `${slideDialogContents} var(--transition-Default) ease-in-out`,
        ":where([open])": {
            "::backdrop": {
                // Not all browsers support CSS custom properties for ::backdrop
                animation: `${backdropFadeIn} 0.3s ease-out forwards`,
            },
        },
    },
    title: (hasClose) => ({
        padding: "var(--spacing-Full)",
        paddingRight: hasClose ? "calc(var(--spacing-Full) + var(--spacing-GoldenUnit)" : null,
        margin: 0,
        fontSize: 20,
        lineHeight: 1.2,
        borderBottom: "1px solid var(--colors-ContrastDark)",
    }),
    footer: {
        display: "flex",
        justifyContent: "end",
        flexDirection: "row-reverse",
    },
    closeButton: {
        position: "absolute !important",
        top: 0,
        right: 0,
    },
});

const variableIsFunction = (variable) => variable && typeof variable === "function";

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
    applyLabel = "Neos.Neos:Main:applyChanges",
    cancelLabel = "Neos.Neos:Main:cancel",
    closeLabel = "Neos.Neos:Main:close",
}) {
    const dialog = useRef();

    useEffect(() => {
        dialog.current?.addEventListener("close", () => setOpen(false));
    }, [dialog]);

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

    return (
        <dialog ref={dialog} {...stylex.props(styles.dialog, style)}>
            {title && <h2 {...stylex.props(styles.title(hasClose))}>{title}</h2>}
            {children}
            {(hasApply || hasCancel) && (
                <div {...stylex.props(styles.footer)}>
                    {hasApply && (
                        <Button style="success" hoverStyle="success" onClick={onApply}>
                            {i18nRegistry.translate(applyLabel)}
                        </Button>
                    )}
                    {hasCancel && (
                        <Button onClick={onCancel} hoverStyle="warn">
                            {i18nRegistry.translate(cancelLabel)}
                        </Button>
                    )}
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
