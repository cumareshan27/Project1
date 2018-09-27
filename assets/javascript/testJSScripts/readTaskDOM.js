
var config = {
    apiKey: "AIzaSyDGCQvFTOuo1UnBrY9DuKuDX0caK-snc_o",
    authDomain: "dbtest-6a1ec.firebaseapp.com",
    databaseURL: "https://dbtest-6a1ec.firebaseio.com",
    projectId: "dbtest-6a1ec",
    storageBucket: "dbtest-6a1ec.appspot.com",
    messagingSenderId: "846174705720"
};

//   ↑ ▲ ▼  ✓   

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

var houseName = "1";
var taskDiff;
var taskFreq;
// var lookupTaskID = "";
// var doneID = "";
// var doneProperty = "";

// var taskID = "";
// var taskName = "";
// var taskCadence = "";
// var taskLast = "";
// var taskSeason = "";
// var taskStatus = "";


$(document).ready(function () {

    database.ref("/tasks/").on("value", function (snapshot) {
        //*********************************************************************************************/
        // Get values from database and assign to the house pulldown
        //*********************************************************************************************/
        var taskRef = firebase.database().ref('tasks');
        taskRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                var taskID = childSnapshot.val().taskid;
                var taskName = childSnapshot.val().taskname;
                var taskCadence = childSnapshot.val().cadence;
                var taskLast = childSnapshot.val().last;
                var taskSeason = childSnapshot.val().season;
                taskFreq = taskCadence;
                // lookupTaskID = taskID;

                var currentDTX = moment().unix();
                //*********************************************************************************************/
                // Get the date of the last time it was performed and convert to Unix time
                //*********************************************************************************************/
                var taskDT = moment(taskLast, "YYYYMMDDHHmmss");
                var taskDTX = moment(taskDT).unix();

                //*********************************************************************************************/
                // Compare current task by hours and round - Figure out if its due or not
                //*********************************************************************************************/
                taskDiff = Math.round((currentDTX - taskDTX) / 3600);

                if (taskDiff <= (taskCadence - 240)) {
                    var taskStatus = "Not yet ready";
                } else if ((taskDiff >= (taskCadence - 240)) & (taskDiff < taskCadence)) {
                    var taskStatus = "Due now";
                } else if (taskDiff > taskCadence) {
                    var taskStatus = "Overdue";
                } else {
                    var taskStatus = "Abort!"
                }

                // var taskDiv = `<button class="checkbox" id="btn_${taskID}">✓</button><span id="span_${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
                // $("body").append(taskDiv);
                var taskDiv = `<div id="div_${taskID}">
                                    <button class="checkbox" id="btn_${taskID}">✓</button><span id="span_${taskID}">  ${taskName}  --  ${taskStatus}</span>
                                </div>`
                $("#TodoDiv").append(taskDiv);

            });
        });

        var doneRef = firebase.database().ref('done');
        doneRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var doneTask = childSnapshot.val().task;
                var doneProperty = childSnapshot.val().property;
                var doneDate = childSnapshot.val().date;
                console.log("----------------")
                // console.log(doneProperty);
                // console.log(doneTask);

                console.log(houseName + " === " + doneProperty);
                // if (houseName === doneProperty) {
                //     console.log("if is true");
                //     var moveElement;
                //     moveElement = $("#div_" + doneTask).detach();
                //     moveElement.appendTo("#DoneDiv");
                //     // $("#span_" + doneTask).remove();
                //     // $("#btn_" + doneTask).remove();    ↑ ▲ ▼  ✓
                //     $("#btn_" + doneTask).text("▲");
                // }
                if (houseName === doneProperty) {
                    var currentDTX = moment().unix();
                    var doneDT = moment(doneDate, "YYYYMMDDHHmmss");
                    var doneDTX = moment(doneDT).unix();                    
                    var nextDate = (doneDTX + (taskFreq * 3600));
                    if (nextDate > currentDTX) {
                        console.log("if is true");
                        console.log("currentDTX = " + currentDTX);
                        console.log("nextDate = " + nextDate);
                        var moveElement;
                        moveElement = $("#div_" + doneTask).detach();
                        moveElement.appendTo("#DoneDiv");
                        // $("#span_" + doneTask).remove();
                        // $("#btn_" + doneTask).remove();    ↑ ▲ ▼  ✓
                        $("#btn_" + doneTask).text("▲");
                    }
                }            
            });
        });



        // if ((doneProperty != houseName) & (doneID != lookupTaskID)) {
        //     console.log("Not Found - Added")
        // }
        // else {
        //     console.log("Found - Skipped")
        // }
        // var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
        // $("body").append(taskDiv);

    });
});
