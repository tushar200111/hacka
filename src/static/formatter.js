class Formatter {

    static price(value, signed = false) {
        value = Number(value);
        const localeOptions = { maximumFractionDigits: 2 };
        if (value !== Math.round(value)) localeOptions.minimumFractionDigits = 2;
        const str = value.toLocaleString(undefined, localeOptions).replace('-', '');
        const prefix = (value < 0 ? '-' : (signed ? '+' : '')) + '$';
        return prefix + str;
    }

    static number(value, signed = false) {
        const prefix = signed && value > 0 ? '+' : '';
        return prefix + Number(value).toLocaleString();
    }

    static years(value) {
        value = Math.round((Number(value) + Number.EPSILON) * 10) / 10;
        return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
    }

    static percent(value, signed = false) {
        const prefix = signed && value > 0 ? '+' : '';
        return prefix + (100 * Number(value)).toLocaleString() + '%';
    }

}