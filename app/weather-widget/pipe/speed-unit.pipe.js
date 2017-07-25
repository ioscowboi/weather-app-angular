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
// decorator:
var SpeedUnitPipe = (function () {
    function SpeedUnitPipe() {
    }
    // piping will occur here:
    // pass in speed and unit type (mph/kph)
    SpeedUnitPipe.prototype.transform = function (speed, unitType) {
        // depends on what's passed in the parameters:
        switch (unitType) {
            case "kph":
                var miles = 
                // trim the decimal places down to 0 (or any number of decimal places)
                Number(speed * 1.61).toFixed(0);
                return miles + " kph";
            default:
                var milesPH = Number(speed).toFixed(0);
                return milesPH + " mph";
        }
    };
    SpeedUnitPipe = __decorate([
        core_1.Pipe({
            name: 'speedUnit'
        }), 
        __metadata('design:paramtypes', [])
    ], SpeedUnitPipe);
    return SpeedUnitPipe;
}());
exports.SpeedUnitPipe = SpeedUnitPipe;
//# sourceMappingURL=speed-unit.pipe.js.map