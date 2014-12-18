---
layout: page
title: "How to Implement the API"
category: doc
date: 2014-12-18 16:48:56
order: 10
---
The Open Meal API is open to any organisation with meal information to implement. Simply read through the API documentation on this site and implement an API that follows the specification. Especially note the following:

* Publishing data via the Open Meal API means that it is available under the [Creative Commons Zero](http://creativecommons.org/publicdomain/zero/1.0/) license.
* The Open Meal API should be open for all to use without the need to register or authenticate.
* Return HTTP Status 200 OK if a everything works as it should with a request, HTTP Status 404 is a resource (URL) is not found, HTTP 400 if a request is incorrectly formated and HTTP 500 if something else goes wrong.
* The *List Distributors* and *Get Meals* methods with all parameters must be implemented.
* All responses should be UTF-8 encoded.
* Make a [pull request](https://help.github.com/articles/using-pull-requests/) to the [List of Data Providers](/doc/list-distributors.html) to include information about your organisations Open Meal API.

It is the responsiblity of the Data Provider that the API is implemented correctly and to support any developers that reports bugs or has questions about the implementation of the Open Meal API.