// Define translations
var tableHeaders = {
	'en': {
		'date' : 'Date',
		'meal' : 'Meal',
		'menu' : 'Menu'
	},
	'sv': {
		'date' : 'Datum',
		'meal' : 'Måltid',
		'menu' : 'Meny'
	}
};

// Get script tag that includes the widget javascript file
var scriptTag = document.getElementById('openMealWidgetScript');
if (scriptTag == null){	
	throw new Error('The script tag including the Open Meal widget.js does not have the id "openMealWidgetScript"');
}

// Get the id's of the divs that should be populated with the menu data
var widgetDivs = scriptTag.dataset.widgets;
if (widgetDivs == null){
	// If the widgets attribute is not set use the default "openMealWidget"
	widgetDivs = ['openMealWidget'];
}
else {
	widgetDivs = widgetDivs.split(',');
}

var xhr = [];
// Loop through the divs to populate with menu data
for (i = 0; i < widgetDivs.length; i++) {
	(function (i){
		// Get the attributes for this widget div
		var widgetElementId = widgetDivs[i].replace(/ /g,'');	
		var widgetElement = document.getElementById(widgetElementId);	
		if (widgetElement == null){
			throw new Error('The Open Meal widget div with id "' + widgetElementId + '" not found in the DOM');			
		}

		var apiURL = widgetElement.dataset.openmealurl;	
		if (apiURL == null){
			throw new Error('The Open Meal widget div with id "' + widgetElementId + '" does not have an "openmealurl" attribute set');			
		}

		var includeIcalButton = widgetElement.dataset.ical;	
		if (includeIcalButton && (includeIcalButton === 'true')){
			includeIcalButton = true;
		}
		else {
			includeIcalButton = false;
		}

		var language = widgetElement.dataset.language;
		if ((language == null) || (!(language in tableHeaders))){
			// Set default language English if language not set or translation not available
			language = 'en';
		}	

		var days = widgetElement.dataset.days;		
		if ((days == null) || (isNaN(days)) || (parseInt(Number(days)) != days) || (isNaN(parseInt(days, 10)))){
			// Set detault to 5 if days not specified or if it is set to something else than an integer
			days = 5;
		}	
		else {
			days = parseInt(days, 10);
		}		
	
		// Call the Open Meal API
		xhr[i] = new XMLHttpRequest();
		xhr[i].open("GET", apiURL, true);
		xhr[i].onreadystatechange = function(){
			createCallback(xhr[i], includeIcalButton, widgetElement, apiURL, language, days);
		};		
		xhr[i].send();
	})(i);
}

// Callback function for the Open Meal API calls
function createCallback(xhr, includeIcalButton, widgetElement, apiURL, language, days){
    if (xhr.readyState == XMLHttpRequest.DONE) {        	
    	if (xhr.status == 200) {       		
       		apiData = JSON.parse(xhr.responseText);
		
           	var distName = apiData.data[0].distributors[0].name;
			var distCalLink = apiData.data[0].distributors[0].iCalendar;				
			var meals = apiData.data[0].meals;
		
			var mealRows = [];
			for (j = 0; j < meals.length; j++) {
				if (j >= days) break;
				var courses = [];
				for (k = 0; k < meals[j].courses.length; k++) {
					courses.push(meals[j].courses[k].name);
				}
				mealRows.push('<tr><td>' + meals[j].date.substring(0,10) + '</td><td>' + meals[j].name + 
		    				  '</td><td>' + courses.join("<br/>") + '</td></tr>');
			}
		
			var icalButton = '';
			if (includeIcalButton){
				icalButton = '<button type="button" class="btn btn-sm" aria-label="Calendar">' + 
	    		 	 		 '<a class="glyphicon glyphicon-calendar" aria-hidden="true" href="' + 
		    		 	 	 distCalLink + '"></a></button>';
			}			
				
	    	// Add alerts HTML to the table		    		
	    	widgetElement.innerHTML = '<table class="table"><thead><tr><th>' + tableHeaders[language].date + 
	    							  '</th><th>' + tableHeaders[language].meal + '</th><th>' + tableHeaders[language].menu + '</th></thead>' + 
	      						  	  '<tbody>' + mealRows.join("") + '</tbody></table>' + icalButton; 
       	}
       	else {
           	console.log('The Open Meal API call to ' + apiURL + ' returned HTTP status ' + xhr.status);
           	widgetElement.innerHTML = '<p>Menu currently not available</p>'
       	}
    }    
}
