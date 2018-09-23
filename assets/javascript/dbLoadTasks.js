

var config = {
    apiKey: "AIzaSyDGCQvFTOuo1UnBrY9DuKuDX0caK-snc_o",
    authDomain: "dbtest-6a1ec.firebaseapp.com",
    databaseURL: "https://dbtest-6a1ec.firebaseio.com",
    projectId: "dbtest-6a1ec",
    storageBucket: "dbtest-6a1ec.appspot.com",
    messagingSenderId: "846174705720"
  };

// var config = {
//     apiKey: "AIzaSyDalr_tNRibx70GlgRV73vQawfvzOjisZI",
//     authDomain: "bootcampfirebase.firebaseapp.com",
//     databaseURL: "https://bootcampfirebase.firebaseio.com",
//     projectId: "bootcampfirebase",
//     storageBucket: "bootcampfirebase.appspot.com",
//     messagingSenderId: "676152556364"
// };

firebase.initializeApp(config);
var database = firebase.database();

//*************************************************************************************************
// Season should be 0,1,2,4,8 to allow for multi season calculations
//
// 0 = All seasons, 1 = winter, 2 = spring, 4 = summer, 8 = fall
//
// Summing any combination will always be a unique number and can be reverse engineered
//
//************************************************************************************************


// var house1 = {
//     houseid: "house001",
//     housename: "Kumar's House",
// }

// var house2 = {
//     houseid: "house002",
//     housename: "Joe's House",
// }

// var house3 = {
//     houseid: "house003",
//     housename: "Suraj's House",
// }

// var house4 = {
//     houseid: "house004",
//     housename: "Steve's House",
// }


// var houseArr = [house1, house2, house3, house4];
// for (i = 0; i < houseArr.length; i++) {
//     database.ref().child("/homes/" + houseArr[i].houseid).set(houseArr[i]);
// }



var task1 = {
    taskid: "1",
    taskname: "Test carbon-monoxide detector",
    taskcadence: 4464,
    tasklast: "20180401123456",
    tasknext: "201810041123456",
    taskvendor: "B",
    taskterm: "Carbon-monoxide detector"
}

var task2 = {
    taskid: "2",
    taskname: "Test smoke detector",
    taskcadence: 4464,
    tasklast: "20180401123456",
    tasknext: "201810041123456",
    taskvendor: "B",
    taskterm: "Smoke detector"
}

var task3 = {
    taskid: "3",
    taskname: "Clean refrigerator coils", 
    taskcadence: 4464, 
    tasklast: "20180701123456",
    tasknext: "201901011123456",
    taskvendor: "W",
    taskterm: "dryer lint brush"
}

var task4 = {
    taskid: "4",
    taskname: "Test sump pump", 
    taskcadence: 4464,
    tasklast: "20180401123456",
    tasknext: "201810041123456",
    taskvendor: "W",
    taskterm: "sump pump"}

var task5 = {
    taskid: "5",
    taskname: "Clean window AC", 
    taskcadence: 8928, 
    tasklast: "20180401123456",
    tasknext: "201910041123456",
    taskvendor: "W",
    taskterm: "window air conditioner cleaner"
}

var task6 = {
    taskid: "6",
    taskname: "Drain sediment form water heater", 
    taskcadence: 8928, 
    tasklast: "20180801123456",
    tasknext: "201910041123456",
    taskvendor: "W",
    taskterm: "hot water heater"
}

var task7 = {
    taskid: "7",
    taskname: "Clean basement window wells", 
    taskcadence: 4464,
    tasklast: "20180401123456",
    tasknext: "201810041123456",
    taskvendor: "W",
    taskterm: "window well covers"
}

var task8 = {
    taskid: "8",
    taskname: "Lubricate garage door spring", 
    taskcadence: 8928, 
    tasklast: "20180801123456",
    tasknext: "201908011123456",
    taskvendor: "W",
    taskterm: "spray lubricant"
}

var task9 = {
    taskid: "9",
    taskname: "Change HVAC filters", 
    taskcadence: 744,
    tasklast: "20180910123456",
    tasknext: "201810101123456",
    taskvendor: "W",
    taskterm: "HVAC filters"
}

var task10 = {
    taskid: "10",
    taskname: "Apply seasonal fertilizer", 
    taskcadence: 2232, 
    tasklast: "20180601123456",
    tasknext: "20180902123456",
    taskvendor: "W",
    taskterm: "lawn fertilizer"
}


var housename = "Kumar's House";
// var housename = "Joe's House";
// var housename = "Suraj's House";
// var housename = "Steve's House";


var taskArr = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10];

for (i = 0; i < taskArr.length; i++) {
    // database.ref().child("/house/" + housename + "/tasks/").set(taskArr[i]);
    database.ref().child("/house/" + housename + "/tasks/" + taskArr[i].taskid).set(taskArr[i]);
}


