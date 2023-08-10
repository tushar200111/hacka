class DataHelper {

    /**
     * Load all data from the provided form into a map of <key, value>
     * @param {HTMLElement} form contains the data
     */
    static getFormData(form) {
        const elems = [].slice.call(form.querySelectorAll('input, select'));
        return elems.reduce((dict, elem) => Object.assign(dict, { [elem.id]: elem.value }), {});
    }

    /**
     * Load all data from the given URL query parameters into a map of <key, value>
     * @param {URL} url defaults to window.location
     * @param {Boolean} camelCase indicates whether to replace dashes with underscores
     * @returns 
     */
    static getQueryData(url = window.location, camelCase = false) {
        const params = Array.from(new URL(url).searchParams.entries());
        const data = params.reduce((dict, [key, val]) => Object.assign(dict, { [key]: val }), {});
        return camelCase ? Object.keys(data).reduce((dict, key) =>
            Object.assign(dict, { [key.replace(/\-/g, '_')]: data[key] }), {}) : data;
    }
}
