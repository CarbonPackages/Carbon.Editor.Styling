import React, { useState } from "react";
import TextInputComponent from "../Components/TextInput";
import { injectNeosProps } from "../Helper/Neos";

const defaultOptions = {
    allowEmpty: true,
    allowFloat: false,
    debounce: 500,
    disabled: false,
    max: null,
    min: null,
    placeholder: "",
    setFocus: false,
    title: null,
    type: "text",
    unit: null,
    // If type = password, allowMakePasswordVisible we can switch the input type
    allowMakePasswordVisible: true,
};

function TextInput({ id, value, commit, className, options, onEnterKey, config }) {
    const [focus, setFocus] = useState(false);
    const settings = {
        ...defaultOptions,
        ...config,
        ...options,
    };

    return (
        <TextInputComponent
            id={id}
            className={className}
            onEnterKey={onEnterKey}
            onChangeDebounced={commit}
            value={value}
            {...settings}
        />
    );
}

export default injectNeosProps(TextInput, "TextInput");
