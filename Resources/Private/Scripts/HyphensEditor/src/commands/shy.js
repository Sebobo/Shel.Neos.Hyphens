import {Command} from 'ckeditor5-exports';

export default class ShyCommand extends Command {
    execute() {
        const editor = this.editor;
        editor.model.change((writer) => {
            const insertPosition = editor.model.document.selection.getFirstPosition();
            writer.insertText('\u00AD', insertPosition);
        });
    }
}
