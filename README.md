### OCEAN TRIP
___

Ocean Trip is a website for locating recently spotted whales and finding flight prices to that location from your nearest airport. 

---
Introduction 
---
__Functionality__

* Users can register and login via Email, Facebook, Twitter and GitHub
* Once they have logged in they can view the map and the rest of the site and see information on located whales and the cheapest flights to and from that location.
* There is a live Twitter Stream watching for the words whales, dolphins and seals

![](https://www.skotcher.com/wall/f300b886a001ea4237a18522a7f91d51/boat-drawing-floating-night-stars-whale.jpg)

##Installation

The Github resitory for Ocean Trip can be found at

`https://github.com/tankjem/ocean-trip`

Click 'clone or download' and either download the repository as a .zip file, or use a terminal command and enter:

`git@github.com:tankjem/ocean-trip.git`

Alternatively, you can go to this link: 

`https://ocean-trip.herokuapp.com`

### TECH USED ###

 	TECH	|      				|
| ------------- |:-------------:| 
| HTML      | Node.js
| CSS/Bootstrap     | Mongo DB
| SASS |    Mongoose   |
| Javascript | Socket.io
| AngularJs	| Express
| Angular-resource | qs
| Google Maps API | Twit
| Whales Hotline API | Underscore
| SkyScanner API | Gulp |
| Aero API	| Satellizer

Other: 
Trello for planning

![](http://c0026106.cdn1.cloudfiles.rackspacecloud.com/c5bea7ee86f3473ba945d397ead25299_banner_top.png)

### Bugs

* Currently a bug with the airport locator. It is locating an airport with no available flights to the UK.
* Facebook App url needs to change to Heroku/FACEBook Login does not work on heroku
* Register form is registering but not changing state and User still has to login after registering. 

### Future features

* Implement Current location back in so that Users can use it anywhere. 
* Find more Ocean data (Where are all the Whales?) 
* Better quality of tweets
* Weather feature
* Live Cams...




