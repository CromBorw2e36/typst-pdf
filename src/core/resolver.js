import Handlebars from 'handlebars';

export class TemplateResolver {
    constructor() {
        this.handlebars = Handlebars.create();
        this.registerDefaultHelpers();
    }

    /**
     * Register common formatting helpers.
     */
    registerDefaultHelpers() {
        this.handlebars.registerHelper('formatCurrency', (value) => {
            if (!value) return '0 ₫';
            return Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        });
        
        this.handlebars.registerHelper('formatDate', (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        });

        this.handlebars.registerHelper('eq', function (a, b) {
            return a === b;
        });

        this.handlebars.registerHelper('neq', function (a, b) {
            return a !== b;
        });
    }

    /**
     * Register a custom helper from outside.
     * @param {string} name 
     * @param {Function} fn 
     */
    registerHelper(name, fn) {
        this.handlebars.registerHelper(name, fn);
    }

    /**
     * Compiles and resolves the template with provided data.
     * @param {string} templateString 
     * @param {Object} data 
     * @returns {string} resolved string
     */
    resolve(templateString, data) {
        try {
            // Unescaped by default for Typst syntax, but users should be careful
            // Handlebars defaults to HTML escaping. We need to disable it for Typst markup.
            const compiled = this.handlebars.compile(templateString, { noEscape: true });
            return compiled(data);
        } catch (error) {
            console.error('MasaxTypst: Handlebars Compilation Error:', error);
            throw error;
        }
    }
}

export const defaultResolver = new TemplateResolver();
