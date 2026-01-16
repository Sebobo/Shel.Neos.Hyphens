import manifest from '@neos-project/neos-ui-extensibility';
import initializeRichtextToolbarRegistry from './manifest.richtextToolbar';
import { initializeConfigRegistry, CKEDITOR_TOOLBAR_ENABLED } from './manifest.config';

manifest('Shel.Neos:HyphenEditor', {}, (globalRegistry, { frontendConfiguration }) => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const editorConfig = frontendConfiguration['Shel.Neos:HyphensEditor'];

    // Add buttons to ckeditor toolbar for CKEditor version 47 and higher which is enabled in Neos 9.1+
    if (!CKEDITOR_TOOLBAR_ENABLED) {
        initializeRichtextToolbarRegistry(ckEditorRegistry);
    }
    initializeConfigRegistry(ckEditorRegistry, editorConfig);
});
