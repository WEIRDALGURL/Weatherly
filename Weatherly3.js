var idNum = 0;
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
    locationName = result.results[0].address_components[1].long_name + "," +
        result.results[0].address_components[2].short_name;
    console.log("The lat and long is " + latitude + ", " + longitude);
    console.log("The location is " + locationName);
    getWeather(latitude, longitude);
}

function getWeather_Complete(result) {
    var weather = {}      
        weather.loc = locationName,
        weather.temp = Math.round(result.currently.temperature),
        weather.summary = result.currently.summary,
        weather.rainChance = percent(result.currently.precipProbability),
        weather.icon = result.currently.icon,
        weather.minTemp = Math.round(result.daily.data[0].temperatureMin),
        weather.maxTemp = Math.round(result.daily.data[0].temperatureMax),

        update(weather);

    console.log("This is the weather info " + weather.temp+ "," + weather.summary + "," + weather.rainChance + "," + weather.icon + "," + weather.minTemp + "," + weather.maxTemp);
    // }   

function percent(p){
    return p*100;
}

  var template = $(".template").html();
  template = template.replace("@@IDNUM@@", idNum);
  template = template.replace("@@LOCATION@@", weather.loc);
  template = template.replace("@@TEMPERATURE@@", weather.temp);
  template = template.replace("@@SUMMARY@@", weather.summary);
  template = template.replace("@@MINTEMP@@", weather.minTemp);
  template = template.replace("@@RAINCHANCE@@", weather.rainChance);
  template = template.replace("@@MAXTEMP@@", weather.maxTemp);
  $(".container").append(template);

       }  

  idNum++;


function getWeather(latitude, longitude) {
    var DarkskyUrl = "https://api.darksky.net/forecast/cbd31f8cd1b7e93ea299715eddb44f5e/" + latitude + "," + longitude;

    var weatherInfo = {
        url: DarkskyUrl,
        dataType: "jsonp",
        success: getWeather_Complete,

    };
$.ajax(weatherInfo);
}

function lookupLatLong(city, state, zipcode) {
    var address = "";
    if (zipcode.length != 0) {
        address = zipcode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }

    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";
    $.ajax({
        url: googleUrl,
        success: lookupLatLong_Complete
    });
}


function lookupWeatherForPostalCode_Click() {
    var zipCode = $("#inputTextZip").val();
    lookupLatLong("", "", zipCode);
}

$(function () {
    $("#sendZip").on("click", lookupWeatherForPostalCode_Click);

});
  function update(weather) {
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    summary.innerHTML = weather.summary;
    minTemp.innerHTML = weather.minTemp;
    rainChance.innerHTML = weather.rainChance;
    maxTemp.innerHTML = weather.maxTemp;
    icon.src = "Images/" + weather.icon + ".jpg";

}

$(function () {
    loc = document.getElementById("location");
    temp = document.getElementById("temp");
    summary = document.getElementById("summary");
    minTemp = document.getElementById("mintemp");
    rainChance = document.getElementById("precipitation");
    maxTemp = document.getElementById("maxtemp");
    icon = document.getElementById("icon");


});
