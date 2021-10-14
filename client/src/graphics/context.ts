export default class Context
{
  canvas : HTMLCanvasElement;
  webGl : WebGL2RenderingContext;

  constructor(id : string)
  {
    const element : HTMLElement | null = document.getElementById(id);
    if (element === null)
    {
      throw new Error(`Canvas with the id '${id}' does not exist.`);
    }
    
    this.canvas = element as HTMLCanvasElement;
    this.webGl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;

    addEventListener("resize", () => this.resize());
  }

  resize() : void
  {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.webGl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
}