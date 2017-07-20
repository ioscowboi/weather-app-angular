import { Pipe, PipeTransform } from '@angular/core';
// decorator:
@Pipe({
    name: 'speedUnit'

})

export class SpeedUnitPipe implements PipeTransform { 
    // piping will occur here:
    // pass in speed and unit type (mph/kph)
    transform(speed: number, unitType: string){
        // depends on what's passed in the parameters:
        switch(unitType){
            case "kph":
                const miles = 
                // trim the decimal places down to 0 (or any number of decimal places)
                Number(speed * 1.61).toFixed(0);
            return miles + " kph";
            default:
                const milesPH = Number(speed).toFixed(0);
            return milesPH + " mph";
        }
    }
}