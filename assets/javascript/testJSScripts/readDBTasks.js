
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
var houseName = "4";
var lookupTaskID = "";
var doneID = "";
var doneProperty = "";

var taskID = "";
var taskName = "";
var taskCadence = "";
var taskLast = "";
var taskSeason = "";
var taskStatus = "";


$(document).ready(function () {

    database.ref("/tasks/").on("value", function (snapshot) {
        //*********************************************************************************************/
        // Get values from database and assign to the house pulldown
        //*********************************************************************************************/
        var taskRef = firebase.database().ref('tasks');
        taskRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                taskID = childSnapshot.val().taskid;
                taskName = childSnapshot.val().taskname;
                taskCadence = childSnapshot.val().cadence;
                taskLast = childSnapshot.val().last;
                taskSeason = childSnapshot.val().season;
                lookupTaskID = taskID;

                var currentDTX = moment().unix();
                //*********************************************************************************************/
                // Get the date of the last time it was performed and convert to Unix time
                //*********************************************************************************************/
                var taskDT = moment(taskLast, "YYYYMMDDHHmmss");
                var taskDTX = moment(taskDT).unix();

                //*********************************************************************************************/
                // Compare current task by hours and round - Figure out if its due or not
                //*********************************************************************************************/
                var taskDiff = Math.round((currentDTX - taskDTX) / 3600);
                if (taskDiff <= (taskCadence - 240)) {
                    var taskStatus = "Not yet ready";
                }
                else if ((taskDiff >= (taskCadence - 240)) & (taskDiff < taskCadence)) {
                    var taskStatus = "Due now";
                }
                else if (taskDiff > taskCadence) {
                    var taskStatus = "Overdue";
                }
                else {
                    var taskStatus = "Abort!"
                }

                // var doneRef = firebase.database().ref('done');
                // doneRef.once('value', function (snapshot) {
                //     snapshot.forEach(function (childSnapshot) {
                //         doneID = childSnapshot.val().task;
                //         doneProperty = childSnapshot.val().property;
                //         console.log(doneProperty + " === " + houseName);
                //         console.log(doneID + " ==== " + lookupTaskID);



                        // if ((doneProperty === houseName) & (doneID === lookupTaskID)) {
                        //     console.log("Found - Skipped")
                        // }
                        // else {
                            console.log("Not Found - Added")
                            var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
                            $("body").append(taskDiv);
                        // }

                //     });
                // });

                        // if ((doneProperty === houseName) & (doneID === lookupTaskID)) {
                        //     console.log("Found - Skipped")
                        // }
                        // else {
                        //     console.log("Not Found - Added")
                            // var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
                            // $("body").append(taskDiv);
                        // }



                // var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
                // $("body").append(taskDiv);

            });
        });

        var doneRef = firebase.database().ref('done');
        doneRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                doneID = childSnapshot.val().task;
                doneProperty = childSnapshot.val().property;
                console.log(doneProperty + " === " + houseName);
                console.log(doneID + " ==== " + lookupTaskID);
            });
        });



        // if ((doneProperty != houseName) & (doneID != lookupTaskID)) {
        //     console.log("Not Found - Added")
        // }
        // else {
        //     console.log("Found - Skipped")
        // }
        var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
        $("body").append(taskDiv);

    });
});



                // var doneRef = firebase.database().ref('done');
                // doneRef.once('value', function (snapshot) {
                //     snapshot.forEach(function (childSnapshot) {

                //         var doneID = childSnapshot.val().task;
                //         var doneProperty = childSnapshot.val().property;

                //         if ((doneProperty === houseName) & (doneID === lookupTaskID)) {
                //             console.log("found")
                //         } 
                //         else {
                //             console.log("not found")
                //         }
                //     });


    // database.ref("/done/").on("value", function (snapshot) {
        //*********************************************************************************************/
        // Get values from database and assign to the house pulldown
        //*********************************************************************************************/
    //     var doneRef = firebase.database().ref('done');
    //     doneRef.once('value', function (snapshot) {
    //         snapshot.forEach(function (childSnapshot) {

    //             if (childSnapshot.data.child(task004).exists()) {
    //                 console.log("found")
    //             } else {
    //                 console.log("not found")
    //             }
    //         });
    //     });
    // });


    //             var doneProperty = childSnapshot.val().property;
    //             var doneTask = childSnapshot.val().task;


    //             var currentDTX = moment().unix();
    //             //*********************************************************************************************/
    //             // Get the date of the last time it was performed and convert to Unix time
    //             //*********************************************************************************************/
    //             var taskDT = moment(taskLast, "YYYYMMDDHHmmss");
    //             var taskDTX = moment(taskDT).unix();

    //             //*********************************************************************************************/
    //             // Compare current task by hours and round - Figure out if its due or not
    //             //*********************************************************************************************/
    //             var taskDiff = Math.round((currentDTX - taskDTX) / 3600);
    //             if (taskDiff <= (taskCadence - 240)) {
    //                 var taskStatus = "Not yet ready";
    //             }
    //             else if ((taskDiff >= (taskCadence - 240)) & (taskDiff < taskCadence)) {
    //                 var taskStatus = "Due now";
    //             }
    //             else if (taskDiff > taskCadence) {
    //                 var taskStatus = "Overdue";
    //             }
    //             else {
    //                 var taskStatus = "Abort!"
    //             }

    //             var taskDiv = `<button class="checkbox">✓</button><span id="${taskID}">  ${taskName}  --  ${taskStatus}</span><br>`
    //             $("body").append(taskDiv);
    //         });
    //     });
    // });

// });




// });


