

var loc;
var temp;
var summary;
var minTemp;
var rainChance;
var maxTemp;
var icon;
var time;
var locationName;

function lookupLatLong_Complete(result) {
            var latitude = result.results[0].geometry.location.lat;
            var longitude = result.results[0].geometry.location.lng;
            locationName = result.results[0].address_components[1].long_name+","+
                               result.results[0].address_components[2].short_name;               
            console.log("The lat and long is " + latitude + ", " + longitude);
            console.log("The location is " + locationName);
            getWeather(latitude, longitude);
        }

function getWeather_Complete(result) {
    var data = {
    temp : result.currently.temperature,
    summary : result.currently.summary,
    rainChance : result.currently.precipProbability,
    icon : result.currently.icon,
    minTemp : result.daily.data[0].temperatureMin,
    maxTemp : result.daily.data[0].temperatureMax,
};
console.log("This is the weather info " + temp+ "," + summary+ "," +rainChance+ "," +icon+ ","+minTemp+ "," +maxTemp);

}        


function getWeather(latitude, longitude){
            var DarkskyUrl = "https://api.darksky.net/forecast/cbd31f8cd1b7e93ea299715eddb44f5e/" +latitude+ "," +longitude+"";
            
            var weather = {
                url: DarkskyUrl,
                dataType: "jsonp",
                success: getWeather_Complete,


            };

            $.ajax(weather);

                sendRequest(DarkskyUrl)

function sendRequest(DarkskyUrl){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.loc = data.weather[0].id;
	    weather.temp = data.currently.temperature;
	    weather.summary = data.currently.summary;
	    weather.minTemp = data.daily.data[0].temperatureMin;
	    weather.rainChance = data.currently.precipProbability;
	    weather.maxTemp = data.daily.data[0].temperatureMax;	

	    update(weather);
	}
    };

    xmlhttp.open("GET", DarkskyUrl, true);
    xmlhttp.send();    
}
}
 function lookupLatLong(city, state, inputTextZip) {
            var address = "";
            if (inputTextZip.length != 0) {
                address = inputTextZip.trim();
            }
            else if (city.length != 0 && state != 0) {
                address = city.trim() + ", " + state;
            }
            else {
                return; // they didn't give me anything valid, so exit
            }

            var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";

            var request = {
                url: googleUrl,
                success: lookupLatLong_Complete
            };

            $.ajax(request);

        }


        function lookupWeatherForPostalCode_Click() {
            var zipCode = $("#inputTextZip").val();
            lookupLatLong("", "", zipCode);
        }

        $(function() {
            $("#sendZip").on("click", lookupWeatherForPostalCode_Click);

        });

function update(weather) {
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    summary.innerHTML = weather.summary;
    minTemp.innerHTML = weather.minTemp;
    rainChance.innerHTML = weather.rainChance;
    maxTemp.innerHTML = weather.maxTemp;
}

$(function() {
    loc = document.getElementById("location");
    temp = document.getElementById("temp");
    summary = document.getElementById("summary");
    minTemp = document.getElementById("mintemp");
    rainChance = document.getElementById("precipitation");
    maxTemp = document.getElementById("maxtemp");


var weather = {};
// weather.loc = "Prestonsburg, Ky";
// weather.temp = "87";
// weather.summary = "Rainy";
// weather.minTemp = "56";
// weather.rainChance = "27";
// weather.maxTemp = "72";

// update(weather);

});
