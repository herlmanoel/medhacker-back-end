class FormatttingDates {

    static convertForDate(data){
        let dayMonthYear = data.split('T')[0];
        return new Date(dayMonthYear);
    }

    static convert(data) {
        let dayMonthYear = data.split('T')[0];
        dayMonthYear = dayMonthYear.split('-');
        return `${dayMonthYear[2]}/${dayMonthYear[1]}/${dayMonthYear[0]}`;
    }

}

module.exports = { FormatttingDates };