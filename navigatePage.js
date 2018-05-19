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
var travel={
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
//Information about next waypoint
var wayPoint={
    index:0,
    distance:currentLocation.accuracy+1,
    direction: 0    
}
//Information about the whole path
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
    
/*
initLocation FUNCTION
    this functions sets up location accuracies required foor the app to run 
and it also uses watchPostion to update the users location
    this function has access to global variables
    functions linked to initLocation are: showCurrentLocation, errorHandler 
and positionOptions
*/
function initLocation(){
    var positionOptions = {
        enableHighAccuracy: true,
        timeout: infinty,
        maximumAge:0};
        
    if (navigator.geolocation){
        navigator.geolocation.watchPosition(showCurrentLocation,errorHandle,positionOptions);
    }else{
        //alerting user if not available
        alert("GPS sensor not available!");
        return;
    }
}

/*
errorHandle FUNCTION
    this function handles errors and gives suitable outputs if thet occur
*/
function errorHandle(error) {
    var errorMessage = "";
    if (error.code == 1) {
        errorMessage = "Location access denied by user.";
    } else if (error.code == 2) {
        errorMessage = "Location unavailable.";
    } else if (error.code == 3) {
        errorMessage = "Location access timed out";
    } else {
        errorMessage = "Unknown error getting location.";
    }
    alert(errorMessage);
}

/*
showCurrentLocation FUNCTION
    this function obtains the user's current locations and updates them 
each time the user's location changes.
    this function also makes use of headingUpdate and displayUpdate functions
*/

function showCurrentPosition(){
    currentLocation = {
        location: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        accuracy: position.coords.accuracy,
        time: position.timestamp
        };
        
        if (travel.locationHistory.length >= 1){
            currentLocation.heading=google.maps.geometry.spherical.computeHeading(userTravel.locationHistory[userTravel.locationHistory.length-1],currentLocation.location)
        }
        
        //user travel updates
        travel.locationHistory.push(currentLocation.location);
        
        // tracking user's travel 
        travel.totalTime = (currentLocation.time - travel.initTime)/1000;
        
        //distance travelled 
        travel.distance=google.maps.geometry.spherical.computeLength(travel.locationHistory);
            
        //travelling speed
        travel.speed = travel.distance / travel.totalTime;
        
        headingUpdate(); displayUpdate();
        
        
        
}



    
    