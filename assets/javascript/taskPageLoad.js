

var config = {
    apiKey: "AIzaSyDGCQvFTOuo1UnBrY9DuKuDX0caK-snc_o",
    authDomain: "dbtest-6a1ec.firebaseapp.com",
    databaseURL: "https://dbtest-6a1ec.firebaseio.com",
    projectId: "dbtest-6a1ec",
    storageBucket: "dbtest-6a1ec.appspot.com",
    messagingSenderId: "846174705720"
};

//   ↑ ▲ ▼  ✓   ►
// https://www.alt-codes.net/   


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

//temperature = window.localStorage.getItem("temperature");
//****************************************************************************************************/
// This is the problem with multi-paged sites.  How do I pass the house chosen on the previous page
//****************************************************************************************************/
var houseName = "1";
var taskDiff;
var taskFreq;
var nextKey = 0;
var doneArray = [];


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
                var taskCadence = childSnapshot.val().taskcadence;
                var taskLast = childSnapshot.val().tasklast;
                var taskTerm = childSnapshot.val().taskterm;
                var taskNext = childSnapshot.val().tasknext;
                taskFreq = taskCadence;

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

                //<td><input class="donechkbox" type="checkbox" id="ChkBox_${taskID}"></td>   ✓
                //<td><button class="checkbutton" id="btn_${taskID}">►</button><td>

                var taskLoad = `<tr id="TableTodo_${taskID}">
                                <td><button class="checkbutton" id="btn_${taskID}" data-parent="TableTodo_${taskID}" data-task="${taskID}">►</button><td>
                                <td>${taskName}</td>
                                <td><button class="shopbutton" type="button" id="shop_${taskID}" data-term="${taskTerm}" data-next"${taskNext}" data-last="${taskLast}">Shop Now</button></td>
                                </tr>
                                `
                $("#TaskTable").append(taskLoad);
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
                if (houseName === doneProperty) {
                    console.log("Found a match! =" + doneTask );
                    var currentDTX = moment().unix();
                    var doneDT = moment(doneDate, "YYYYMMDDHHmmss");
                    var doneDTX = moment(doneDT).unix();                    
                    var nextDate = (doneDTX + (taskFreq * 3600));
                    if (nextDate > currentDTX) {
                        var moveElement;
                        $("#btn_" + doneTask).prop("disabled",true);
                        $("#btn_" + doneTask).text("✓");
                        moveElement = $("#TableTodo_" + doneTask).detach();
                        moveElement.appendTo("#DoneTable");
                    }
                }      
                doneArray.push({
                    donetask: doneTask
                });      
            });
            nextKey = (doneArray.length + 1);
        });
    });


    // $(document).on( "change", ".donechkbox", function(event) {
    $(document).on( "click", ".checkbutton", function(event) {
        var parentElem = $(this).attr('data-parent')
        var btnID = $(this).attr('id');
        moveTableRow = $("#" + parentElem).detach();
        moveTableRow.appendTo("#DoneTable");
        $("#" + btnID).text("✓");
        $("#" + btnID).prop("disabled",true);

        //*********************************************************************************************/
        // Compare current task by hours and round - Figure out if its due or not
        //*********************************************************************************************/
        var doneTaskID = $(this).attr('data-task')
        var doneDateTime = moment().format("YYYYMMDDHHmmss");
        var doneKey = nextKey;
        var donepropID = houseName;
        var doneAdd = {
            date: doneDateTime,
            property: donepropID,
            task: doneTaskID
        }
        var doneArr = [doneAdd];


        database.ref("/tasks/").on("value", function (snapshotmain) {
            var doneRef = firebase.database().ref('done');
            doneRef.child(doneKey).set(doneArr[0]);
        });
    });



    $(document).on( "click", ".shopbutton", function(event) {
        //Open API screen
    });




});
