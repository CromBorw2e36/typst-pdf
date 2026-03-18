/**
 * Injects JSON data into a Typst template by replacing the {{DATA}} placeholder.
 * Accepts either a JSON object or a JSON string.
 *
 * Usage:
 *   injectData(template, { name: "A" })
 *   injectData(template, '{"name":"A"}')
 *
 * @param {string} templateString - Typst template containing {{DATA}} placeholder
 * @param {Object|string} data - JSON object or JSON string
 * @returns {string} Typst markup with data injected
 */
export function injectData(templateString, data) {
    const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
    const escaped = jsonStr.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return templateString.replace('{{DATA}}', escaped);
}

// Backward-compat wrapper
export class TemplateResolver {
    resolve(templateString, data) {
        return injectData(templateString, data);
    }
}

export const defaultResolver = new TemplateResolver();
