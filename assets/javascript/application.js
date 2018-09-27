
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
var homesArray = [];
var addIt = true;
var nextKey = 0;
var nextHomeKey = 0;
var houseID;
var houseName;
var taskDiff;
var taskFreq;
var doneArray = [];
var homeValidation = [];
var insertHouse = false;


//*********************************************************************************************/
// Define the function to load tasks based on the property selected/created
//*********************************************************************************************/
function loadTasks(whichHouse) {
    nextKey = 0;
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


                var taskLoad = `<tr id="TableTodo_${taskID}">
                                    <td><button class="checkbutton" id="btn_${taskID}" data-parent="TableTodo_${taskID}" data-task="${taskID}">►</button><td>
                                    <td class="HomeTask">${taskName}</td>
                                    <td><button class="shopbutton" type="button" id="shop_${taskID}" data-term="${taskTerm}" data-vendor="${taskWhere}" data-next"${taskNext}" data-last="${taskLast}">Shop Now</button></td>
                                    </tr>
                                    `
                // $("#TaskRecords tr:first").after().append(taskload);
                $("#TaskTable").append(taskLoad);
            });
        });

        var doneRef = firebase.database().ref('done');
        doneRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var doneTask = childSnapshot.val().task;
                var doneProperty = childSnapshot.val().property;
                var doneDate = childSnapshot.val().date;

                if (parseInt(houseID) === parseInt(doneProperty)) {
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

//*********************************************************************************************/
// Define the function to shop Walmart for selected items
//*********************************************************************************************/
function shopWM(item) {

    var queryURL = "https://cors.io/?http://api.walmartlabs.com/v1/search?apiKey=ncprrc5qq4kqukxgnpjn69b2&query="
    var searchFor = queryURL + item;
    $.ajax({
        url: searchFor,
        method: "GET"
    }).then(function (response) {

        response = JSON.parse(response);

        var imageURL = response.items[0].mediumImage;
        var productImage = $("<img>");
        productImage.attr("src", imageURL);
        productImage.attr("alt", "ProductImage");

        var productName = $("<div>")
        var responseArr = [];

        for (var i = 0; i < response.items.length; i++) {
            responseArr.push(response.items[i])


        }
        $('#productArea').empty();
        for (var i = 0; i < 4; i++) {
            var bigdiv = $("#productArea");
            var productDiv = $(`
                <div class="ItemDetails">
                <div id="name">Name: ${response.items[i].name} </div>
                <div id="description">Description:-${response.items[i].shortDescription} </div>
                <div id="Price">Price:- ${response.items[i].salePrice}</div>
                <div id="imageArea${i}"><img src="${response.items[i].mediumImage}" alt = "Product Image"></div>
                <p></p>
                <div><button id="addcart${i}" type="button">Add to Cart</button></div>
                </div>
            `)
            //*********************************************************************************************/
            //Appends the each groped product into the main DIV("#productArea")
            //*********************************************************************************************/
            bigdiv.append(productDiv);
            var cartURL = responseArr[i].addToCartUrl;
            document.getElementById("addcart" + i).onclick = function () {
                location.href = cartURL;
            };
        }

    });
}

//*********************************************************************************************/
// Define the function to shop Best Buy for selected items
//*********************************************************************************************/
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
        }

        //*********************************************************************************************/
        //code to create a string literal to display the products grouped. Retrieving the data from array which holds the responses fro API. 
        //*********************************************************************************************/
        $('#productArea').empty();
        for (var i = 0; i < 4; i++) {
            var bigdiv = $("#productArea");
            var productDiv = $(`
                <div class="ItemDetails">
                <div id="sku">SKU: ${response.products[i].sku} </div>
                <div id="name">Name: ${response.products[i].name} </div>
                <p class="description">Description:-${response.products[i].longDescription} </p>
                <div id="Price">Price:- ${response.products[i].salePrice}</div>
                <div id="imageArea${i}"><img src="${response.products[i].image}" alt = "Product Image" height="300" width="300"></div>
                <p></p>
                <div><button id="addcart${i}" type="button">Add to Cart</button></div>
                </div>            `)
            //*********************************************************************************************/
            //Appends the each grouped product into the main DIV("#productArea")
            //*********************************************************************************************/
            bigdiv.append(productDiv);
            shave('p', 50);
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
                $("#HomeDropDown").append(dropInsert);
            });
        });
    });

    //*********************************************************************************************/
    // Allow for the creation of a new property
    //*********************************************************************************************/
    $("#AddHouseBtn").on("click", function (event) {
        // event.preventDefault();

        var submitText = $("#HomeInput").val().trim();
        $('#TaskHomeDiv').css('display', 'inline-block');
        $('#DoneHomeDiv').css('display', 'inline-block');

        database.ref("/tasks/").on("value", function (snapshotmain) {
            var homesRef = firebase.database().ref('house');
            homesRef.once('value').then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    houseID = childSnapshot.val().houseid;
                    houseName = childSnapshot.val().housename;

                    homesArray.push({
                        houseid: houseID,
                        housename: houseName,
                    });
                });
                //*********************************************************************************************/
                // Make sure the home doesn't already exist 
                //*********************************************************************************************/
                homeValidation = homesArray.filter(obj => {
                    return obj.housename === submitText
                });

                if (homeValidation.length === 0) {
                    insertHouse = true;
                }
                else {
                    insertHouse = false;
                    $("#HomeInput").val("Exists - Choose another");
                }

                //*************************************************************************/
                //*  Push new house to database
                //*************************************************************************/
                if (insertHouse === true) {
                    nextHomeKey = parseInt(homesArray.length) + 1;
                    var houseAdd = {
                        houseid: parseInt(nextHomeKey),
                        housename: submitText,
                    }
                    var houseArr = [houseAdd];
                    homesRef.child(submitText).set(houseArr[0]);
                    $("#HomeInput").val("");
                    loadTasks(nextHomeKey);
                }
            });
        });
    });


    //*********************************************************************************************/
    // Use the house selected from the dropdown
    //*********************************************************************************************/
    $(document).on("click", "#GoButton", function (event) {
        event.preventDefault();

        var submitText = $("#HomeDropDown option:selected").text();
        $('#TaskHomeDiv').css('display', 'inline-block');
        $('#DoneHomeDiv').css('display', 'inline-block');

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
                //*********************************************************************************************/
                // Get the key value for the selected house
                //*********************************************************************************************/
                var result = homesArray.filter(obj => {
                    return obj.housename === submitText
                });
                houseID = result[0].houseid;
            });
        });
        loadTasks(houseID);
    });


    //*********************************************************************************************/
    // Process the action of completing a task and checking it off
    //*********************************************************************************************/
    $(document).on("click", ".checkbutton", function (event) {
        var parentElem = $(this).attr('data-parent')
        var btnID = $(this).attr('id');
        moveTableRow = $("#" + parentElem).detach();
        moveTableRow.appendTo("#DoneTable");
        $("#" + btnID).text("✓");
        $("#" + btnID).prop("disabled", true);

        //*********************************************************************************************/
        // Compare current task by hours and round off - Figure out if its due again or not
        //*********************************************************************************************/
        var doneTaskID = $(this).attr('data-task')
        var doneDateTime = moment().format("YYYYMMDDHHmmss");
        var doneKey = nextKey;
        var donepropID = houseID;
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
        nextKey++;
    });

    //*********************************************************************************************/
    // If they click the shop button
    //*********************************************************************************************/
    $(document).on("click", ".shopbutton", function (event) {
        // var buttonID = $(this).id;
        var searchValue = $(this).data("term");
        var searchSite = $(this).data("vendor");

        $('#ShopArea').css('display', 'inline-block');

        //*********************************************************************************************/
        // If the object is a Best Buy search, build the relevant search string
        //*********************************************************************************************/
        if (searchSite === "B") {
            console.log("Best Buy Selected");
            var words = searchValue.split(' ');
            if (words.length >= 3) {
                var searchTerm = "search=" + words[0] + "&search=" + words[1] + "&search=" + words[2];
            }
            else if (words.length === 2) {
                var searchTerm = "search=" + words[0] + "&search=" + words[1];
            }
            else if (words.length === 1) {
                var searchTerm = "search=" + words[0];
            }
            else {
                console.log("Got big problems here!");
            }
            shopBB(searchTerm);
        }

        //*********************************************************************************************/
        // If the object is a Walmart search, build the relevant search string
        //*********************************************************************************************/
        if (searchSite === "W") {
            console.log("Walmart Selected");
            var searchTerm = searchValue;
            shopWM(searchTerm);
        }
    });



});
