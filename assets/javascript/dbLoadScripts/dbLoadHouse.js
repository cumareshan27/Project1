

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


var house1 = {
    houseid: 1,
    housename: "Kumar's House",
}

var house2 = {
    houseid: 2,
    housename: "Joe's House",
}

var house3 = {
    houseid: 3,
    housename: "Suraj's House",
}

var house4 = {
    houseid: 4,
    housename: "Steve's House",
}

var houseArr = [house1, house2, house3, house4];
for (i = 0; i < houseArr.length; i++) {
    database.ref().child("/house/" + houseArr[i].housename).set(houseArr[i]);
}

