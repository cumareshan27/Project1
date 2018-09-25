
/*******************************************************************************************
 * DISABLE ONE CALL OR THE OTHER BEFORE RUNNING TO AVOID HITTING API LIMITS!!!!
 * =========================================================================
 * This section is for current weather.
 *
 *      units = I : convert to Fahrenheit
 *      ip = auto : uses IP address to determine location
 *
 * ****************************************************************************************/


// var apiKey = "18da28e4817e4610a145da23ca77fd26";
// var queryURL = "http://api.weatherbit.io/v2.0/current?units=I&ip=auto&key=18da28e4817e4610a145da23ca77fd26";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
//     console.log("City Name = " + response.data[0].city_name);
//     console.log("Description = " + response.data[0].weather.description);
//     console.log("Snow = " + response.data[0].snow);
//     console.log("Snow Depth = " + response.data[0].snow_depth);
//     console.log("Temperature = " + response.data[0].temp);
//     console.log("Wind Direction = " + response.data[0].wind_cdir);
//     console.log("Wind Speed = " + response.data[0].wind_spd);
//     console.log("Precipitaion = " + response.data[0].precip);
// });



/*******************************************************************************************
 * DISABLE ONE CALL OR THE OTHER BEFORE RUNNING TO AVOID HITTING API LIMITS!!!!
 * =========================================================================
 * This section is for a weather forecast.
 *
 *      units = I : convert to Fahrenheit
 *      days = 7 : how many days to return
 *      ip = auto : uses IP address to determine location
 *
 *   NOTE:  Array element [0] is current day, [1] is tomorrow, etc.
 *          city_name and country_code are in the object, not in any array element
 * ****************************************************************************************/


var apiKey = "18da28e4817e4610a145da23ca77fd26";
var queryURL = "http://api.weatherbit.io/v2.0/forecast/daily?units=I&days=7&ip=auto&key=18da28e4817e4610a145da23ca77fd26";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log("City Name = " + response.city_name);
    console.log("Description = " + response.data[0].weather.description);
    console.log("Precipitaion = " + response.data[0].precip);
    console.log("Snow = " + response.data[0].snow);
    console.log("Snow Depth = " + response.data[0].snow_depth);
    console.log("Temperature = " + response.data[0].temp);
    console.log("Wind Direction = " + response.data[0].wind_cdir);
    console.log("Wind Speed = " + response.data[0].wind_spd);
});


