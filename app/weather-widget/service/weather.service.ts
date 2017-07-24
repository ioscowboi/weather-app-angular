// always create an import and a decorator for every service: 
import { Injectable } from '@angular/core';
// pull in Json protocol module for use with the weather service:
//  pull in the Http module so that we can use with the Google Geolocation api call:
import { Jsonp, Http } from '@angular/http';

// You'll use Rxjs library resources to monitor stream of external data from the api call (jsonp):
//  only import what you need
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// pull in your api credentials so that you can use them in the weather service: 
// add Google Geocoding credentials:
import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT } from '../constants/constants';
// decorator:
// injectable allows data to be passed in to the weather.service (angular creates the rules for it when it's instantiated):
@Injectable()

export class WeatherService { 
    // create an instance of the jsonp for injection in the weather service:
    //     note this is another example of dependency injection:
    //  create an instance of http for injection into the weather service so we can use it: 
    constructor(private jsonp: Jsonp, private http: Http){}

    // modified to run only after the observable is returned
    //     we do this by changing the return type to be an observable:
    getCurrentLocation(): Observable<any> {
        // grab longitude/latitude if the geolocation is available:
        if(navigator.geolocation) {
            // create an observable getCurrentPosition can subscribe to:
            return Observable.create(observer =>{
                navigator.geolocation.getCurrentPosition(pos => {
                    // the new piece of data from geo location...make it observable:
                    observer.next(pos);
                }),
                err => {
                    Observable.throw(err)
                }
            });
        }else{
            // triggered for old browsers:
            return Observable.throw("Geolocation is not available");
        }
    }
    // create method to get data right at the moment of the request:
    // format: methodname(parameters): return type{}
    getCurrentWeather(lat: number, long: number): Observable<any> {
        // constants can't be changed after defined:
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        // query parameters passed in on the end of the url: 
        const queryParams = "?callback=JSONP_CALLBACK";
        
        // create the observable to return:
        //     we do this by performing a get request and have that be saved in the return statement: 
        return this.jsonp.get(url + queryParams)
        
        // use map operator to transform the data into an json observable: 
        //     we do this because the jsonp.get request above contains more information than we need:
        .map(data => data.json())
        // Log any errors:
        .catch(err => {
            console.error("Unable to get weather data -", err);
            // even if there's an error you must return an observable or the app will break:
            //     convert into json so the Observable can easily receive it:
            return Observable.throw(err.json());
        });
    }

    // http get request
    //     pass in latitude and logitude for use in the api url string as query params:
    getLocationName(lat: number, long: number): Observable<any> {
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_KEY;
        
        // notice that with Google Geolocation api you dont need the JSON request. 
        // read up on CORS if you want to know what is going on with this:
        return this.http.get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location -", err);
                return Observable.throw(err);
            });
    }
}