import { load_assets, load_asset } from "./asset_loader.js";
import Shader from "./shader.js";

const MAX_QUADS = 2000;
const MAX_VERTICES = MAX_QUADS * 4;
const VERTEX_SIZE = 3 + 2; // Position + UV
const BUFFER_SIZE = MAX_QUADS * VERTEX_SIZE;

let context = null;
let webGl = null;
const shader_library = {};
const texture_library = {};

let vbo = -1;
let ebo = -1;
let vao = -1;
let texture = -1;

const vertices = new Float32Array(BUFFER_SIZE);
const indices = generate_indices(MAX_VERTICES);
let p_vertex = 0;
let p_index = 0;

async function init(m_context)
{
  context = m_context;
  webGl = context.webGl;

  // Buffers
  vao = webGl.createVertexArray();
  webGl.bindVertexArray(vao);
  
  vbo = webGl.createBuffer();
  webGl.bindBuffer(webGl.ARRAY_BUFFER, vbo);
  webGl.bufferData(webGl.ARRAY_BUFFER, BUFFER_SIZE, webGl.DYNAMIC_DRAW);
  
  ebo = webGl.createBuffer();
  webGl.bindBuffer(webGl.ELEMENT_ARRAY_BUFFER, ebo);
  webGl.bufferData(webGl.ELEMENT_ARRAY_BUFFER, indices, webGl.STATIC_DRAW);
  
  // Shader
  const [vertex_source, fragment_source] = await load_assets(["shaders/default.vert", "shaders/default.frag"]);
  const default_shader = new Shader(webGl, vertex_source, fragment_source);
  shader_library["default"] = default_shader;

  default_shader.use();
  default_shader.vertexAttribPointer("a_position", 3, webGl.FLOAT, false, VERTEX_SIZE * 4, 0);
  default_shader.vertexAttribPointer("a_texcoord", 2, webGl.FLOAT, false, VERTEX_SIZE * 4, 3 * 4);

  webGl.uniform1i(default_shader.getUniform("u_texture"), 0);

  // Texture
  const default_texture = await load_asset("textures/concept.png");
  texture_library["default"] = default_texture;
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

function generate_indices(n_quads)
{
  const n_indicies = n_quads * 6;
  const indicies = new Uint16Array(n_indicies);
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

function flush()
{
  webGl.bufferSubData(webGl.ARRAY_BUFFER, 0, vertices, 0, p_vertex);
  webGl.drawElements(webGl.TRIANGLES, p_index, webGl.UNSIGNED_SHORT, 0);

  p_index = 0;
  p_vertex = 0;
}

function start_draw()
{
  webGl.clear(webGl.COLOR_BUFFER_BIT);
}

function end_draw()
{
  flush();
}

function draw_sprite(x, y, sprite)
{
  if (p_vertex >= MAX_VERTICES)
  {
    flush();
  }

  const { width: canvas_width, height: canvas_height } = context.canvas;
  
  const x_left = x / canvas_width * 8;
  const x_right = (x + sprite.width) / canvas_width * 8;
  const y_top = (y + sprite.height) / canvas_height * 8;
  const y_bottom = y / canvas_height * 8;

  const u_left = (sprite.u) / sprite.size;
  const u_right = (sprite.u + sprite.width - 0.005) / sprite.size;
  const v_top = (sprite.v) / sprite.size;
  const v_bottom = (sprite.v + sprite.height - 0.005) / sprite.size;

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

const Renderer = Object.freeze({
  init,
  start_draw,
  end_draw,
  draw_sprite
});

export default Renderer;