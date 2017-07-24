import { Component, OnInit }      from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather }        from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';
// to stop IDE from complaining about the skycons library: 
declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css' ],
    providers: [ WeatherService ]
})

// tell the class that it will be implementing OnInit:
export class WeatherComponent implements OnInit {
    // create tuple (i.e. an ordered list) of lat and long:
    pos: Position;    
    // create a new blank Weather object: 
    weatherData = new Weather(null, null, null, null, null);    
    // initialize the speed unit parameter:
    currentSpeedUnit = "mph";

    // initialize the temperature unit parameter:
    //     note: this is just a default value, we could set this to anything, just setting it to the default so that it's
    //         initialized. Why? How? 
    //                         the value is set by the weather api cass which overrides the default value below in the pipe transform:
    currentTempUnit = "fahrenheit";
    // store the location of geolocation
    currentLocation = "";

    // no ts definition file so you'll need to create a definition so that ts has a clue about the js skycons libray:
    icons = new Skycons();

    dataReceived = false;

    // initialize a dependency injection:
    constructor(private service: WeatherService){ }
    
    // built in method for OnInit:
    ngOnInit(){
        this.getCurrentLocation()
    }
    // seperate getCurrentLocation out into its own method:
    getCurrentLocation(){
        // create instance of getCurrentLocation method:
        this.service.getCurrentLocation()
        // .subscribe will only run once getCurrentLocation is complete:
            .subscribe(position => {
                this.pos = position
                // create a method to contain the json data:
                // w an observable nothing will happen:
                // promise:
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    }
    // seperate getCurrentWeather out into its own method:
    getCurrentWeather(){
        // create a method to contain the json data for the respective api call:
        // w an observable nothing will happen:
        // promise:
        this.service.getCurrentWeather(this.pos.coords.latitude,this.pos.coords.longitude)
            // until you subscribe to the observable! :
            .subscribe(weather => {
                this.weatherData.temp     = weather["currently"]["temperature"],
                this.weatherData.summary  = weather["currently"]["summary"]
                this.weatherData.wind     = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon     = weather["currently"]["icon"]
                console.log("Weather: ", this.weatherData);  //remove soon!
                // call the setIcon method: 
                this.setIcon();
                // datareceived is changed to true once we have all the data
                //     see class binding in the template html file:
                this.dataReceived = true;
            }, 
            err => console.error(err));
    }
    
    // create method to store the current geolocation information:
    getLocationName(){
        // subscribe to the method getlocationname:
        // pass in lat and long:
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location); //TODO: remove
                this.currentLocation = location["results"][1]["address_components"][1]["short_name"] + ", " + location["results"][1]["address_components"][3]["short_name"]
                console.log('Name: ', this.currentLocation );
            });
    }

    toggleUnits(){
        this.toggleTempUnits();
        this.toggleSpeedUnits();

    }

    toggleTempUnits(){
        if(this.currentTempUnit == "fahrenheit"){
            this.currentTempUnit = "celsius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }
    toggleSpeedUnits(){
        if(this.currentSpeedUnit == "mph"){
            this.currentSpeedUnit = "kph";
        } else {
            this.currentSpeedUnit = "mph";
        };        
    }

    setIcon(){
        // display whatever icon matches the api call at that time: 
        this.icons.add("icon", this.weatherData.icon);
        // animate the icon once it's loaded:
        this.icons.play();
    }

    // call this to utilize styles based on api call:
    setStyles(): Object {
        // display api based styles if an api object exists, otherwise display default styles:
        if(this.weatherData.icon){
            // match text color to icon color: 
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
 }