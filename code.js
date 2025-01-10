<script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
 
<style>
        #suggestionsID {
            border: 1px solid #ccc;
            max-height: 300px;
            overflow-y: auto;
            background-color: white;
            border-radius: 8px;
            margin-top: -10px;
            padding: 0;
            position: absolute;
            z-index: 1;
        }
 
        #suggestionsID li {
            list-style-type: none;
            cursor: pointer;
            border: 1px solid #ccc;
            padding: 8px;
        }
 
        /* Style the street name with different colours */
        #suggestionsID li .street-name {
            font-weight: bold;
            color: #7765ff;
        }
 
				 /* Style the remaining text */
        #suggestionsID li .rest-of-text {
            opacity: 0.9;
        }
</style>
<script>
    		/* your mapbox token here */
        mapboxgl.accessToken = 'YOUR TOKEN HERE';
 
        document.addEventListener("DOMContentLoaded", function () {
            const addressInput = document.getElementById("addressInput");
            const suggestionsList = document.getElementById("suggestionsID");
 
            addressInput.addEventListener("input", function () {
                const inputValue = addressInput.value;
                if (!inputValue) {
                    suggestionsList.innerHTML = "";
                    suggestionsList.style.display = "none";
                    return;
                }
 
                // Call a function to update suggestions based on the address.
                updateSuggestions(inputValue);
            });
						// At the end of the fetch request either remove &country=AU for global addresses or replace AU with your country code //
            function updateSuggestions(address) {
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}&country=AU`)
                    .then(response => response.json())
                    .then(data => {
 
                        suggestionsList.innerHTML = "";
 
                        if (data.features.length > 0) {
                            data.features.forEach(feature => {
                                const suggestionItem = document.createElement("li");
 
                                const streetNameSpan = document.createElement("span");
                                streetNameSpan.className = "street-name";
                                streetNameSpan.textContent = feature.place_name.split(',')[0];
 
                                const restOfTextSpan = document.createElement("span");
                                restOfTextSpan.className = "rest-of-text";
                                restOfTextSpan.textContent = feature.place_name.substring(feature.place_name.indexOf(',') + 1);
 
 
                                suggestionItem.appendChild(streetNameSpan);
                                suggestionItem.appendChild(document.createTextNode(', '));
                                suggestionItem.appendChild(restOfTextSpan);
 
                                suggestionItem.addEventListener("click", function () {
                                    addressInput.value = feature.place_name;
                                    suggestionsList.innerHTML = ""; 
                                    suggestionsList.style.display = "none"; 
                                });
 
                                suggestionsList.appendChild(suggestionItem);
                            });
 
                            suggestionsList.style.display = "block";
                        } else {
 
                            suggestionsList.style.display = "none";
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            }
        });
let chloe = document.getElementById("fistme");
console.log("chloe")
// India = IN
// United States = US
// Mexico = MX
// United Kingdom = GB
// China = CN
// New Zealand = NZ
// Australia = AU
// Germany = DE
// Spain = ES
</script>
