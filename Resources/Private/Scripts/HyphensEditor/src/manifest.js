import manifest from '@neos-project/neos-ui-extensibility';
import initializeRichtextToolbarRegistry from './manifest.richtextToolbar';
import initializeConfigRegistry from './manifest.config';

manifest('Shel.Neos:HyphenEditor', {}, globalRegistry => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');

    initializeRichtextToolbarRegistry(ckEditorRegistry);
    initializeConfigRegistry(ckEditorRegistry);
});
