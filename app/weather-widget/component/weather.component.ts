import { Component, OnInit }      from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather }        from '../model/weather';
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
                this.getCurrentWeather()
            },
            err => console.error(err));
    }
    // seperate getCurrentWeather out into its own method:
    getCurrentWeather(){
        // create a method to contain the json data:
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
            }, 
            err => console.error(err));
    }
 }