const NBSP_CHARACTER = '\u00A0';

function NbspCommand(editor) {
    return {
        execute: () => {
            editor.model.change(writer => {
                const insertPosition = editor.model.document.selection.getFirstPosition();
                writer.insertText('\u00A0', insertPosition);
            });
        }
    };
}

export {
    NBSP_CHARACTER,
    NbspCommand
}
