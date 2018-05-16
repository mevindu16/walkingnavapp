'use strict';
// Code for the Navigate page.

// The following is sample code to demonstrate navigation between pages of the
// app.  You need can replace this in your final app.

var pathIndex = localStorage.getItem(APP_PREFIX + "-selectedPath");
if (pathIndex !== null)
{
    // If a path index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the path being navigated
    var pathNames = [ "Path A", "Path B" ];
    document.getElementById("headerBarTitle").textContent = pathNames[pathIndex];
}
