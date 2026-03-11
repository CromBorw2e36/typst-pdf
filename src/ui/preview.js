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

            // Lấy kết quả SVG
            const svgContent = await this.generator.generateSVG(data);

            // Sanitize SVG trước khi render để tránh XSS
            const sanitized = this._sanitizeSvg(svgContent);
            this.parentElement.innerHTML = sanitized;

            // Style cho các page SVG nằm giữa
            const svgs = this.parentElement.querySelectorAll('svg');
            svgs.forEach(svg => {
                svg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                svg.style.marginBottom = '20px';
                svg.style.backgroundColor = '#fff';
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
