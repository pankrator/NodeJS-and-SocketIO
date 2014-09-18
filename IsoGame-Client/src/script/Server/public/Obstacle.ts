//var Wall = GameObject.extend(
//{
//	init: function(x, y, size) {
//		this.parent();
//		
//		this.x = x;
//		this.y = y;
//		this.size = size;
//	},
//	
//	draw: function(context) {
//		context.beginPath();
//		context.fillStyle = "blue";
//		context.fillRect(this.x, this.y, this.size, this.size);
//		context.fill();
//	}
//	
//});

module MainModule {
	export class Wall extends GameObject {
		
		public x: number;
		public y: number;
		public size: number;
		
		constructor(x: number, y: number, size: number) {
			super();
			this.x = x;
			this.y = y;
			this.size = size;
		}
		
		public draw(context: CanvasRenderingContext2D): void {
			context.beginPath();
			context.fillStyle = "blue";
			context.fillRect(this.x, this.y, this.size, this.size);
		}
	}
}