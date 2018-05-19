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

	


