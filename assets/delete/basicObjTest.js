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
var doneArray = [];

database.ref("/tasks/").on("value", function (snapshot) {
    /*********************************************************************************************/
    /*It is time to get the records from done "table" - lines
    /*                  and make and array of objects - lines
    /*********************************************************************************************/
    var doneRef = firebase.database().ref('done');
    doneRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            doneID = childSnapshot.val().doneid;
            doneProperty = childSnapshot.val().property;
            doneDate = childSnapshot.val().date;
            doneTask = childSnapshot.val().task;

            doneArray.push({
                homeid: doneID,
                home: doneProperty,
                date: doneDate,
                task: doneTask
            });
        });
        //******************************************************/
        // Behaves as expected - Array of objs with length of 4
        //******************************************************/
        console.log(doneArray);
        console.log(doneArray.length);
        for (i = 0; i < doneArray.length; i++) {
            console.log("record" + i);
            console.log("home" + doneArray[i].home);
            console.log("task" + doneArray[i].task);
            console.log("date" + doneArray[i].date);
            console.log("-----------------");
        }
    });

    //*****************************************************************************************************************/
    // Does not behave as expected - Array looks different but has data and length is 0 so I can't loop through
    //*****************************************************************************************************************/
    // console.log(doneArray);
    // console.log(doneArray.length);
    // for (i = 0; i < doneArray.length; i++) {
    //     console.log("record" + i);
    //     console.log("home" + doneArray[i].home);
    //     console.log("task" + doneArray[i].task);
    //     console.log("date" + doneArray[i].date);
    //     console.log("-----------------");
    // }

});
//*****************************************************************************************************************/
// Does not behave as expected - Array looks different but has data and length is 0 so I can't loop through
//*****************************************************************************************************************/
// console.log(doneArray);
// console.log(doneArray.length);
// for (i = 0; i < doneArray.length; i++) {
//     console.log("record" + i);
//     console.log("home" + doneArray[i].home);
//     console.log("task" + doneArray[i].task);
//     console.log("date" + doneArray[i].date);
//     console.log("-----------------");
// }

