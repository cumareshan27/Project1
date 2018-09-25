
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
var houseID;
var houseName;

// var houseName = "1";
var taskDiff;
var taskFreq;
var doneArray = [];


function loadTasks(whichHouse) {
    nextKey = 0;   //this variable was declared in both and had to be zero'd out
    console.log("houseid = " + whichHouse);
    $("#TaskTable").empty();
    $("#DoneTable").empty();

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
                var taskWhere = childSnapshot.val().taskvendor;
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
                                    <td><button class="shopbutton" type="button" id="shop_${taskID}" data-term="${taskTerm}" data-vendor="${taskWhere}" data-next"${taskNext}" data-last="${taskLast}">Shop Now</button></td>
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

                console.log(houseID + " === " + doneProperty);
                if (parseInt(houseID) === parseInt(doneProperty)) {
                    console.log("Found a match! =" + doneTask);
                    var currentDTX = moment().unix();
                    var doneDT = moment(doneDate, "YYYYMMDDHHmmss");
                    var doneDTX = moment(doneDT).unix();
                    var nextDate = (doneDTX + (taskFreq * 3600));
                    if (nextDate > currentDTX) {
                        var moveElement;
                        $("#btn_" + doneTask).prop("disabled", true);
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
}

function shopBB(item) {
    var queryURL = "https://api.bestbuy.com/v1/products("
    var queryOpts = ")?format=json&show=sku,name,longDescription,salePrice,image,addToCartUrl&apiKey=ALmkuUbT4AP1EGu1W3toKALf"
    var searchFor = queryURL + item + queryOpts;
    $.ajax({
        url: searchFor,
        method: "GET"
    }).then(function (response) {

        var imageURL = response.products[0].image;
        var productImage = $("<img>");
        productImage.attr("src", imageURL);
        productImage.attr("alt", "ProductImage");

        var productName = $("<div>")
        var responseArr = [];

        for (var i = 0; i < response.products.length; i++) {
            responseArr.push(response.products[i])
            //console.log("Product Sku:- " + response.products[i].sku);

        }
        //console.log(responseArr);
        // console.log("Product Sku:- " + response.products[0].sku);
        // console.log("Product Name:- " + response.products[0].name);
        // console.log("Product Long Description:- " + response.products[0].longDescription);
        // console.log("Product Sale Price:- " + response.products[0].salePrice);
        // console.log("Product Image:- " + response.products[0].image);
        // console.log("Product URl:- " + response.products[0].addToCartUrl);

        //code to create a string literal to display the products grouped. Retrieving the data from array which holds the responses fro API. 
        for (var i = 0; i < 4; i++) {
            var bigdiv = $("#productArea");
            var productDiv = $(`
                <div id="sku">SKU: ${response.products[i].sku} </div>
                <div id="name">Name: ${response.products[i].name} </div>
                <div id="description">Description:-${response.products[i].longDescription} </div>
                <div id="Price">Price:- ${response.products[i].salePrice}</div>
                <div id="imageArea${i}"><img src="${response.products[i].image}" alt = "Product Image"></div>
                <div><button id="addcart${i}" type="button">Add to Cart</button></div>
            `)
            //Appends the each grouped product into the main DIV("#productArea")
            bigdiv.append(productDiv);
            var cartURL = responseArr[i].addToCartUrl;
            document.getElementById("addcart" + i).onclick = function () {
                location.href = cartURL;
            };
        }
    });
}


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
                    houseID = childSnapshot.val().houseid;
                    houseName = childSnapshot.val().housename;


                    homesArray.push({
                        houseid: houseID,
                        housename: houseName,
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
        loadTasks(nextKey);
    });


    $(document).on("click", "#GoButton", function (event) {
        event.preventDefault();

        var submitText = $("#HomeDropDown option:selected").text();
        console.log(submitText);

        database.ref("/tasks/").on("value", function (snapshotmain) {
            var homesRef = firebase.database().ref('house');
            homesRef.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    houseID = childSnapshot.val().houseid;
                    houseName = childSnapshot.val().housename;

                    homesArray.push({
                        houseid: houseID,
                        housename: houseName,
                    });
                    // console.log(homesArray);
                });
                // console.log(homesArray);
                var result = homesArray.filter(obj => {
                    return obj.housename === submitText
                });
                houseID = result[0].houseid;
            });
        });
        loadTasks(houseID);
    });


    $(document).on("click", ".checkbutton", function (event) {
        var parentElem = $(this).attr('data-parent')
        var btnID = $(this).attr('id');
        moveTableRow = $("#" + parentElem).detach();
        moveTableRow.appendTo("#DoneTable");
        $("#" + btnID).text("✓");
        $("#" + btnID).prop("disabled", true);

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

    $(document).on("click", ".shopbutton", function (event) {
        // var buttonID = $(this).id;
        var searchTerm = $(this).data("term");
        var searchSite = $(this).data("vendor");

    });



});
