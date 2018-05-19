'use strict';
// Shared code needed by all pages of the app.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.navigationApp";

// Array of saved Path objects.
var availablePaths = [];
var pathList = [];
var pathNames = [];

// contacting the campus nav web service 
var data = {
	campus:"UCL",
	callback:"storeAvailablePaths"
}
request("https://eng1003.monash/api/campusnav/?campus=ucl&callback=CALLBACK",data);

/*
PATH CLASS

This path class stores the title, location(coordinates), index and could even return the
total distance and number of waypoints(turns) of any given path
*/

class Path {
	constructor(anObject){
		this._title = anObject.title;
		this._locations = []
		for (var i = 0; i < anObject.locations.length; i++){
			this._coords.push(new google.maps.LatLng(anObject.locations[i].lat,anObject.locations[i].lng))
		}
		this._index = anObject.prerecordedRoutesIndex;
	}
	
	// methods 
	get title(){
		return this._title;
	}
	get locations(){
		return this._locations;
	}
	get index(){
		return this._index;
	}
	
	// getting the distance using Google Maps Spherical API
	get distance(){
		return(google.maps.geometry.spherical.computeLength(this._locations))
	}
	
	get tutns(){
		return (this._locations.length) - 2
	}
}

/* 
request Function
	This function requests a JSON from a URL specified and calls back
*/
function request(url,data){
	// building URL parameters for each key in data object
	var parameters = "";
	for (var key in data){
		if (data.hasOwnProperty(key)){
			if (parameters.length == 0){
				parameters += "?";
			} else {
				parameters += "&";
			}
			var encodedKey = encodeURIComponent(key);
			var encodedValue = encodeURIComponent(data[key]);
			
			// combining the keys and values 
			parameters += encodedKey + "=" + encodedValue;
		}
	}
	var script = document.createElement('script');
	sccript.src = url + parameters;
	document.body.appendChild(script);
}



	
	
	
		
		

	


