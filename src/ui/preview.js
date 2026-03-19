import { MasaxTypstPDF } from '../core/generator.js';

export class TypstPreview {
    /**
     * @param {HTMLElement} parentElement 
     */
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.generator = new MasaxTypstPDF();
    }

    /**
     * Renders SVG preview from Typst template and JSON Data.
     * @param {string} template 
     * @param {Object} data 
     */
    async renderPreview(template, data = {}) {
        try {
            this.generator.loadBlueprint({ typstTemplate: template });

            // Lấy kết quả SVG (mảng pages)
            const pages = await this.generator.generateSVG(data);

            // Render từng page với separator
            this.parentElement.innerHTML = '';
            const pageArray = Array.isArray(pages) ? pages : [pages];
            pageArray.forEach((pageSvg, i) => {
                const sanitized = this._sanitizeSvg(pageSvg);
                const pageContainer = document.createElement('div');
                pageContainer.style.cssText = 'position:relative; margin-bottom:24px;';
                pageContainer.innerHTML = sanitized;

                const svg = pageContainer.querySelector('svg');
                if (svg) {
                    svg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    svg.style.backgroundColor = '#fff';
                    svg.style.display = 'block';
                }

                // Page label
                const label = document.createElement('div');
                label.textContent = `Page ${i + 1} / ${pageArray.length}`;
                label.style.cssText = 'text-align:center; font-size:0.75rem; color:#888; margin-top:4px; margin-bottom:8px;';
                pageContainer.appendChild(label);

                this.parentElement.appendChild(pageContainer);
            });

        } catch (error) {
            console.error("MasaxTypst: Preview Render Error:", error);
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'color:#721c24;background-color:#f8d7da;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;font-family:sans-serif;';
            const title = document.createElement('strong');
            title.textContent = 'Error rendering preview:';
            const pre = document.createElement('pre');
            pre.style.cssText = 'white-space:pre-wrap;margin-top:10px;';
            pre.textContent = error.message;
            wrapper.appendChild(title);
            wrapper.appendChild(document.createElement('br'));
            wrapper.appendChild(pre);
            this.parentElement.innerHTML = '';
            this.parentElement.appendChild(wrapper);
        }
    }

    /**
     * Loại bỏ <script> và on* attributes trong SVG content để tránh XSS
     * @param {string} svgString
     * @returns {string}
     */
    _sanitizeSvg(svgString) {
        const doc = new DOMParser().parseFromString(`<div>${svgString}</div>`, 'text/html');
        doc.querySelectorAll('script').forEach(el => el.remove());
        doc.querySelectorAll('*').forEach(el => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
            });
        });
        return doc.body.querySelector('div').innerHTML;
    }

    destroy() {
        this.parentElement.innerHTML = '';
    }
}
