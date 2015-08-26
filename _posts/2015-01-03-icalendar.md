---
layout: page
title: "iCalendar"
category: doc
date: 2015-01-03 20:24:29
order: 8
---
iCalendar is a file format that is used to show events in a calendar. A limited version of the Open Meal data can be published in iCalendar format according to the following specification. It makes the meal information usable in a large number of applications, like Microsoft Outlook, Apple Calendar and Google Calendar. 

For Data Providers that has implemented the rest of the Open Meal API it is recommended, but not obligated, to also implement the iCalendar feature. If the iCalendar feature is implemented the URL to the iCalendar should be made availale via the [List Distributors method](/doc/list-distributors.html).

##Calendars
Each iCalendar file will be formated according to [RFC 5545](http://tools.ietf.org/html/rfc5545) and [RFC 5546](http://tools.ietf.org/html/rfc5546).

|Property|Description|Value|
|--------|------------|-----|
|VERSION|The version of iCalender that is used. This should be the first property of the Calendar.|2.0|
|PRODID|A unique identifier for the product that is creating the iCalendar file. It is the responsibility of the publisher of the file to create a global unique identifier. For more information read [§3.7.3 in RFC 5545](http://tools.ietf.org/html/rfc5545#section-3.7.3).|Example:<br>*-//ABC Corporation//NONSGML My Product//EN*|
|CALSCALE|What type of calendar that is used|GREGORIAN|
|METHOD| |PUBLISHED|
|X-WR-CALNAME|The name of the calendar, it is recommended that it contains information about the type of meal as well as the name of the distributor|Example:<br>*Lunch at the South School* |
|X-WR-TIMEZONE|The timezone of the calendar|Example:<br>*Europe/Stockholm*|
|X-WR-CALDESC|A description of the calendar|Example:<br>*Lunch menu at the South School in Leeds*|

###Meal
The meal of a day is described a [VEVENT](http://tools.ietf.org/html/rfc5545#section-3.6.1) object with the following properties:

|Property|Description|Value|
|--------|------------|-----|
|DTSTART|The date the meal is served. In the format YYYYMMDD. Note that the time for the meal is not specified.|Example:<br>20150501|
|DTEND|The date the meal is served. In the format YYYYMMDD. Note that the time for the meal is not specified.|Example:<br>20150501|
|DTSTAMP|Date and time when this VEVENT object was created. In the format YYYYMMDDTHHMMSS. Note that it is not allowed to use UTC offset when the time is specified.|Example:<br>*20140618T110000*|
|UID|A global unique identifier for this event. For more information on how to create this value read [§3.8.4.7 in RFC 5545](http://tools.ietf.org/html/rfc5545#section-3.8.4.7).|Example:<br>*19960401T080045Z-4000F192713-0052@example.com*|
|CREATED|Date and time when this VEVENT object was created. In the format YYYYMMDDTHHMMSS. Note that it is not allowed to use UTC offset when the time is specified.|Example:<br>*20140618T110000*|
|SUMMARY|A short description of the courses served in the meal. Should only contain the one or two courses with the lowest *order* in order to keep the text as short as possible. A course should be described with the text in the courses *description* property with one course per line. Each line should be ended with *"\n"*.<br>For more information about the property of a Course see the [Get Meals method](/doc/get-meals.html)|Example:<br>*Wokkyckling med pasta, grönsaker och tomatsalsa\nKöttbullar och spagetti*|
|DESCRIPTION|A longer description of the meal, with all courses. One course description per line, each line should be ended with "\n"|Example:<br>*Wokkyckling med pasta, grönsaker och tomatsalsa\nKöttbullar och spagetti\nGrönsakssoppa*|
|LOCATION|The name of the location the meal will be served|Example:<br>Katedralskolan, Linköping|
|LAST-MODIFIED|Date and time when this event object was last updated. In the format YYYYMMDDTHHMMSS.Note that it is not allowed to use UTC offset when the time is specified.|Example:<br>*20140618T110000*|
|SEQUENCE|The version number of this event object, starting at 0. If an event is updated the value of this property needs to be incremented.|Example:<br>*0*|
|TRANSP|Specifies if the calendar event affects users accessibility for other events.|TRANSPARENT|

For all text properties (Summary, Description, Location etc) special characters like commas, quotation marks, colons have to be escaped according to [§4.3.11 in RFC 2455](https://www.ietf.org/rfc/rfc2445.txt). For example this means that commas should be written "\," and backslashes "\\".

###Example

    BEGIN:VCALENDAR
    PRODID:-//ABC Corporation//NONSGML My Product//EN
    VERSION:2.0
    CALSCALE:GREGORIAN
    METHOD:PUBLISH 
    X-WR-CALNAME:Lunch: Katedralskolan, Linköping
    X-WR-TIMEZONE:Europe/Stockholm
    X-WR-CALDESC:Lunchmeny från Katedralskolan i Linköping.
    BEGIN:VEVENT
    DTSTART:20140701
    DTEND:20140701
    DTSTAMP:20140618T110000
    UID:19960401T080045Z-4000F192713-0052@example.com
    CREATED:20140618T110000
    SUMMARY:Wokkyckling med pasta, grönsaker och tomatsalsa\nKöttbullar och spagetti
    DESCRIPTION:Wokkyckling med pasta, grönsaker och tomatsalsa\nKöttbullar och     spagetti\nGrönsakssoppa
    LOCATION:Storskolan, Örebro
    LAST-MODIFIED:20140618T110000
    SEQUENCE:0
    TRANSP:TRANSPARENT
    END:VEVENT
    END:VCALENDAR