import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// pull in Json protocol module to perform xhr requests from outside your domain
//     use when ex:: your domain: yourdoman.com, location of data you need domain: woohoo.com
// pull in HttpModule for the Google Geolocation api
//     note: this is the same module youll use for any http get requests:
import { JsonpModule, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';

// import speed unit pipe so we can use the pipe in the weather-widget component:
// add to ngmodule as well: 
import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';
import { TempUnitPipe } from './weather-widget/pipe/temp-unit.pipe';
@NgModule({
    imports: [ BrowserModule, JsonpModule, HttpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe, TempUnitPipe ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }