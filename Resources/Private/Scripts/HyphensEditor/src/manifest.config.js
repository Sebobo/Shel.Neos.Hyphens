import HyphensFactory from "./plugins/hyphens";

const addPlugin = (Plugin) => (ckEditorConfiguration, options) => {
    if (options.editorOptions.nbsp || options.editorOptions.hyphens) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        ckEditorConfiguration.plugins.push(Plugin);
    }
    return ckEditorConfiguration;
};

export default (ckEditorRegistry, editorConfig) => {
    const config = ckEditorRegistry.get("config");

    const HyphensPlugin = HyphensFactory(editorConfig);
    config.set("hyphens", addPlugin(HyphensPlugin));

    return config;
};
