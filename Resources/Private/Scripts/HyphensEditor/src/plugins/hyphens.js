// Neos.Ui 8.3 -> 9.0 compatible import
import { ViewRange, ButtonView } from 'ckeditor5-exports';

import ShyCommand from '../commands/shy';
import NbspCommand from '../commands/nbsp';
import './hyphens.css';
import { CKEDITOR_TOOLBAR_ENABLED } from '../manifest.config';

const softHyphenCharacter = '\u00AD';
const nbspCharacter = '\u00A0';

function HyphensFactory(config) {
    return function Hyphens(editor) {
        editor.commands.add('insertShyEntity', ShyCommand(editor));
        editor.commands.add('insertNbspEntity', NbspCommand(editor));

        if (config.shortcut) {
            editor.keystrokes.set(config.shortcut, 'insertShyEntity');
        }

        // Add buttons to ckeditor toolbar for CKEditor version 47 and higher which is enabled in Neos 9.1+
        if (CKEDITOR_TOOLBAR_ENABLED) {
            editor.ui.componentFactory.add('hyphens', () => {
                const buttonView = new ButtonView();

                buttonView.set({
                    label: 'Insert soft hyphen',
                    withText: false,
                    tooltip: true,
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18.109" height="9.697" viewBox="0, 0, 18.109, 9.697"><g stroke="currentColor" stroke-miterlimit="3.864" fill="none"><path d="M2.596 1a5.44 5.44 0 0 0 0 7.697m12.918 0a5.44 5.44 0 0 0 0-7.697" stroke-width=".907"></path><path d="M4.52 4.848h9.07" stroke-width="1.814"></path></g></svg>',
                });

                // Execute the command when button is clicked
                buttonView.on('execute', () => {
                    editor.execute('insertShyEntity');
                    editor.editing.view.focus();
                });

                return buttonView;
            });
            editor.ui.componentFactory.add('nbsp', () => {
                const buttonView = new ButtonView();

                buttonView.set({
                    label: 'Insert non-breaking space',
                    withText: false,
                    tooltip: true,
                    icon: '<svg width="18px" height="9px" viewBox="0 0 18 9" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><path d="M16.3846154,2.61538462 L16.3846154,7.53846154 M16.3846154,7.53846154 L1.61538462,7.53846154 M1.61538462,2.61538462 L1.61538462,7.53846154" id="Combined-Shape" stroke="currentColor" stroke-width="1.8"></path></g></svg>',
                });

                // Execute the command when button is clicked
                buttonView.on('execute', () => {
                    editor.execute('insertNbspEntity');
                    editor.editing.view.focus();
                });

                return buttonView;
            });
        }

        editor.conversion.for('editingDowncast').add((dispatcher) => {
            dispatcher.on(
                'insert:$text',
                (evt, data, conversionApi) => {
                    // Here should be an `if` that would check whether the feature's command is enabled.
                    if (!conversionApi.consumable.consume(data.item, 'insert')) {
                        return;
                    }

                    const viewWriter = conversionApi.writer;

                    let modelPosition = data.range.start;
                    let viewPosition = conversionApi.mapper.toViewPosition(modelPosition);

                    const dataChunks = data.item.data.split(/([\u00AD,\u00A0])/);

                    for (let i = 0; i < dataChunks.length; i++) {
                        const chunk = dataChunks[i];

                        if (chunk === '') {
                            continue;
                        }

                        viewWriter.insert(viewPosition, viewWriter.createText(chunk));

                        // Wrap special characters with spans and matching classes for styling
                        if (chunk === nbspCharacter || chunk === softHyphenCharacter) {
                            const characterClass = chunk === nbspCharacter ? 'nbsp' : 'shy';
                            const viewSpaceSpan = viewWriter.createAttributeElement('span', {
                                class: characterClass,
                            });
                            const modelWrapRange = new ViewRange(modelPosition, modelPosition.getShiftedBy(1));
                            const viewWrapRange = conversionApi.mapper.toViewRange(modelWrapRange);

                            viewWriter.wrap(viewWrapRange, viewSpaceSpan);
                        }

                        // Need to recalculate `viewPosition` after every inserted item.
                        modelPosition = modelPosition.getShiftedBy(chunk.length);
                        viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
                    }
                },
                { priority: 'high' },
            );
        });
    };
}

export default HyphensFactory;
