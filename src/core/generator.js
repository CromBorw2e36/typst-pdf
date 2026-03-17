import { defaultResolver } from './resolver.js';
import { compileTypstToPdf, compileTypstToSvg } from './compiler.js';

export class MasaxTypstPDF {
    /**
     * @param {Object|string} blueprint - The blueprint containing the Typst template and configuration
     */
    constructor(blueprint = null) {
        this.blueprint = null;
        this.extraFonts = [];
        if (blueprint) {
            this.loadBlueprint(blueprint);
        }
    }

    /**
     * Loads a new blueprint.
     * @param {Object|string} blueprintObj 
     */
    loadBlueprint(blueprintObj) {
        try {
            if (typeof blueprintObj === 'string') {
                this.blueprint = JSON.parse(blueprintObj);
            } else {
                this.blueprint = blueprintObj;
            }
        } catch (e) {
            console.error("MasaxTypst: Invalid blueprint format.");
            throw e;
        }
    }

    /**
     * Alias for loadBlueprint
     * @param {Object|string} blueprintObj 
     */
    setBlueprint(blueprintObj) {
        this.loadBlueprint(blueprintObj);
    }

    /**
     * Creates a standard blueprint structure from a Typst template string
     * @param {string} typstTemplateString 
     * @returns {Object}
     */
    genBlueprint(typstTemplateString) {
        return {
            typstTemplate: typstTemplateString
        };
    }

    /**
     * Alias for generatePDF
     */
    async genPDF(data = {}) {
        return await this.generatePDF(data);
    }

    /**
     * Register additional fonts before generation
     * @param {Array<{path: string, data: Uint8Array}>} fonts 
     */
    setFonts(fonts) {
        this.extraFonts = fonts;
    }

    /**
     * Helper to get the template string from the blueprint.
     */
    _getTemplate() {
        if (!this.blueprint) {
            throw new Error("Blueprint not loaded.");
        }
        return this.blueprint.typstTemplate || this.blueprint.content || this.blueprint;
    }

    /**
     * Generates a PDF File Blob
     * @param {Object} data - Context data to resolve the template
     * @returns {Promise<Blob>}
     */
    async generatePDF(data = {}) {
        const template = this._getTemplate();
        console.info("MasaxTypst: Resolving template with data...");
        const resolvedMarkup = defaultResolver.resolve(template, data);
        console.info("MasaxTypst: Template resolved. Starting PDF compilation...");
        return await compileTypstToPdf(resolvedMarkup, this.extraFonts);
    }
    
    /**
     * Generates an array of SVG strings for live preview
     * @param {Object} data - Context data to resolve the template
     * @returns {Promise<Array<string>>}
     */
    async generateSVG(data = {}) {
        const template = this._getTemplate();
        console.info("MasaxTypst: Resolving template with data...");
        const resolvedMarkup = defaultResolver.resolve(template, data);
        console.info("MasaxTypst: Template resolved. Starting SVG compilation...");
        return await compileTypstToSvg(resolvedMarkup, this.extraFonts);
    }
}
