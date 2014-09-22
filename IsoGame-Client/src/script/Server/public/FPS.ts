module MainModule {
    export class FPS {

        public startTime: number = 0;
        public frameNumber: number = 0;
        
        constructor() {
        
        }
        
        public getFPS(): number {
            this.frameNumber++;
            var d = new Date().getTime(),
                currentTime = (d - this.startTime) / 1000,
                result = Math.floor((this.frameNumber / currentTime));
            
            if(currentTime > 1) {
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }
            
            return result;
        }
    }
}