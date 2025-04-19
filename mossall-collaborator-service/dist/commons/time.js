"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormatter = exports.getMonthNameFromIndex = void 0;
function getMonthNameFromIndex(monthIndex) {
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthIndex];
}
exports.getMonthNameFromIndex = getMonthNameFromIndex;
class DateFormatter {
    static format(date, formatString) {
        const options = {};
        if (formatString.includes('yyyy'))
            options.year = 'numeric';
        if (formatString.includes('MM'))
            options.month = '2-digit';
        if (formatString.includes('dd'))
            options.day = '2-digit';
        if (formatString.includes('HH'))
            options.hour = '2-digit';
        if (formatString.includes('mm'))
            options.minute = '2-digit';
        if (formatString.includes('ss'))
            options.second = '2-digit';
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }
}
exports.DateFormatter = DateFormatter;
//# sourceMappingURL=time.js.map