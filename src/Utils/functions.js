function convertHourToString(hour) {
    var hourString = hour + 'am';
    if(hour === 12){
        hourString = '12pm';
    }else if (hour > 12) {
        hourString = (hour - 12) + 'pm';
    }
    return hourString;
}

module.exports = {
    convertHourToString
}