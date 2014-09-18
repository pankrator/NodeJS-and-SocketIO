module MainModule {
	export class AnimatedSprite extends Sprite {

		public frameWidth: number;
		public frameHeight: number;

		private currentFrame: number;
		private numberOfFrames: number;
		private frameCount;

		constructor( sources: string[], width: number, height: number,
			frameWidth: number, frameHeight: number ) {

			super( sources, width, height );
			this.frameWidth = frameWidth;
			this.frameHeight = frameHeight;
			this.numberOfFrames = this.width / this.frameWidth;
			this.currentFrame = 0;
			this.frameCount = 0;
		}

		public getCurrentFrame(): number {
			return this.currentFrame;
		}

		public getAnimationImage(): HTMLImageElement {
			//TODO: Return the image according to State
			return this.images[0];
		}

		public updateAnimation(): void {
			if ( ++this.frameCount > 30 ) {
				this.frameCount = 0;
				this.currentFrame++;
			}
		}
	}
}