
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

$(document).ready(function () {

    var pullDown = `
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="HomeDrop" data-toggle="dropdown">
        Select a Home
        </button>
        <div class="dropdown-menu" id="Droptions">
        </div>
    </div>`
    $("body").append(pullDown);


    database.ref("/homes/").on("value", function (snapshot) {
        //*********************************************************************************************/
        // Get values from database and assign to the house pulldown
        //*********************************************************************************************/
        var homesRef = firebase.database().ref('homes');
        homesRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var homeName = childSnapshot.val().housename;
                var dropInsert = `<a class="dropdown-item" data-value="${homeName}" href="#">${homeName}</a>`
                $("#Droptions").append(dropInsert);
            });
        });
    });

});


