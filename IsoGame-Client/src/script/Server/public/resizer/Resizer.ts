module MainModule {
    export class Resizer {

        public static installHandler(canvas: HTMLCanvasElement) {
            var onresize = (): void => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                window.aspect = canvas.width / canvas.height;
            };
            onresize();
            window.onresize = onresize;
        }
    }
}