module.exports = function() {
    let date = require('date-and-time');
    let now = new Date();

    var getDate = date.format(now, 'YYYY-MM-DD');
    var getTime = date.format(now, 'HH:mm');
    var getDay = date.format(now, ' dddd');
    console.log("\nWelcome back, Sir!\n");
    
    console.log("Today is:" + '' + getDay);
    console.log('Time is:' + '' +getTime);
    console.log('Date today is:' + '' + getDate + '\n');
};