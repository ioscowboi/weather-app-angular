export class Weather{
    constructor(
        public temp:     number,
        public summary:  string, 
        public wind:     number,
        public humidity: number,
        // which icon should we use? A: base it on the weather data: 
        public icon:     string 
    ){ }
}