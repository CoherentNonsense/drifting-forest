import Sprite from "../graphics/spritesheet.js";
import Renderer from "../graphics/renderer.js";
const CHUNK_SIZE = 32;
const spritesheet = new Sprite.Spritesheet(512, 8);
class Chunk {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.entities = [];
        this.voxels = [];
    }
    update(data) {
    }
    draw() {
        for (let x = 0; x < CHUNK_SIZE; ++x) {
            for (let y = 0; y < CHUNK_SIZE; ++y) {
                Renderer.draw_sprite(this.position.x + x * 8, this.position.y + y * 8, spritesheet.get_sprite(0, 0));
            }
        }
    }
}
export default Chunk;
