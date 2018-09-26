
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
var homesArray = [];
var addIt = true;
var nextKey = 0;

$(document).ready(function () {

     database.ref("/homes/").on("value", function (snapshot) {
        //*********************************************************************************************/
        // Get values from database and assign to the house pulldown
        //*********************************************************************************************/
        var homesRef = firebase.database().ref('house');
        homesRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var homeName = childSnapshot.val().housename;
                var dropInsert = `<option value="Home data-value="${homeName}">${homeName}</option>`
                // var dropInsert = `<a class="dropdown-item" data-value="${homeName}" href="#">${homeName}</a>`
                $("#HomeDropDown").append(dropInsert);
            });
        });
    });

    $("#AddHouseBtn").on("click", function (event) {
        event.preventDefault();

        var submitText = $("#HomeInput").val().trim();

        database.ref("/tasks/").on("value", function (snapshotmain) {
            var homesRef = firebase.database().ref('house');
            homesRef.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var homeID = childSnapshot.val().houseid;
                    var homeName = childSnapshot.val().houseName;

                    homesArray.push({
                        homeID: homeID,
                        homeName: homeName,
                    });
                });
                nextKey = (homesArray.length + 1);
            });

            //*************************************************************************/
            //*  Push new house to database
            //*************************************************************************/
            var houseAdd = {
                houseid: nextKey,
                housename: submitText,
            }
            var houseArr = [houseAdd];
            homesRef.child(submitText).set(houseArr[0]);
        });
    });

    // $("#GoButton").click(function(){
    //     console.log("button clicked");
    //     //this will find the selected website from the dropdown
    //     var selectedHome = $("#HomeDropDown").find(":selected").val();
        
    //     //this will redirect us in same window
    //     var newLocation = "task.html/?houseinquestion="+selectedHome;
    //     console.log("newLocation = " + newLocation);
    //     document.location.href = newLocation;
    //  });
    

    // $("#GoButton").on("click", function (event) {
    //     event.preventDefault();
    //     console.log("button clicked");
    //     var homevalue = 1;
    //     window.localStorage.setItem("homevalue", homevalue);
    //     window.location.href = "../task.html"; break;
    // });

});
