const moment = require('moment');

/* 
var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
var date = new Date();
console.log(date.getMonth());
console.log(months[date.getMonth()]);

 */

 var date = moment();
 date.add(4,'year').subtract(2,'months');
 console.log(date.format('MMM Do, YYYY'));

 //10:35 am
 //6:01 am

 console.log(date.format('h:mm a'));

 console.log('Timestamp in miili second from 1st Jan 1970 00:00:00 i.e. unix epoch : '+date.valueOf());