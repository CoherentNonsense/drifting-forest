export default class Context {
    constructor(id) {
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`Canvas with the id '${id}' does not exist.`);
        }
        this.canvas = element;
        this.webGl = this.canvas.getContext("webgl2");
        addEventListener("resize", () => this.resize());
    }
    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.webGl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}
