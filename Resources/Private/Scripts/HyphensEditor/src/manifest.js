import manifest from '@neos-project/neos-ui-extensibility';
import initializeRichtextToolbarRegistry from './manifest.richtextToolbar';
import initializeConfigRegistry from './manifest.config';

manifest('Shel.Neos:HyphenEditor', {}, (globalRegistry, { frontendConfiguration }) => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const editorConfig = frontendConfiguration['Shel.Neos:HyphensEditor'];

    initializeRichtextToolbarRegistry(ckEditorRegistry);
    initializeConfigRegistry(ckEditorRegistry, editorConfig);
});
