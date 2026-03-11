import { TypstEditor } from './editor.js';
import { TypstPreview } from './preview.js';

export class MasaxWorkspace {
    /**
     * @param {HTMLElement} containerElement 
     * @param {Object} options Options: { initialTemplate, initialData, onStatusChange }
     */
    constructor(containerElement, options = {}) {
        this.container = containerElement;
        this.data = options.initialData || {};
        this.template = options.initialTemplate || '#set page(width: "a4", height: "a4")\n\n= Hello World\n';
        this.onStatusChange = options.onStatusChange || null;
        
        this._setupDOM();
        this._setupConsole();
        
        this.preview = new TypstPreview(this.previewContainer);
        
        // Setup JSON Editor
        let jsonDebounceTimer;
        const initialJsonStr = JSON.stringify(this.data, null, 2);
        this.jsonEditor = new TypstEditor(this.jsonEditorContainer, initialJsonStr, (newContent) => {
            clearTimeout(jsonDebounceTimer);
            jsonDebounceTimer = setTimeout(() => {
                try {
                    this.data = JSON.parse(newContent);
                    this.preview.renderPreview(this.template, this.data);
                } catch (e) {
                    console.error("MasaxTypst: Invalid JSON format", e.message);
                }
            }, 500);
        });

        // Setup Typst Editor
        let debounceTimer;
        this.typstEditor = new TypstEditor(this.typstEditorContainer, this.template, (newContent) => {
            this.template = newContent;
            
            // Debounce 500ms
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.preview.renderPreview(newContent, this.data);
            }, 500);
        });

        // Initial render
        this.preview.renderPreview(this.template, this.data).then(() => {
            this._emitStatus('Sẵn sàng');
        }).catch(() => {
            this._emitStatus('Lỗi khởi tạo');
        });
    }

    /**
     * Gửi thông báo trạng thái qua callback nếu có
     * @param {string} msg
     */
    _emitStatus(msg) {
        if (this.onStatusChange) this.onStatusChange(msg);
    }

    _setupConsole() {
        this._originalConsole = {
            log: console.log,
            warn: console.warn,
            error: console.error,
            info: console.info,
        };
        const originalLog = this._originalConsole.log;
        const originalWarn = this._originalConsole.warn;
        const originalError = this._originalConsole.error;
        const originalInfo = this._originalConsole.info;

        const appendLog = (type, args) => {
            const row = document.createElement('div');
            row.style.padding = '4px 8px';
            row.style.borderBottom = '1px solid #ddd';
            row.style.fontFamily = 'monospace';
            row.style.fontSize = '12px';
            row.style.wordBreak = 'break-all';

            if (type === 'error') {
                row.style.color = '#721c24';
                row.style.backgroundColor = '#f8d7da';
            } else if (type === 'warn') {
                row.style.color = '#856404';
                row.style.backgroundColor = '#fff3cd';
            } else if (type === 'info') {
                row.style.color = '#004085';
                row.style.backgroundColor = '#cce5ff';
            } else {
                row.style.color = '#333';
            }

            const formatArg = (arg) => {
                if (typeof arg === 'object') {
                    try {
                        return JSON.stringify(arg);
                    } catch (e) {
                        return Object.prototype.toString.call(arg);
                    }
                }
                return String(arg);
            };

            row.textContent = `[${type.toUpperCase()}] ` + Array.from(args).map(formatArg).join(' ');
            this.consoleContainer.appendChild(row);
            this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
        };

        console.log = (...args) => {
            originalLog.apply(console, args);
            appendLog('log', args);
        };
        console.warn = (...args) => {
            originalWarn.apply(console, args);
            appendLog('warn', args);
        };
        console.error = (...args) => {
            originalError.apply(console, args);
            appendLog('error', args);
        };
        console.info = (...args) => {
            originalInfo.apply(console, args);
            appendLog('info', args);
        };
    }

    _setupDOM() {
        this.container.style.display = 'flex';
        this.container.style.width = '100%';
        this.container.style.height = '100vh';
        this.container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        this.container.style.overflow = 'hidden';

        // Left Pane
        this.leftPane = document.createElement('div');
        this.leftPane.style.flex = '1';
        this.leftPane.style.display = 'flex';
        this.leftPane.style.flexDirection = 'column';
        this.leftPane.style.borderRight = '1px solid #ddd';

        // Typst Editor Container
        this.typstEditorContainer = document.createElement('div');
        this.typstEditorContainer.style.flex = '1';
        this.typstEditorContainer.style.overflow = 'auto';
        this.typstEditorContainer.style.borderBottom = '1px solid #ddd';
        this.typstEditorContainer.style.position = 'relative';
        
        const typstHeader = document.createElement('div');
        typstHeader.textContent = "Typst Code";
        typstHeader.style.padding = "4px 8px";
        typstHeader.style.background = "#f8f9fa";
        typstHeader.style.fontSize = "12px";
        typstHeader.style.fontWeight = "bold";
        typstHeader.style.borderBottom = "1px solid #ddd";
        typstHeader.style.position = "sticky";
        typstHeader.style.top = "0";
        typstHeader.style.zIndex = "10";
        this.typstEditorContainer.appendChild(typstHeader);


        // JSON Editor Container
        this.jsonEditorContainer = document.createElement('div');
        this.jsonEditorContainer.style.flex = '1';
        this.jsonEditorContainer.style.overflow = 'auto';
        this.jsonEditorContainer.style.position = 'relative';

        const jsonHeader = document.createElement('div');
        jsonHeader.textContent = "JSON Data";
        jsonHeader.style.padding = "4px 8px";
        jsonHeader.style.background = "#f8f9fa";
        jsonHeader.style.fontSize = "12px";
        jsonHeader.style.fontWeight = "bold";
        jsonHeader.style.borderBottom = "1px solid #ddd";
        jsonHeader.style.position = "sticky";
        jsonHeader.style.top = "0";
        jsonHeader.style.zIndex = "10";
        this.jsonEditorContainer.appendChild(jsonHeader);

        this.leftPane.appendChild(this.typstEditorContainer);
        this.leftPane.appendChild(this.jsonEditorContainer);

        // Right Pane
        this.rightPane = document.createElement('div');
        this.rightPane.style.flex = '1';
        this.rightPane.style.display = 'flex';
        this.rightPane.style.flexDirection = 'column';

        // SVG Preview Container
        this.previewContainerWrapper = document.createElement('div');
        this.previewContainerWrapper.style.flex = '2'; // Give more space to preview
        this.previewContainerWrapper.style.overflow = 'auto';
        this.previewContainerWrapper.style.backgroundColor = '#f5f5f5';
        this.previewContainerWrapper.style.borderBottom = '1px solid #ddd';
        
        this.previewContainer = document.createElement('div');
        this.previewContainer.style.padding = '40px 20px';
        this.previewContainer.style.display = 'flex';
        this.previewContainer.style.flexDirection = 'column';
        this.previewContainer.style.alignItems = 'center';
        this.previewContainerWrapper.appendChild(this.previewContainer);

        // Console Container
        this.consoleContainer = document.createElement('div');
        this.consoleContainer.style.flex = '1';
        this.consoleContainer.style.overflow = 'auto';
        this.consoleContainer.style.backgroundColor = '#fafafa';
        this.consoleContainer.style.position = 'relative';

        const consoleHeader = document.createElement('div');
        consoleHeader.textContent = "Console Realtime";
        consoleHeader.style.padding = "4px 8px";
        consoleHeader.style.background = "#e9ecef";
        consoleHeader.style.fontSize = "12px";
        consoleHeader.style.fontWeight = "bold";
        consoleHeader.style.borderBottom = "1px solid #ddd";
        consoleHeader.style.position = "sticky";
        consoleHeader.style.top = "0";
        
        this.consoleContainer.appendChild(consoleHeader);

        this.rightPane.appendChild(this.previewContainerWrapper);
        this.rightPane.appendChild(this.consoleContainer);

        this.container.appendChild(this.leftPane);
        this.container.appendChild(this.rightPane);
    }

    /**
     * Dọn dẹp toàn bộ workspace: restore console, destroy editors, clear DOM
     */
    destroy() {
        if (this._originalConsole) {
            console.log = this._originalConsole.log;
            console.warn = this._originalConsole.warn;
            console.error = this._originalConsole.error;
            console.info = this._originalConsole.info;
        }
        this.typstEditor.destroy();
        this.jsonEditor.destroy();
        this.preview.destroy();
        this.container.innerHTML = '';
    }

    /**
     * Update data JSON and re-render
     * @param {Object} newData
     */
    updateData(newData) {
        this.data = newData;
        this.jsonEditor.setContent(JSON.stringify(this.data, null, 2));
        this.preview.renderPreview(this.typstEditor.getContent(), this.data);
    }

    /**
     * Generate actual PDF Blob from current code and data
     * @returns {Promise<Blob>}
     */
    async exportPDF() {
        // Reuse generator from preview to save memory/initialization
        return await this.preview.generator.generatePDF(this.data);
    }

    /**
     * Lấy blueprint hiện tại (chỉ gồm template)
     * @returns {Object}
     */
    getBlueprint() {
        return {
            typstTemplate: this.typstEditor.getContent(),
            data: this.data
        };
    }

    /**
     * Tải blueprint lên workspace (ghi đè template và data)
     * @param {Object} blueprintObj 
     */
    loadBlueprint(blueprintObj) {
        if (blueprintObj.typstTemplate) {
            this.template = blueprintObj.typstTemplate;
            this.typstEditor.setContent(this.template);
        }
        if (blueprintObj.data) {
            this.updateData(blueprintObj.data);
        } else {
            // Re-render preview even if data is unchanged
            this.preview.renderPreview(this.template, this.data);
        }
    }
}
