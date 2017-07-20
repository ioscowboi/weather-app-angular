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
            case "mph":
                const miles = speed * 1.6;
            return miles + "mph";
            default:
            return speed + "kph";
        }
    }
}