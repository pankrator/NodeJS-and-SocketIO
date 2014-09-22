module MainModule {
	export class InputManager {
		public keys: Array<boolean>;
		public mouseX: number;
		public mouseY: number;
        public mouseDown: boolean;
		
		constructor() {
			this.keys = new Array<boolean>();
			this.mouseX = 0;
			this.mouseY = 0;
			
			window.addEventListener("keydown", this.handleKeyDown, false);
			window.addEventListener("keyup", this.handleKeyUp, false);
			window.addEventListener("mousemove", this.handleMouseMove, false);
            window.addEventListener("mousedown", this.handleMouseDown, false);
            window.addEventListener("mouseup", this.handleMouseUp, false);
		}
		
		handleKeyDown = (key: KeyboardEvent) => {
			this.keys[key.keyCode] = true;
		}
		
		handleKeyUp = (key: KeyboardEvent) => {
			this.keys[key.keyCode] = false;
		}
		
		handleMouseMove = (mouse: MouseEvent) => {
			var bounds: ClientRect = App.canvas.getBoundingClientRect();
			this.mouseX = mouse.clientX - bounds.left;
			this.mouseY = mouse.clientY - bounds.top;
		}
        
        handleMouseDown = (mouse: MouseEvent) => {
            this.mouseDown = true;
        }
        
        handleMouseUp = (mouse: MouseEvent) => {
            this.mouseDown = false;
        }
	}
}