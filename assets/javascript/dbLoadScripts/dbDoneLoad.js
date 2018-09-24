


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


var house004task00720180131 = {
    objname: "house004task00720180131",
    doneid: 1,
    property: "house003",
    task: "task007",
    date: "20180131"
}

var house001task00420180831 = {
    objname: "house001task00420180831",
    doneid: 2,
    property: "house001",
    task: "task004",
    date: "20180831"
}

var house002task00620180731 = {
    objname: "house002task00620180731",
    doneid: 3,
    property: "house002",
    task: "task006",
    date: "20180731"
}

var house003task00220180331 = {
    objname: "house003task00220180331",
    doneid: 4,
    property: "house004",
    task: "task010",
    date: "20180331"
}


var doneArr = [house004task00720180131, house001task00420180831, house002task00620180731, house003task00220180331];
for (i = 0; i < doneArr.length; i++) {
    database.ref().child("/done/" + doneArr[i].doneid).set(doneArr[i]);
}
