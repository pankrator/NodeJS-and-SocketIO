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
			var targetIso = Renderer.screenToIso(target.x, target.y);
            this.x = -targetIso[0] + App.canvas.width / 2;
            this.y = -targetIso[1] + App.canvas.height / 2;
		}
	}
}