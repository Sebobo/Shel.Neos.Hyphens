export default function ShyCommand(editor) {
    return {
        execute: () => {
            editor.model.change((writer) => {
                const insertPosition = editor.model.document.selection.getFirstPosition();
                writer.insertText('\u00AD', insertPosition);
            });
        },
    };
}
