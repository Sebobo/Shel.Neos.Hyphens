import HyphensFactory from './plugins/hyphens';

/* global CKEDITOR_VERSION */

// CKEditor toolbar support is available in Neos with CKEditor version 47 or higher
export const CKEDITOR_TOOLBAR_ENABLED = parseInt(CKEDITOR_VERSION) >= 47;

const addPlugin =
    (Plugin) =>
    (ckEditorConfiguration, { editorOptions }) => {
        if (editorOptions && (editorOptions.nbsp || editorOptions.hyphens)) {
            ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
            ckEditorConfiguration.plugins.push(Plugin);

            // Add buttons to ckeditor toolbar for CKEditor version 47 and higher which is enabled in Neos 9.1+
            if (CKEDITOR_TOOLBAR_ENABLED) {
                ckEditorConfiguration.toolbar.items.push('|');
                if (editorOptions.hyphens) {
                    ckEditorConfiguration.toolbar.items.push('hyphens');
                }
                if (editorOptions.nbsp) {
                    ckEditorConfiguration.toolbar.items.push('nbsp');
                }
            }
        }
        return ckEditorConfiguration;
    };

export const initializeConfigRegistry = (ckEditorRegistry, editorConfig) => {
    const config = ckEditorRegistry.get('config');

    const HyphensPlugin = HyphensFactory(editorConfig);
    config.set('hyphens', addPlugin(HyphensPlugin));

    return config;
};
