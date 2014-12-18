---
layout: page
title: "List Data Providers"
category: doc
date: 2014-12-18 16:47:43
order: 1
---
This API method list all Data Providers that have implemented the Open Meal API specification and that has registered as a Data Provider. Use this method to get the Base URL for the Data Providers, which is required to call any other methods in the Open Meal API. 

<table>
	<tr>
		<td>URL: </td>
		<td>[https://raw.githubusercontent.com/Orebrokommun/Open-Meal-Information/master/dataproviders.json](https://raw.githubusercontent.com/Orebrokommun/Open-Meal-Information/master/dataproviders.json)</td>
	</tr>
	<tr>
		<td>HTTP Method: </td>
		<td>GET</td>
	</tr>
	<tr>
		<td>Parameters: </td>
		<td>None</td>
	</tr>
	<tr>
		<td>Formats: </td>
		<td>JSON</td>
	</tr>
</table>

##Response
The method returns a list of Data Providers, including name, contact information and Base URL. Data Providers are described with a data model inspired by the [schema.org Organization](http://schema.org/Organization). 

|Property|Type|Description|Required?|
|-----------|------|--------------|-------------|
|name|String|The name of the organisation|Yes|
|description|String|A brief description of the organisation|No|
|address|Object|The address of the organisation|Yes|
|address > streetAddress|String|The street address|No|
|address > postalCode|String|The postal code|No|
|address > addressLocality|String|The locality, for example the City|No|
|address > addressRegion|String|The region, for example the State|No|
|address > addressCountry|String|The 2-letter [ISO 3166-1 aplha-2](http://en.wikipedia.org/wiki/ISO_3166-1) country code, for example *SE* for Sweden|Yes|
|url|String|The URL to the organisations web site|No|
|email|String|A contact email address for the organisation|No|
|phone|String|A contact phone number for the organisation|No|
|baseUrl|String|The Base URL is needed to call further API methods in order to get data from a Data Provider. |Yes|

##Example

	GET https://raw.githubusercontent.com/Orebrokommun/Open-Meal-Information/master/dataproviders.json

    {
	    "status" : 200,
	    "data" : [
	    	{
				"name" : "Food Industries Inc.",		
				"address" : {			
					"addressCountry" : "US"
				},
				"url" : "http://foodindustries.inc",
				"email" : "openmeal@foodindustries.inc",
				"telephone" : "+1 555 555 555",
				"baseUrl" : "http://openmeal.foodindustries.inc"
			},
			...
	    ]	 	   
    }

##Want to be included as a Data Provider?
This is open to all, read more about [How to Implement the API]().