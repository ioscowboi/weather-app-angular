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
    pos: [number, number];    
    // initialize a dependency injection:
    constructor(private service: WeatherService){
        // create instance of getCurrentLocation method:
        this.service.getCurrentLocation();
        // create a method to contain the json data:
        // w an observable nothing will happen:
        // this.service.getCurrentWeather(this.pos[0],this.pos[1])
        this.service.getCurrentWeather(0,0)
            // until you subscribe to the observable! :
            .subscribe(weather => console.log(weather), 
            err => console.error(err));
    }
 }