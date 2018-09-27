
var config = {
    apiKey: "AIzaSyDGCQvFTOuo1UnBrY9DuKuDX0caK-snc_o",
    authDomain: "dbtest-6a1ec.firebaseapp.com",
    databaseURL: "https://dbtest-6a1ec.firebaseio.com",
    projectId: "dbtest-6a1ec",
    storageBucket: "dbtest-6a1ec.appspot.com",
    messagingSenderId: "846174705720"
};

/*********************************************************************************************/
/*Config below used for final app, not for testing in my branch
/*********************************************************************************************/
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


/*********************************************************************************************/
/*Define a bunch of global variables because scope is an issue with 2 DB operations
/*********************************************************************************************/
var houseNumber = "4";
// var lookupTaskID = "";
var include = true;
var objectCountDone = 0;
var objectCountTask = 0;

var doneID = "";
var doneProperty = "";
var doneDate = "";
var doneTask = "";
var doneArray = [];

var taskID = "";
var taskName = "";
var taskCadence = "";
var taskLast = "";
var taskSeason = "";
var taskStatus = "";
var taskArray = [];



$(document).ready(function () {

    database.ref("/tasks/").on("value", function (snapshot) {
        /*********************************************************************************************/
        /*It is time to get the records from done "table" - lines
        /*                  and make and array of objects - lines
        /*********************************************************************************************/
        var doneRef = firebase.database().ref('done');
        doneRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                doneID = childSnapshot.val().task;
                doneProperty = childSnapshot.val().property;
                doneDate = childSnapshot.val().date;
                doneTask = childSnapshot.val().task;
                console.log(doneArray);                

                doneArray.push({
                    homeid: doneID,
                    home: doneProperty,
                    date: doneDate,
                    task: doneTask
                });
            });

            /*********************************************************************************************/
            /*Count objects in the array because .length always returns 0
            /*********************************************************************************************/
            doneArray.forEach(function (itm) {
                if (!itm.__proto__.__proto__) {
                    objectCountDone++;
                }
                console.log("objectCountDone in Done section = " + objectCountDone);
            });
        });
        console.log("line 85");
        console.log(doneArray);
        console.log(doneArray.length);


        /*********************************************************************************************/
        /*Now it is time to get the tasks - lines 79-88
        /*            see if they are due - lines 90 -120
        /*   see if they are already done - lines 
        /*********************************************************************************************/
        var taskRef = firebase.database().ref('tasks');
        taskRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // console.log(doneArray);
                taskID = childSnapshot.val().taskid;
                taskName = childSnapshot.val().taskname;
                taskCadence = childSnapshot.val().cadence;
                // taskLast = childSnapshot.val().last;
                // taskSeason = childSnapshot.val().season;
                // lookupTaskID = taskID;

                taskArray.push({
                    taskid: taskID,
                    cadence: taskCadence,
                    taskname: taskName
                });
            });
            /*********************************************************************************************/
            /*Count objects in the array because .length always returns 0
            /*********************************************************************************************/
            taskArray.forEach(function (itm) {
                if (!itm.__proto__.__proto__) {
                    objectCountTask++;
                }
                console.log("objectCountTask in Task section = " + objectCountTask);
            });
        // });

        // console.log("line 123");

        // taskArray.forEach(function (itm) {
            var currentDTX = moment().unix();
            /*********************************************************************************************/
            /*Get the date of the last time it was performed and convert to Unix time
            /*********************************************************************************************/
            var taskDT = moment(taskLast, "YYYYMMDDHHmmss");
            var taskDTX = moment(taskDT).unix();
            console.log("line 132");

            /*********************************************************************************************/
            /*Compare current task by hours and round result - lines
            /*                  Figure out if its due or not - lines
            /*********************************************************************************************/
            var taskDiff = Math.round((currentDTX - taskDTX) / 3600);
            if (taskDiff <= (taskCadence - 240)) {
                taskStatus = "Not yet ready";
                include = true;
                console.log(taskStatus);
            }
            else if ((taskDiff >= (taskCadence - 240)) & (taskDiff < taskCadence)) {
                taskStatus = "Due now";
                include = true;
                console.log(taskStatus);
            }
            else if (taskDiff > taskCadence) {
                taskStatus = "Overdue";
                include = true;
                console.log(taskStatus);
            }
            else {
                taskStatus = "Abort!"
                include = false;
                console.log(taskStatus);
            }
            console.log("line 159");

            /*********************************************************************************************/
            /*Compare current task by hours and round result - lines
            /*                  Figure out if its due or not - lines
            /*********************************************************************************************/
            console.log("outside for for loop");
            console.log(doneArray);
            console.log(doneArray.length);
            console.log("objectCountDone in task section = " + objectCountDone);
            for (i = 0; i < objectCountDone; i++) {
                console.log("in for loop");
                var compareHome = doneArray[i].home;
                var compareTask = doneArray[i].task;
                console.log("compareHome = " + compareHome + "      houseNumber = " + houseNumber);
                console.log("compareTask = " + compareTask + "      doneTask = " + doneTask);
                if ((compareHome === houseNumber) & (compareTask === doneTask)) {
                    include = false;
                }
                console.log("compareDate = " + compareDate + "      calc = " + (currentDTX - taskCadence));
                if ((compareDate > (currentDTX - taskCadence))) {
                    include = false;
                }
                console.log("include = " + include);
                if (include) {
                    var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
                    $("body").append(taskDiv);
                }
            }
            console.log("line 188");
        });
    });
});
