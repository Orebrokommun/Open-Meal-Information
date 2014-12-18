---
layout: default
title: "Open Meal Information"
---
#Open Meal API
The Open Meal API is a specification of how information about the food served in large scale kitchens (for example schools and retirement homes) can be distributed as Open Data in such a way that it can be used by developers to build new applications and user experiences. The Open Meal API does not have a central repository of meal data, instead the API specification is implemented by organisations that want to distribute this kind of data. 
 
##Concepts
There are a few concepts that are fundamental to understanding and using the Open Meal API:

* **Data Provider** - the organisation that publishes data according the Open Meal API specification. Since the Open Meal API does not have a central repository of meal data there will potentially be several Data Providers for any given country, state or city. Typically there is just one Data Provider that publishes meal information for a specific Distributor.
* **Distributor** - the organisation that serves the food, for example a school or a retirement home. Information about the food served is available through the Open Meal API via a Data Provider.
* **Meal** - a collection of Courses served at a specific time at a specific Distributor, for example lunch at a school. 
* **Course** - a dish available in a Meal. Each Meal can have several Courses, ie several food alternatives served. A Course can contain descriptions of the ingredients, nutrition, allegens etc that the food contains.

##Requests
Requests to the Open Meal API are mostly made directly to Data Providers servers (the only exception being the [List Data Providers]() method). All parameters need to bed URL encoded. The data format of the response is set with a URL suffix (*.json*) and at the moment only JSON is supported.

##Responses
The response is UTF-8 encoded and has the the same basic structure for all methods:

|Property|Type|Description|Required?|
|-----------|------|--------------|-------------|
|status|Integer|The HTTP Status of the response|Yes|
|data|List|The method specific data|Yes, if an error has not occured|
|error|String|A description of an error|Yes, if an error has occured (ie status is not set to 200 OK)|

Return HTTP Status 200 OK if a everything works as it should with a request, HTTP Status 404 is a resource (URL) is not found, HTTP 400 if a request is incorrectly formated and HTTP 500 if something else goes wrong.

Example:

    {
	    "status" : 200,
	    "data" : [
	 	   ...
	    ]
    }
    
##Licence
All data available via the Open Meal API is published under Creative Commons Zero, which give the consumer of the data full rights to modify the data and use it for commercial purposes.

##Support
Each Data Provider is responsible to provide support for their implementation of the Open Meal API. That includes fixing reported bugs, provide support to developers as well as to keep up to date with changes in the Open Meal API.    
