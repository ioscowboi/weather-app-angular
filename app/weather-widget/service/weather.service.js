"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// always create an import and a decorator for every service: 
var core_1 = require('@angular/core');
// pull in Json protocol module for use with the weather service: 
var http_1 = require('@angular/http');
// You'll use Rxjs library resources to monitor stream of external data from the api call (jsonp):
//  only import what you need
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
// pull in your api credentials so that you can use them in the weather service: 
var constants_1 = require('../constants/constants');
// decorator:
// injectable allows data to be passed in to the weather.service (angular creates the rules for it when it's instantiated):
var WeatherService = (function () {
    // create an instance of the jsonp for injection in the weather service:
    //     note this is another example of dependency injection: 
    function WeatherService(jsonp) {
        this.jsonp = jsonp;
    }
    // modified to run only after the observable is returned
    //     we do this by changing the return type to be an observable:
    WeatherService.prototype.getCurrentLocation = function () {
        // grab longitude/latitude if the geolocation is available:
        if (navigator.geolocation) {
            // create an observable getCurrentPosition can subscribe to:
            return Observable_1.Observable.create(function (observer) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    // the new piece of data from geo location...make it observable:
                    observer.next(pos);
                }),
                    function (err) {
                        Observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            // triggered for old browsers:
            return Observable_1.Observable.throw("Geolocation is not available");
        }
    };
    // create method to get data right at the moment of the request:
    // format: methodname(parameters): return type{}
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        // constants can't be changed after defined:
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        // query parameters passed in on the end of the url: 
        var queryParams = "?callback=JSONP_CALLBACK";
        // create the observable to return:
        //     we do this by performing a get request and have that be saved in the return statement: 
        return this.jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get weather data -", err);
            // even if there's an error you must return an observable or the app will break:
            //     convert into json so the Observable can easily receive it:
            return Observable_1.Observable.throw(err.json());
        });
    };
    WeatherService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map