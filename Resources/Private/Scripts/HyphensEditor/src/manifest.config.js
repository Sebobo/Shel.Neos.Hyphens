import {$add, $get} from 'plow-js';

import Hyphens from './plugins/hyphens';

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
    if (!isEnabled || isEnabled(options.editorOptions, options)) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        return $add('plugins', Plugin, ckEditorConfiguration);
    }
    return ckEditorConfiguration;
};

export default ckEditorRegistry => {
    const config = ckEditorRegistry.get('config');

    config.set('hyphens', addPlugin(Hyphens, $get('hyphens')));

    return config;
};
