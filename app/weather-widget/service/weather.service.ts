// always create an import and a decorator for every service: 
import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT } from '../constants/constants';
// decorator:
// injectable allows data to be passed in to the weather.service (angular creates the rules for it when it's instantiated):
@Injectable()

export class WeatherService { 
    getCurrentLocation(): [number,number]{
        // grab longitude/latitude if the geolocation is available:
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ",", pos.coords.latitude); // ToDO: REMOVE
                return [pos.coords.latitude, pos.coords.longitude];
            },
            err => console.error("Unable to get the position -", err));
        }else{
            // triggered for old browers:
            console.error("Geolocation is not available!");
            return[0,0]
        }
    }
}