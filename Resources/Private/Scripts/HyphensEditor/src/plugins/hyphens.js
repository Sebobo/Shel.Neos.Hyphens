import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import {upcastElementToElement} from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import {downcastElementToElement} from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';
import {toWidget} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import styles from './hyphens.vanilla-css';

class ShyCommand extends Command {
    static get requires() {
        return [Widget];
    }

    execute() {
        const editor = this.editor;
        editor.model.change(writer => {
            const element = writer.createElement('hyphen', {class: 'shy'});
            // editor.model.insertContent(element, editor.model.document.selection);
            // writer.appendText('-', element);

            const insertAtSelection = editor.model.document.selection.getFirstPosition();
            editor.model.insertContent(element, insertAtSelection);

            if (element.parent) {
                writer.setSelection(element, 'on');
            }
        });
    }
}

class WbrCommand extends Command {
    execute() {
        const editor = this.editor;
        editor.model.change(writer => {
            const element = writer.createElement('hyphen', {class: 'wbr'}, ['&shy;']);
            editor.model.insertContent(element, editor.model.document.selection);
        });
    }
}

export default class Hyphens extends Plugin {
    static get pluginName() {
        return 'Hyphens';
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertShyEntity', new ShyCommand(this.editor));
        this.editor.commands.add('insertWbrTag', new WbrCommand(this.editor));
    }

    _defineSchema() {

        this.editor.model.schema.register('hyphen', {
            allowWhere: '$text',
            isInline: true,
            isObject: true,
            allowAttributes: ['class']
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.elementToElement({
            model: 'hyphen',
            view: {
                name: 'span',
                classes: 'shy'
            },
            converterPriority: 'high'
        });

        // conversion.for('upcast').add(upcastElementToElement({
        //     view: {
        //         name: 'span',
        //         classes: 'shy'
        //     },
        //     // upcastAlso: ['span', {classes: 'wbr'}],
        //     // model: 'hyphen',
        //     model: (viewElement, modelWriter) => {
        //         return modelWriter.createElement('hyphen', {class: 'shy'});
        //         // const className = viewElement.getAttribute('class');
        //         // let element = modelWriter.createElement('hyphen', {class: className});
        //         // modelWriter.appendText('-', element);
        //         //
        //         // if (element.parent) {
        //         //     modelWriter.setSelection(element, 'on');
        //         // }
        //         // return element;
        //     },
        //     converterPriority: 'high'
        // }));

        conversion.for('editingDowncast').add(downcastElementToElement({
            model: 'hyphen',
            view: (modelItem, viewWriter) => {
                const classNames = modelItem.getAttribute('class');
                const widgetElement = viewWriter.createContainerElement('span', {class: classNames});
                return toWidget(widgetElement, viewWriter);
            }
        }));

        conversion.for('dataDowncast').add(downcastElementToElement({
            model: 'hyphen',
            view: (modelItem, viewWriter) => {
                const classNames = modelItem.getAttribute('class');
                return viewWriter.createContainerElement('span', {class: classNames});
            }
        }));
    }
}
