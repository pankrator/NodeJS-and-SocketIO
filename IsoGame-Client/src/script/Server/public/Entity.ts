module MainModule {
	export class Entity extends GameObject {

		public x: number;
		public y: number;
		public sizeX: number;
		public sizeY: number;
		public collisionMesh: RectangleMesh;

		constructor(x: number, y: number, size: number) {
			super();
			this.x = x;
			this.y = y;
			this.sizeX = size;
			this.sizeY = size;
			this.collisionMesh = new RectangleMesh(this.x, this.y, size);
		}

		public update() {
		}

		public draw(context: CanvasRenderingContext2D) {

		}

		public getAABB(): RectangleMesh {
			return this.collisionMesh;
		}
	}
}