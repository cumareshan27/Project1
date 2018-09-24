

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


var task1 = {
    taskid: "task001",
    taskname: "Test carbon-monoxide detector",
    cadence: 4464,
    last: "20180401",
    season: 10
}

var task2 = {
    taskid: "task002",
    taskname: "Test smoke detector",
    cadence: 4464,
    season: 10,
    last: "20180401"
}

var task3 = {
    taskid: "task003",
    taskname: "Clean refrigerator coils", 
    cadence: 4464, 
    season: 5,
    last: "20180701"
}

var task4 = {
    taskid: "task004",
    taskname: "Test sump pump", 
    cadence: 4464,
    season: 10,
    last: "20180401"
}

var task5 = {
    taskid: "task005",
    taskname: "Clean window AC", 
    cadence: 8928, 
    season: 2, 
    last: "20180401"
}

var task6 = {
    taskid: "task006",
    taskname: "Drain sediment form water heater", 
    cadence: 8928, 
    season: 4,
    last: 20180801
}

var task7 = {
    taskid: "task007",
    taskname: "Clean basement window wells", 
    cadence: 4464,
    season: 10,
    last: "20180401"
}

var task8 = {
    taskid: "task008",
    taskname: "Lubricate garage door spring", 
    cadence: 8928, 
    season: 4, 
    last: "20180801"
}

var task9 = {
    taskid: "task009",
    taskname: "Change HVAC filters", 
    cadence: 744,
    season: 0,
    last: "20180910"
}

var task10 = {
    taskid: "task010",
    taskname: "Apply seasonal fertilizer", 
    cadence: 2232, 
    season: 0,
    last: "20180601"
}


var taskArr = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10];
for (i = 0; i < taskArr.length; i++) {
    database.ref().child("/tasks/" + taskArr[i].taskid).set(taskArr[i]);
}
