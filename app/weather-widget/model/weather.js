"use strict";
var Weather = (function () {
    function Weather(temp, summary, wind, humidity, 
        // which icon should we use? A: base it on the weather data: 
        icon) {
        this.temp = temp;
        this.summary = summary;
        this.wind = wind;
        this.humidity = humidity;
        this.icon = icon;
    }
    return Weather;
}());
exports.Weather = Weather;
//# sourceMappingURL=weather.js.map