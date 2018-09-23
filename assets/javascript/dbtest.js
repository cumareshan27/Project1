

var config = {
    apiKey: "AIzaSyDGCQvFTOuo1UnBrY9DuKuDX0caK-snc_o",
    authDomain: "dbtest-6a1ec.firebaseapp.com",
    databaseURL: "https://dbtest-6a1ec.firebaseio.com",
    projectId: "dbtest-6a1ec",
    storageBucket: "dbtest-6a1ec.appspot.com",
    messagingSenderId: "846174705720"
  };
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
    taskname: "Task to do 1",
    cadence:  744,
    last: "20180601174515",
    season: 0
}

var task2 = {
    taskname: "Task to do 2",
    cadence:  744,
    last: "20180601174515",
    season: 0
}


var taskArr = [task1, task2];
for (i = 0; i < taskArr.length; i++) {
    database.ref().child("/tasks/" + taskArr[i].taskname).set(taskArr[i]);
}



// database.ref("/task").child({
//     taskname: "Task to do 1",
//     cadence: 744,
//     last: "20180601174515",
//     season: 0
// });

// database.ref("/task").push({
//     taskname: "Task to do 2",
//     cadence: 744,
//     last: "20180601174515",
//     season: 0
// });

// database.ref("/task").push({
//     propname: "Kumar's House",
// });

// database.ref("/properties").push({
//     propname: "Steve's Estate",
// });

// database.ref("/done").push({
//     property: "Kumar's house",
//     task: "Task to do 1",
//     date: "20180831"
// });

// database.ref("/done").push({
//     property: "Steve's Estate",
//     task: "Task to do 2",
//     date: "20180831"
// });

