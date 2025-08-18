import { ViewRange } from 'ckeditor5-exports';
import ShyCommand from '../commands/shy';
import NbspCommand from '../commands/nbsp';
import './hyphens.css';

const softHyphenCharacter = '\u00AD';
const nbspCharacter = '\u00A0';

function HyphensFactory(config) {
    return function Hyphens(editor) {
        editor.commands.add('insertShyEntity', ShyCommand(editor));
        editor.commands.add('insertNbspEntity', NbspCommand(editor));

        if (config.shortcut) {
            editor.keystrokes.set(config.shortcut, 'insertShyEntity');
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
                    evt.stop();
                },
                { priority: 'high' },
            );
        });
    };
}

export default HyphensFactory;
