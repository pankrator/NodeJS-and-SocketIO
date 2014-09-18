module MainModule {
	export class Sprite {

		public images: HTMLImageElement[];
		public width: number;
		public height: number;

		constructor( sources: string[], width: number, height: number ) {
			this.width = width;
			this.height = height;
			for ( var i = 0; i < sources.length; i++ ) {
				var img = new Image();
				img.src = sources[i];
				this.images.push( img );
			}
		}

		public getImage(): HTMLImageElement {
			return this.images[0];
		}
	}
}