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
            
            // Render vào container
            this.parentElement.innerHTML = svgContent;
            
            // Style cho các page SVG nằm giữa
            const svgs = this.parentElement.querySelectorAll('svg');
            svgs.forEach(svg => {
                svg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                svg.style.marginBottom = '20px';
                svg.style.backgroundColor = '#fff';
            });
            
        } catch (error) {
            console.error("MasaxTypst: Preview Render Error:", error);
            this.parentElement.innerHTML = `
                <div style="color: #721c24; background-color: #f8d7da; padding: 1rem; border: 1px solid #f5c6cb; border-radius: 4px; font-family: sans-serif;">
                    <strong>Error rendering preview:</strong><br/>
                    <pre style="white-space: pre-wrap; margin-top: 10px;">${error.message}</pre>
                </div>
            `;
        }
    }
}
