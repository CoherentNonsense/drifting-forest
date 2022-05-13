export default class Context {
  canvas : HTMLCanvasElement;
  webGl : WebGL2RenderingContext;

  constructor(id : string) {
    const element : HTMLElement | null = document.getElementById(id);
    if (element === null) {
      throw new Error(`Canvas with the id '${id}' does not exist.`);
    }
    
    this.canvas = element as HTMLCanvasElement;
    this.webGl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() : void {    
    const aspectRatio = window.innerWidth / window.innerHeight;
    let screenWidth = 0;
    let screenHeight = 0;
    if (aspectRatio < 1) {
      screenWidth = window.innerWidth;
      screenHeight = screenWidth / aspectRatio;
    } else {
      screenHeight = window.innerHeight;
      screenWidth = screenHeight * aspectRatio;
    }

    screenWidth = Math.ceil(screenWidth / 2) * 2;
    screenHeight = Math.ceil(screenHeight / 2) * 2;

    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.webGl.viewport(0, 0, screenWidth, screenHeight);
  }
}