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
var core_1 = require('@angular/core');
var weather_service_1 = require('../service/weather.service');
var weather_1 = require('../model/weather');
var WeatherComponent = (function () {
    // initialize a dependency injection:
    function WeatherComponent(service) {
        this.service = service;
        // create a new blank Weather object: 
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        // initialize the speed unit parameter:
        this.currentSpeedUnit = "mph";
        // initialize the temperature unit parameter:
        //     note: this is just a default value, we could set this to anything, just setting it to the default so that it's
        //         initialized. Why? How? 
        //                         the value is set by the weather api cass which overrides the default value below in the pipe transform:
        this.currentTempUnit = "fahrenheit";
    }
    // built in method for OnInit:
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    // seperate getCurrentLocation out into its own method:
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        // create instance of getCurrentLocation method:
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            _this.pos = position;
            // create a method to contain the json data:
            // w an observable nothing will happen:
            // promise:
            _this.getCurrentWeather();
        }, function (err) { return console.error(err); });
    };
    // seperate getCurrentWeather out into its own method:
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        // create a method to contain the json data:
        // w an observable nothing will happen:
        // promise:
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            _this.weatherData.temp = weather["currently"]["temperature"],
                _this.weatherData.summary = weather["currently"]["summary"];
            _this.weatherData.wind = weather["currently"]["windSpeed"],
                _this.weatherData.humidity = weather["currently"]["humidity"],
                _this.weatherData.icon = weather["currently"]["icon"];
            console.log("Weather: ", _this.weatherData); //remove soon!
        }, function (err) { return console.error(err); });
    };
    WeatherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'weather-widget',
            templateUrl: 'weather.component.html',
            styleUrls: ['weather.component.css'],
            providers: [weather_service_1.WeatherService]
        }), 
        __metadata('design:paramtypes', [weather_service_1.WeatherService])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map