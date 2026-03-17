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
            console.info("MasaxTypst: Compiling Handlebars template...");
            const compiled = this.handlebars.compile(templateString, { noEscape: true });
            const result = compiled(data);
            console.info("MasaxTypst: Handlebars template resolved successfully.");
            return result;
        } catch (error) {
            console.error('MasaxTypst: Handlebars Compilation Error:', error);
            throw error;
        }
    }
}

// Lazy singleton – avoids calling Handlebars.create() at module-load time,
// which uses `new Function()` and breaks in CSP-restricted environments (e.g. VS Code webviews).
let _defaultResolver = null;
export function getDefaultResolver() {
    if (!_defaultResolver) {
        _defaultResolver = new TemplateResolver();
    }
    return _defaultResolver;
}
// Backwards-compat: keep named export for existing consumers
export const defaultResolver = { get resolve() { return getDefaultResolver().resolve.bind(getDefaultResolver()); } };
