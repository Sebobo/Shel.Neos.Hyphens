import {Plugin, ViewRange} from 'ckeditor5-exports';
import ShyCommand from '../commands/shy';
import styles from './hyphens.vanilla-css';

const softHyphenCharacter = '\u00AD';

export default class Hyphens extends Plugin {
    static get pluginName() {
        return 'Hyphens';
    }

    init() {
        const {editor} = this;

        editor.commands.add('insertShyEntity', new ShyCommand(this.editor));

        editor.conversion.for('editingDowncast').add(dispatcher => {
            dispatcher.on('insert:$text', (evt, data, conversionApi) => {
                // Here should be an `if` that would check whether the feature's command is enabled.
                if (!conversionApi.consumable.consume(data.item, 'insert')) {
                    return;
                }

                const viewWriter = conversionApi.writer;

                let modelPosition = data.range.start;
                let viewPosition = conversionApi.mapper.toViewPosition(modelPosition);

                const dataChunks = data.item.data.split(softHyphenCharacter);
                for (let i = 0; i < dataChunks.length; i++) {
                    const chunk = dataChunks[i];

                    if (chunk !== '') {
                        viewWriter.insert(viewPosition, viewWriter.createText(chunk));

                        // Need to recalculate `viewPosition` after every inserted item.
                        modelPosition = modelPosition.getShiftedBy(chunk.length);
                        viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
                    }

                    // Do not insert anything after the last chunk
                    if (i === dataChunks.length - 1) {
                        break;
                    }

                    // Insert utf8 dash character as representation
                    // We will wrap in in a span in following lines.
                    viewWriter.insert(viewPosition, viewWriter.createText(softHyphenCharacter));

                    const viewSpaceSpan = viewWriter.createAttributeElement('span', {class: 'shy'});
                    const modelWrapRange = new ViewRange(modelPosition, modelPosition.getShiftedBy(1));
                    const viewWrapRange = conversionApi.mapper.toViewRange(modelWrapRange);

                    viewWriter.wrap(viewWrapRange, viewSpaceSpan);

                    // Need to recalculate `viewPosition` after every inserted item.
                    modelPosition = modelPosition.getShiftedBy(1);
                    viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
                }
            }, {priority: 'high'});
        });
    }
}
