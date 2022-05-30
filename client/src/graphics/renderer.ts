import AssetLoader from "./asset_loader";
import Context from "./context";
import Shader from "./shader";
import Sprite from "./spritesheet";
import { mat4 } from "gl-matrix";
import Camera from "./camera";

const MAX_QUADS : number = 500;
const MAX_VERTICES : number = MAX_QUADS * 4;
const VERTEX_SIZE : number = 2 + 2; // Position + UV
const BUFFER_SIZE : number = MAX_VERTICES * VERTEX_SIZE;

namespace Renderer
{
  
let context : Context;
let view : mat4 = mat4.create();
let proj : mat4 = mat4.create();

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

let tile_columns : number = 0;
let tile_rows : number = 0;

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

export function getContext() : Context {
  return context;
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
  default_shader.vertexAttribPointer("a_position", 2, webGl.FLOAT, false, VERTEX_SIZE * 4, 0);
  default_shader.vertexAttribPointer("a_texcoord", 2, webGl.FLOAT, false, VERTEX_SIZE * 4, 2 * 4);

  webGl.uniform1i(default_shader.getUniform("u_texture"), 0);

  // Texture
  const default_texture = await AssetLoader.load_image("textures/concept.png");
  const player_texture = await AssetLoader.load_image("textures/spritesheet.png");
  textures.set("default", default_texture);
  textures.set("player", player_texture);
  texture = webGl.createTexture();
  webGl.bindTexture(webGl.TEXTURE_2D, texture);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MIN_FILTER, webGl.NEAREST);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_MAG_FILTER, webGl.NEAREST);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_WRAP_S, webGl.CLAMP_TO_EDGE);
  webGl.texParameteri(webGl.TEXTURE_2D, webGl.TEXTURE_WRAP_T, webGl.CLAMP_TO_EDGE);
  webGl.blendFunc(webGl.SRC_ALPHA, webGl.ONE_MINUS_SRC_ALPHA);
  webGl.enable(webGl.BLEND);
  webGl.texImage2D(webGl.TEXTURE_2D, 0, webGl.RGBA, webGl.RGBA, webGl.UNSIGNED_BYTE, textures.get("player") as HTMLImageElement);

  webGl.clearColor(0.0, 0.0, 0.0, 1.0);

  mat4.lookAt(view, [0, 0, 1], [0, 0, -1], [0, 1, 0]);
}

function flush() : void
{
  if (p_vertex < 1)
    return;
  const webGl = context.webGl;
  webGl.bufferSubData(webGl.ARRAY_BUFFER, 0, vertices, 0, p_vertex);
  webGl.drawElements(webGl.TRIANGLES, p_index, webGl.UNSIGNED_SHORT, 0);

  p_index = 0;
  p_vertex = 0;
}

export function start_draw(camera : Camera) : void
{
  const { webGl } = context;
  webGl.clear(webGl.COLOR_BUFFER_BIT);
  const shader = shaders.get("default") as Shader;
  webGl.uniformMatrix4fv(shader.getUniform("u_projection"), false, camera.getProjection(context));
  webGl.uniformMatrix4fv(shader.getUniform("u_view"), false, camera.getView());
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

  const x_rounded = Math.round(x);
  const y_rounded = Math.round(y);

  const x_left = x_rounded - sprite.width / 2;
  const x_right = x_rounded + sprite.width / 2;
  const y_top = y_rounded + sprite.height / 2;
  const y_bottom = y_rounded - sprite.height / 2;

  const u_left = (sprite.u);
  const u_right = (sprite.u + sprite.width);
  const v_top = (sprite.v);
  const v_bottom = (sprite.v + sprite.height);
  
  // Top Left
  vertices[p_vertex++] = x_left;
  vertices[p_vertex++] = y_top;
  vertices[p_vertex++] = u_left;
  vertices[p_vertex++] = v_top;
  
  // Bottom Left
  vertices[p_vertex++] = x_left;
  vertices[p_vertex++] = y_bottom;
  vertices[p_vertex++] = u_left;
  vertices[p_vertex++] = v_bottom;
  
  // Top Right
  vertices[p_vertex++] = x_right;
  vertices[p_vertex++] = y_top;
  vertices[p_vertex++] = u_right;
  vertices[p_vertex++] = v_top;
  
  // Bottom Right
  vertices[p_vertex++] = x_right;
  vertices[p_vertex++] = y_bottom;
  vertices[p_vertex++] = u_right;
  vertices[p_vertex++] = v_bottom;

  p_index += 6;
}

}


export default Renderer;