import AssetLoader from "./asset_loader.js";
import Context from "./context.js";
import Shader from "./shader.js";
import Sprite from "./spritesheet.js";


const MAX_QUADS : number = 500;
const MAX_VERTICES : number = MAX_QUADS * 4;
const VERTEX_SIZE : number = 3 + 2; // Position + UV
const BUFFER_SIZE : number = MAX_VERTICES * VERTEX_SIZE;

namespace Renderer
{
  
let context : Context;
let shaders : Map<string, Shader> = new Map();
let textures : Map<string, HTMLImageElement> = new Map();

let vbo : WebGLBuffer | null = null;
let ebo : WebGLBuffer | null = null;
let vao : WebGLVertexArrayObject | null = null;
let texture : WebGLTexture | null = null;

const vertices : Float32Array = new Float32Array(BUFFER_SIZE);
const indices : Uint16Array = generate_indices(MAX_QUADS);
let p_vertex : number = 0;
let p_index : number = 0;

let scale : number = 10;
const offset : { x: number, y: number } = { x: 0, y: 0 };


function generate_indices(n_quads : number) : Uint16Array
{
  const n_indicies : number = n_quads * 6;
  const indicies : Uint16Array = new Uint16Array(n_indicies);
  for (let i = 0, j = 0; i < n_indicies; i += 6, j += 4)
  {
      indicies[ i ] = j;
      indicies[i+1] = j + 1;
      indicies[i+2] = j + 2;
      indicies[i+3] = j + 1;
      indicies[i+4] = j + 3;
      indicies[i+5] = j + 2;
  }

  return indicies;
}

export async function init(_context : Context) : Promise<void>
{
  context = _context;
  const webGl = context.webGl;

  // Buffers
  vao = webGl.createVertexArray();
  webGl.bindVertexArray(vao);
  
  vbo = webGl.createBuffer();
  webGl.bindBuffer(webGl.ARRAY_BUFFER, vbo);
  webGl.bufferData(webGl.ARRAY_BUFFER, vertices, webGl.DYNAMIC_DRAW);
  
  ebo = webGl.createBuffer();
  webGl.bindBuffer(webGl.ELEMENT_ARRAY_BUFFER, ebo);
  webGl.bufferData(webGl.ELEMENT_ARRAY_BUFFER, indices, webGl.STATIC_DRAW);
  
  // Shader
  const [vertex_source, fragment_source] = await AssetLoader.load_assets(["shaders/default.vert", "shaders/default.frag"]);
  const default_shader = new Shader(webGl, vertex_source, fragment_source);
  shaders.set("default", default_shader);

  default_shader.use();
  default_shader.vertexAttribPointer("a_position", 3, webGl.FLOAT, false, VERTEX_SIZE * 4, 0);
  default_shader.vertexAttribPointer("a_texcoord", 2, webGl.FLOAT, false, VERTEX_SIZE * 4, 3 * 4);

  webGl.uniform1i(default_shader.getUniform("u_texture"), 0);

  // Texture
  const default_texture = await AssetLoader.load_image("textures/concept.png");
  textures.set("default", default_texture);
  texture = webGl.createTexture();
  webGl.bindTexture(webGl.TEXTURE_2D, texture);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MIN_FILTER, webGl.NEAREST);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MAG_FILTER, webGl.NEAREST);
  webGl.blendFunc(webGl.SRC_ALPHA, webGl.ONE_MINUS_SRC_ALPHA);
  webGl.enable(webGl.BLEND);
  webGl.texImage2D(webGl.TEXTURE_2D, 0, webGl.RGBA, webGl.RGBA, webGl.UNSIGNED_BYTE, default_texture);

  webGl.clearColor(1.0, 1.0, 1.0, 1.0);
  context.resize();
}

function flush() : void
{
  const webGl = context.webGl;
  webGl.bufferSubData(webGl.ARRAY_BUFFER, 0, vertices, 0, p_vertex);
  webGl.drawElements(webGl.TRIANGLES, p_index, webGl.UNSIGNED_SHORT, 0);

  p_index = 0;
  p_vertex = 0;
}

export function start_draw() : void
{
  const webGl = context.webGl;
  webGl.clear(webGl.COLOR_BUFFER_BIT);
}

export function end_draw() : void
{
  flush();
}

export function draw_sprite(x : number, y : number, sprite : Sprite.Frame) : void
{
  if (p_vertex + VERTEX_SIZE * 4 >= BUFFER_SIZE)
  {
    flush();
  }

  const { width: canvas_width, height: canvas_height } = context.canvas;
  
  const x_left = (x + offset.x - 4) / canvas_width * scale;
  const x_right = (x + sprite.width + offset.x - 4) / canvas_width * scale;
  const y_top = (y + sprite.height + offset.y - 4) / canvas_height * scale;
  const y_bottom = (y + offset.y - 4) / canvas_height * scale;

  const u_left = (sprite.u) / sprite.size;
  const u_right = (sprite.u + sprite.width - 0.0001) / sprite.size;
  const v_top = (sprite.v) / sprite.size;
  const v_bottom = (sprite.v + sprite.height - 0.0001) / sprite.size;

  // Top Left
  vertices[p_vertex++] = x_left;
  vertices[p_vertex++] = y_top;
  vertices[p_vertex++] = 0;
  vertices[p_vertex++] = u_left;
  vertices[p_vertex++] = v_top;
  
  // Bottom Left
  vertices[p_vertex++] = x_left;
  vertices[p_vertex++] = y_bottom;
  vertices[p_vertex++] = 0;
  vertices[p_vertex++] = u_left;
  vertices[p_vertex++] = v_bottom;
  
  // Top Right
  vertices[p_vertex++] = x_right;
  vertices[p_vertex++] = y_top;
  vertices[p_vertex++] = 0;
  vertices[p_vertex++] = u_right;
  vertices[p_vertex++] = v_top;
  
  // Bottom Right
  vertices[p_vertex++] = x_right;
  vertices[p_vertex++] = y_bottom;
  vertices[p_vertex++] = 0;
  vertices[p_vertex++] = u_right;
  vertices[p_vertex++] = v_bottom;

  p_index += 6;
}

// TEMP Camera Navigation
window.addEventListener("keydown", (e) => {
  if (e.key === "j") scale += 1;
  if (e.key === "k") scale -= 1;
  if (scale < 5) scale = 5;
  if (scale > 55) scale = 55;
  if (e.key === "ArrowLeft") offset.x += 4;
  if (e.key === "ArrowUp") offset.y -= 4;
  if (e.key === "ArrowRight") offset.x -= 4;
  if (e.key === "ArrowDown") offset.y += 4;
});

}


export default Renderer;