import Command from '@ckeditor/ckeditor5-core/src/command';

export default class WbrCommand extends Command {
    execute() {
        const editor = this.editor;
        editor.model.change(writer => {
            const element = writer.createElement('wbr');
            editor.model.insertContent(element, editor.model.document.selection);
        });
    }
}
