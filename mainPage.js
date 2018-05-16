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
