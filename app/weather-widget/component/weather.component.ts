import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css' ],
    providers: [ WeatherService ]
})

export class WeatherComponent{
    // create tuple (i.e. an ordered list) of lat and long:
    pos: Position;    
    // initialize a dependency injection:
    constructor(private service: WeatherService){
        // create instance of getCurrentLocation method:
        this.service.getCurrentLocation()
        // .subscribe will only run once getCurrentLocation is complete:
            .subscribe(position => {
                this.pos = position
                // create a method to contain the json data:
                // w an observable nothing will happen:
                // promise:
                this.service.getCurrentWeather(this.pos.coords.latitude,this.pos.coords.longitude)
                // this.service.getCurrentWeather(0,0)
                    // until you subscribe to the observable! :
                    .subscribe(weather => console.log(weather), 
                    err => console.error(err));

            },
            err => console.error(err));
    }
 }