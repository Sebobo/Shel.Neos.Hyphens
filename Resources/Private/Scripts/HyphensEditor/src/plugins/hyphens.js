import {toWidget, Widget, ViewRange, viewToModelPositionOutsideModelElement} from 'ckeditor5-exports';
import { SOFT_HYPHEN_CHARACTER, ShyCommand } from '../commands/shy';
import { NBSP_CHARACTER, NbspCommand } from '../commands/nbsp';
import './hyphens.vanilla-css';

const HYPHENS_CLASS = 'hyphens';

function createHyphensView(modelItem, viewWriter) {
    const characterClass = modelItem.getAttribute('characterClass');
    return viewWriter.createAttributeElement('span', {
        class: `${HYPHENS_CLASS} ${characterClass}`
    });
}

function HyphensFactory(config) {
    const Hyphens = function (editor) {
        const {commands, conversion, model, keystrokes, editing} = editor;
        commands.add('insertShyEntity', ShyCommand(editor));
        commands.add('insertNbspEntity', NbspCommand(editor));

        if (config.shortcut) {
            keystrokes.set(config.shortcut, 'insertShyEntity');
        }

        // Register schemas
        model.schema.register(HYPHENS_CLASS, {
            allowWhere: '$text',
            isInline: true,
            isObject: true,
            allowAttributes: [
                'characterClass'
            ]
        });

        conversion.for('editingDowncast').elementToElement({
            mode: HYPHENS_CLASS,
            view: (modelItem, viewWriter) => toWidget(createHyphensView(modelItem, viewWriter), viewWriter)
        });
        // conversion.for('editingDowncast').add(dispatcher => {
        //     dispatcher.on('insert:$text', (evt, data, conversionApi) => {
        //         // Here should be an `if` that would check whether the feature's command is enabled.
        //         if (!conversionApi.consumable.consume(data.item, 'insert')) {
        //             return;
        //         }
        //
        //         const viewWriter = conversionApi.writer;
        //
        //         let modelPosition = data.range.start;
        //         let viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
        //
        //         const dataChunks = data.item.data.split(/([\u00AD\u00A0])/);
        //         // if (dataChunks.length === 1 && dataChunks[0] !== NBSP_CHARACTER && dataChunks[0] !== SOFT_HYPHEN_CHARACTER) {
        //         //     return;
        //         // }
        //
        //         for (let i = 0; i < dataChunks.length; i++) {
        //             const chunk = dataChunks[i];
        //
        //             if (chunk === '') {
        //                 continue;
        //             }
        //
        //             viewWriter.insert(viewPosition, viewWriter.createText(chunk));
        //
        //             // Wrap special characters with spans and matching classes for styling
        //             if (chunk === NBSP_CHARACTER || chunk === SOFT_HYPHEN_CHARACTER) {
        //                 debugger;
        //
        //                 const characterClass = chunk === NBSP_CHARACTER ? 'nbsp' : 'shy';
        //                 const viewSpaceSpan = viewWriter.createAttributeElement('span', {
        //                     class: `${HYPHENS_CLASS} ${HYPHENS_CLASS}--${characterClass}`
        //                 });
        //                 const modelWrapRange = new ViewRange(modelPosition, modelPosition.getShiftedBy(1));
        //                 const viewWrapRange = conversionApi.mapper.toViewRange(modelWrapRange);
        //
        //                 viewWriter.wrap(viewWrapRange, viewSpaceSpan);
        //             }
        //
        //             // Need to recalculate `viewPosition` after every inserted item.
        //             modelPosition = modelPosition.getShiftedBy(chunk.length);
        //             viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
        //         }
        //         evt.stop();
        //     }, {priority: 'high'})
        // });

        conversion.for('dataDowncast').elementToElement({
            model: HYPHENS_CLASS,
            view: createHyphensView
        });

        conversion.for('upcast').elementToElement({
            view: {
                name: 'span',
                classes: [HYPHENS_CLASS]
            },
            model: (viewElement, modelWriter) => {
                const characterClass = viewElement.getAttribute('characterClass');
                return modelWriter.createElement(HYPHENS_CLASS, {characterClass});
            }
        });

        editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement(model, viewElement => viewElement.hasClass(HYPHENS_CLASS))
        );
    };
    Hyphens.prototype.requires = [Widget];
    Hyphens.prototype.name = HYPHENS_CLASS;
    return Hyphens;
}

export default HyphensFactory;
