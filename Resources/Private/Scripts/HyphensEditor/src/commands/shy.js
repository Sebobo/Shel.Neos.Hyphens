const SOFT_HYPHEN_CHARACTER = '\u00AD';

function ShyCommand(editor) {
    return {
        execute: function () {
            editor.model.change(writer => {
                const hyphen = writer.createElement('hyphens', {characterClass: 'shy'})
                editor.model.insertContent(hyphen);
                writer.setSelection(hyphen, 'on');
            });
        },
        refresh: function () {
            const model = this.editor.model;
            const selection = model.document.selection;

            this.isEnabled = model.schema.checkChild(selection.focus.parent, 'hyphens');
        }
    };
}

export {
    SOFT_HYPHEN_CHARACTER,
    ShyCommand
}
