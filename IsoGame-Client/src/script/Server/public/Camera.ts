module MainModule {
	export class Camera {
		
		public x: any;
		public y: any;
		public canvasWidth: number;
		public canvasHeight: number;
		
		constructor(width: number, height: number) {
			this.canvasWidth = width;
			this.canvasHeight = height;
		}
		
		public follow(target: Entity) {
			this.x = -target.x + this.canvasWidth / 2;
			this.y = -target.y + this.canvasHeight / 2;
		}
	}
}