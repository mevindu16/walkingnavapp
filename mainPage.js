'use strict';
// Code for the Main page of the app.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

function viewPath(pathIndex)
{
    // Save the selected path index to local storage so it can be accessed
    // from the Navigate page.
    localStorage.setItem(APP_PREFIX + "-selectedPath", pathIndex);
    // ... and then load the Navigate page.
    location.href = 'navigate.html';
}


// obtaing paths from the local storage 
retrievePaths();

// initializing the HTML outputs
var listOutput ="";

//Generate a list of paths with title and distance and number of turns as a subtitle    
for (var i = 1; i <= listOfPaths.length; i++){
        listOutput += "<li class = \"mdl-list__item mdl-list__item--two-line\"" + "onclick = \"viewPath(" + i + ")\">"
        listOutput += "<span class = \"mdl-list__item-primary-content\">" +"<span>" + listOfPaths[i-1].title + "</span>"
        listOutput += "<span class=\"mdl-list__item-sub-title\">Distance: " + listOfPaths[i-1].distance.toFixed(1) + " m  Turns:"+listOfPaths[i-1].turns+"</span></span></li>"
}

//Adding code to HTML page
document.getElementById("pathsList").innerHTML = listOutput;