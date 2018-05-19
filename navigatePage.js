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



