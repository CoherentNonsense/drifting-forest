var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AssetLoader from "./asset_loader.js";
import Shader from "./shader.js";
const MAX_QUADS = 500;
const MAX_VERTICES = MAX_QUADS * 4;
const VERTEX_SIZE = 3 + 2;
const BUFFER_SIZE = MAX_VERTICES * VERTEX_SIZE;
var Renderer;
(function (Renderer) {
    let camera;
    let shaders = new Map();
    let textures = new Map();
    let vbo = null;
    let ebo = null;
    let vao = null;
    let texture = null;
    const vertices = new Float32Array(BUFFER_SIZE);
    const indices = generate_indices(MAX_QUADS);
    let p_vertex = 0;
    let p_index = 0;
    let tile_columns = 0;
    let tile_rows = 0;
    const offset = { x: 0, y: 0 };
    function generate_indices(n_quads) {
        const n_indicies = n_quads * 6;
        const indicies = new Uint16Array(n_indicies);
        for (let i = 0, j = 0; i < n_indicies; i += 6, j += 4) {
            indicies[i] = j;
            indicies[i + 1] = j + 1;
            indicies[i + 2] = j + 2;
            indicies[i + 3] = j + 1;
            indicies[i + 4] = j + 3;
            indicies[i + 5] = j + 2;
        }
        return indicies;
    }
    function init(_context) {
        return __awaiter(this, void 0, void 0, function* () {
            Renderer.context = _context;
            const webGl = Renderer.context.webGl;
            vao = webGl.createVertexArray();
            webGl.bindVertexArray(vao);
            vbo = webGl.createBuffer();
            webGl.bindBuffer(webGl.ARRAY_BUFFER, vbo);
            webGl.bufferData(webGl.ARRAY_BUFFER, vertices, webGl.DYNAMIC_DRAW);
            ebo = webGl.createBuffer();
            webGl.bindBuffer(webGl.ELEMENT_ARRAY_BUFFER, ebo);
            webGl.bufferData(webGl.ELEMENT_ARRAY_BUFFER, indices, webGl.STATIC_DRAW);
            const [vertex_source, fragment_source] = yield AssetLoader.load_assets(["shaders/default.vert", "shaders/default.frag"]);
            const default_shader = new Shader(webGl, vertex_source, fragment_source);
            shaders.set("default", default_shader);
            default_shader.use();
            default_shader.vertexAttribPointer("a_position", 3, webGl.FLOAT, false, VERTEX_SIZE * 4, 0);
            default_shader.vertexAttribPointer("a_texcoord", 2, webGl.FLOAT, false, VERTEX_SIZE * 4, 3 * 4);
            webGl.uniform1i(default_shader.getUniform("u_texture"), 0);
            const default_texture = yield AssetLoader.load_image("textures/concept.png");
            textures.set("default", default_texture);
            texture = webGl.createTexture();
            webGl.bindTexture(webGl.TEXTURE_2D, texture);
            webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MIN_FILTER, webGl.NEAREST);
            webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MAG_FILTER, webGl.NEAREST);
            webGl.blendFunc(webGl.SRC_ALPHA, webGl.ONE_MINUS_SRC_ALPHA);
            webGl.enable(webGl.BLEND);
            webGl.texImage2D(webGl.TEXTURE_2D, 0, webGl.RGBA, webGl.RGBA, webGl.UNSIGNED_BYTE, default_texture);
            webGl.clearColor(1.0, 1.0, 1.0, 1.0);
        });
    }
    Renderer.init = init;
    function use_camera(m_camera) {
        camera = m_camera;
    }
    Renderer.use_camera = use_camera;
    function flush() {
        if (p_vertex < 1)
            return;
        const webGl = Renderer.context.webGl;
        webGl.bufferSubData(webGl.ARRAY_BUFFER, 0, vertices, 0, p_vertex);
        webGl.drawElements(webGl.TRIANGLES, p_index, webGl.UNSIGNED_SHORT, 0);
        p_index = 0;
        p_vertex = 0;
    }
    function start_draw() {
        const webGl = Renderer.context.webGl;
        webGl.clear(webGl.COLOR_BUFFER_BIT);
        const shader = shaders.get("default");
        webGl.uniform3f(shader.getUniform("u_offset"), Math.round(camera.position.x * Renderer.context.canvas.width) / Renderer.context.canvas.width, Math.round(camera.position.y * Renderer.context.canvas.height) / Renderer.context.canvas.height, camera.position.z);
        webGl.uniform1f(shader.getUniform("u_scale"), Math.round(camera.scale));
    }
    Renderer.start_draw = start_draw;
    function end_draw() {
        flush();
    }
    Renderer.end_draw = end_draw;
    function draw_sprite(x, y, sprite) {
        if (p_vertex + VERTEX_SIZE * 4 >= BUFFER_SIZE) {
            flush();
        }
        const { width: canvas_width, height: canvas_height } = Renderer.context.canvas;
        const x_left = (x + offset.x - 4) / canvas_width;
        const x_right = (x + sprite.width + offset.x - 4) / canvas_width;
        const y_top = (y + sprite.height + offset.y - 4) / canvas_height;
        const y_bottom = (y + offset.y - 4) / canvas_height;
        const u_left = (sprite.u + 0.005) / sprite.size;
        const u_right = (sprite.u + sprite.width - 0.005) / sprite.size;
        const v_top = (sprite.v + 0.005) / sprite.size;
        const v_bottom = (sprite.v + sprite.height - 0.005) / sprite.size;
        vertices[p_vertex++] = x_left;
        vertices[p_vertex++] = y_top;
        vertices[p_vertex++] = 0;
        vertices[p_vertex++] = u_left;
        vertices[p_vertex++] = v_top;
        vertices[p_vertex++] = x_left;
        vertices[p_vertex++] = y_bottom;
        vertices[p_vertex++] = 0;
        vertices[p_vertex++] = u_left;
        vertices[p_vertex++] = v_bottom;
        vertices[p_vertex++] = x_right;
        vertices[p_vertex++] = y_top;
        vertices[p_vertex++] = 0;
        vertices[p_vertex++] = u_right;
        vertices[p_vertex++] = v_top;
        vertices[p_vertex++] = x_right;
        vertices[p_vertex++] = y_bottom;
        vertices[p_vertex++] = 0;
        vertices[p_vertex++] = u_right;
        vertices[p_vertex++] = v_bottom;
        p_index += 6;
    }
    Renderer.draw_sprite = draw_sprite;
})(Renderer || (Renderer = {}));
export default Renderer;
