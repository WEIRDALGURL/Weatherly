function lookupLatLong_Complete(result) {
            var latitude = result.results[0].geometry.location.lat;
            var longitude = result.results[0].geometry.location.lng;
            console.log("The lat and long is " + latitude + ", " + longitude);
        }

        function lookupLatLong(city, state, inputTextZip) {
            // Create the address.
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
            $("#sendZip").on("click", lookupWeatherForPostalCode_Click)
        });