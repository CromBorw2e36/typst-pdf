import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";

export class TypstEditor {
    /**
     * @param {HTMLElement} parentElement 
     * @param {string} initialContent 
     * @param {Function} onChangeCallback 
     */
    constructor(parentElement, initialContent = '', onChangeCallback = null) {
        this.onChange = onChangeCallback;
        
        const state = EditorState.create({
            doc: initialContent,
            extensions: [
                basicSetup,
                // Lắng nghe sự thay đổi của document
                EditorView.updateListener.of((update) => {
                    if (update.docChanged && this.onChange) {
                        this.onChange(update.state.doc.toString());
                    }
                })
            ]
        });

        this.view = new EditorView({
            state,
            parent: parentElement
        });
    }

    /**
     * Lấy nội dung hiện tại của Editor
     * @returns {string}
     */
    getContent() {
        return this.view.state.doc.toString();
    }

    /**
     * Ghi đè toàn bộ nội dung của Editor
     * @param {string} content 
     */
    setContent(content) {
        const transaction = this.view.state.update({
            changes: {from: 0, to: this.view.state.doc.length, insert: content}
        });
        this.view.dispatch(transaction);
    }

    /**
     * Focus vào editor
     */
    focus() {
        this.view.focus();
    }
}
