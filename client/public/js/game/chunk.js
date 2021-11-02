import Sprite from "../graphics/spritesheet.js";
import Renderer from "../graphics/renderer.js";
import Voxel from "./voxel.js";
export const CHUNK_SIZE = 16;
const spritesheet = new Sprite.Spritesheet(512, 8);
class Chunk {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.entities = new Array();
        this.voxels = new Array();
        for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE; ++i) {
            this.voxels.push(new Voxel(0));
        }
    }
    update(data) {
    }
    draw() {
        for (let z = 0; z < CHUNK_SIZE; ++z) {
            for (let y = 0; y < CHUNK_SIZE; ++y) {
                for (let x = 0; x < CHUNK_SIZE; ++x) {
                }
            }
        }
        this.voxels.forEach((voxel, index) => {
            const z = Math.floor(index / (CHUNK_SIZE * CHUNK_SIZE));
            const flat_index = index - (z * CHUNK_SIZE * CHUNK_SIZE);
            const y = Math.floor(flat_index / CHUNK_SIZE);
            const x = flat_index % CHUNK_SIZE;
            Renderer.draw_sprite(x * 8, y * 8, spritesheet.get_sprite(voxel.id, voxel.id));
        });
    }
    get_key() {
        return `${this.position.x},${this.position.y}`;
    }
}
export default Chunk;
