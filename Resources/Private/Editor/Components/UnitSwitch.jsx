import React, { useEffect } from "react";
import { neos } from "@neos-project/neos-ui-decorators";
import ButtonInInput from "./ButtonInInput";

function UnitSwitch({ units = ["px", "%"], unit = "px", onActive, onClick = () => {}, i18nRegistry }) {
    const currentIndex = units.indexOf(unit);
    const nextIndex = (currentIndex + 1) % units.length;
    const nextUnit = units[nextIndex];
    const title = i18nRegistry.translate("changeToUnit", nextUnit, [nextUnit], "Carbon.Editor.Styling", "Main");

    return (
        <ButtonInInput title={title} onActive={onActive} onClick={() => onClick(nextUnit)}>
            {unit}
        </ButtonInInput>
    );
}

const neosifier = neos((globalRegistry) => ({
    i18nRegistry: globalRegistry.get("i18n"),
}));

export default neosifier(UnitSwitch);
