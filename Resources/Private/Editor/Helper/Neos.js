import { neos } from "@neos-project/neos-ui-decorators";
// import { connect } from "react-redux";
// import { selectors } from "@neos-project/neos-ui-redux-store";

// export const getDataLoaderOptionsForProps = ({ focusedNodePath, options }) => ({
//     contextNodePath: focusedNodePath,
//     dataSourceIdentifier: options.dataSourceIdentifier,
//     dataSourceUri: options.dataSourceUri,
//     dataSourceAdditionalData: options.dataSourceAdditionalData,
//     dataSourceDisableCaching: Boolean(options.dataSourceDisableCaching),
// });

export function injectNeosProps(component, configKey) {
    const neosifier = neos((globalRegistry) => ({
        i18nRegistry: globalRegistry.get("i18n"),
        config: globalRegistry.get("frontendConfiguration").get(`Carbon.Editor.Styling.${configKey}`),
        // dataSourcesDataLoader: globalRegistry.get("dataLoaders").get("DataSources"),
    }));
    return neosifier(component);
    // const connector = connect((state) => ({
    //     focusedNodePath: selectors.CR.Nodes.focusedNodePathSelector(state),
    // }));
    // return neosifier(connector(component));
}
