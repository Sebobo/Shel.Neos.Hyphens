import {$add, $get} from 'plow-js';

import HyphensFactory from './plugins/hyphens';

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
    if (!isEnabled || isEnabled(options.editorOptions, options)) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        return $add('plugins', Plugin, ckEditorConfiguration);
    }
    return ckEditorConfiguration;
};

export default (ckEditorRegistry, editorConfig) => {
    const config = ckEditorRegistry.get('config');

    const HyphensPlugin = HyphensFactory(editorConfig);
    config.set('hyphens', addPlugin(HyphensPlugin, $get('hyphens') || $get('nbsp')));

    return config;
};
