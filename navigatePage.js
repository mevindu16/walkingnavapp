'use strict';
// Code for the Navigate page.

// The following is sample code to demonstrate navigation between pages of the
// app.  You need can replace this in your final app.

var pathIndex = localStorage.getItem(APP_PREFIX + "-selectedPath");

if (pathIndex !== null){
    // the header bar shows the name of the path that the user has clicked on
    document.getElementById("headerBarTitle").textContent = pathNames[pathIndex-1];
}

// declaring variables that are required 
//referincing the outputs
var outputHTML = {    
    map: document.getElementById("map"),
    userAction: document.getElementById("userAction"),
    destinationDistance: document.getElementById("destinationDistance"),
    image: document.getElementById("image"),
    averageSpeed: document.getElementById("averageSpeed"),
    eta:document.getElementById("eta")
}


//path selected 
var pathSelected = listOfPaths[pathIndex - 1];

//Tracking user travel 
var userTravel={
    locationHistory:[],
    distance:0,
    initTime: new Date().getTime(),
    totalTime:0,
    speed:0
    
};
//Tracking current location
var currentLocation={
    location:{
        lat:0,
        lng:0
    },
    heading:0,
    accuracy:0
}

//Updates for the Map
var mapUpdates={
    map:null,
    pointer: null,
    accuracy: null
}
//Next Way Point info
var wayPoint={
    index:0,
    distance:currentLocation.accuracy+1,
    direction: 0    
}
// Whole Path info
var wholePath={
    distance:currentLocation.accuracy+1,
    remainingTime:0
}

//FUNCTIONS MADE
/*
initMap FUNCTION
    initializes the map with a marker along with an accuracy radius. It also
includes the path to the desired location
    this function has access to global variables, in order to update them
*/
function initMap(){
    // initializing the map based on current location
    mapUpdates.map = new google.maps.Map(outputHTML.map, {center: currentLocation.location, zoom: 20});
    
    // displaying the accuracy radius, centered at user's current location
    mapUpdates.accuracy = new google.maps.Circle({
        strokeColor: "#850000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#850000",
        fillOpacity: 0.3,
        map: mapUpdates.map,
        center: currentLocation.location,
        radius: currentLocation.accuracy });
        
    // marker showing user's current location 
    mapUpdates.marker = new google.maps.Marker({
        position: currentLocation.location,
        icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            scale: 10,
            anchor: new google.maps.Point(0, 3),
            rotation: 0,
            fillColor: "#20B2AA",
            strokeWeight: 3,
            fillOpacity: 1
        },
        map: mapUpdates.map
        })
        
    //Displaying the path
    mapUpdates.polyLine=new google.maps.Polyline({
        path: selectedPath.locations,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2.5,
        map: mapUpdates.map
    })     
}
    
    