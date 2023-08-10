(function () {
    'use strict';

    // URLSearchParameters
    window.URLSearchParameters = function (querystring) {
        return (querystring || location.search).split('?').pop().split('&').reduce(function (acc, keyval) {
            var parts = keyval.split('=');
            var key = decodeURIComponent(parts[0]);
            var val = parts[1] ? decodeURIComponent(parts[1]) : true;
            acc[key] = val;
            return acc;
        }, {});
    };

    // Go to a certain URL, trigger reload if necessary
    window.goto = function (href, newtab) {
        window.open(href, newtab ? '_blank' : '_top');
        if (window.location.pathname === href.split('#')[0]) {
            window.location.reload();
        }
    };

    window.getCSV = async function (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        Papa.parse(await res.text(), {
            header: true,
            skipEmptyLines: true,
            complete: result => {
                if (result.errors.length > 0) {
                    reject(result.errors[0]);
                } else {
                    resolve(result.data);
                }
            }
        });
    };

    window.csv2json = function csv2json(url) {
        return new Promise(resolve =>
            Papa.parse(url, { download: true, complete: resolve })
        ).then(res => res.data).then(rows => rows.slice(1).map(row =>
            rows[0].reduce((agg, col, idx) =>
                Object.assign(agg, { [col]: col === 'Date' ? row[idx] : parseFloat(row[idx]) }), {})
        ));
    };

    HTMLElement.prototype.attach = function (tag, attrs = {}) {
        const elem = document.createElement(tag);
        Object.keys(attrs).forEach(key => elem.setAttribute(key, attrs[key]));
        this.appendChild(elem);
        return elem;
    };

    HTMLElement.prototype.clear = function () {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        return this;
    };

    Array.prototype.at = function at(n) {
        n = Math.trunc(n) || 0;
        if (n < 0) n += this.length;
        if (n < 0 || n >= this.length) return undefined;
        return this[n];
    };

})();