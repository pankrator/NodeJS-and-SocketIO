module MainModule {
	export class Player extends Entity implements NetworkUpdatable {

		public name: String;
		public direction: number;
		public invisible: Boolean;

		private animationFrame: number;


		constructor( name: String, x: number, y: number, size: number ) {
			super( x, y, size );
			this.name = name;
			this.animationFrame = 5;
			this.direction = 0;

			this.updateAnimationFrame();
		}

		public draw( context: CanvasRenderingContext2D ): void {
			context.beginPath();

			var images = new Array<HTMLImageElement>();

			var img = new Image();
			img.src = "resources/Farmer/Walk/Farmer_Walk_Right.png";
			images.push( img );

			img = new Image();
			img.src = "resources/Farmer/Walk/Farmer_Walk_Up.png";
			images.push( img );

			img = new Image();
			img.src = "resources/Farmer/Walk/Farmer_Walk_Left.png";
			images.push( img );

			img = new Image();
			img.src = "resources/Farmer/Walk/Farmer_Walk_Down.png";
			images.push( img );

			var frameWidth = images[this.direction].width / 15;
			var frameHeight = images[this.direction].height;
			context.drawImage( images[this.direction], frameWidth * this.animationFrame, 0, frameWidth, frameHeight, this.x, this.y, frameWidth, frameHeight );
			context.rect( this.x, this.y, 5, 5 );
			context.fill();

		}

		public update(): void {
			this.move();
		}
		
		private updateAnimationFrame = (): void => {
			this.animationFrame++;
			if ( this.animationFrame > 14 ) {
				this.animationFrame = 0;
			}
			setTimeout( this.updateAnimationFrame, 100 );
		}

		public move(): void {
			if ( App.inputManager.keys[KEYS.LEFT_ARROW] ) {
				this.direction = 2;
				this.x -= 2;
			}
			if ( App.inputManager.keys[KEYS.UP_ARROW] ) {
				this.direction = 1;
				this.y -= 2;
			}
			if ( App.inputManager.keys[KEYS.RIGHT_ARROW] ) {
				this.direction = 0;
				this.x += 2;
			}
			if ( App.inputManager.keys[KEYS.DOWN_ARROW] ) {
				this.direction = 3;
				this.y += 2;
			}
		}

		public updateState( data: any ): void {
			for ( var i = 0; i < data.length; i++ ) {
				this[data[i].name] = data[i].value;
			}
		}
	}
}
