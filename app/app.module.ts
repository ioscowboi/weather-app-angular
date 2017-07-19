import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// pull in Json protocol module to perform xhr requests from outside your domain
//     use when ex:: your domain: yourdoman.com, location of data you need domain: woohoo.com
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';
@NgModule({
    imports: [ BrowserModule, JsonpModule ],
    declarations: [ AppComponent, WeatherComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }