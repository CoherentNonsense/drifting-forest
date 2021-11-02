import Renderer from "./graphics/renderer.js";
import Sprite from "./graphics/spritesheet.js";
import Input from "./input.js";
import Socket from "./network/socket.js";
import Chunk from "./game/chunk.js";
import Camera from "./graphics/camera.js";

export let delta_time : number = 0;

const buttons = ["KeyW", "KeyA", "KeyS", "KeyD", "KeyP", "KeyO", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
buttons.forEach((button) => {
  Input.add_button(button);
});

const spritesheet = new Sprite.Spritesheet(512, 8);
const sprite = spritesheet.get_sprite(3, 0);
const camera = new Camera();
Renderer.use_camera(camera);

let last_time = 0;
let move_timer = 0;
let y_pos = 0;
let x_pos = 0;
let diagonal_alternate = false;

const chunk = new Chunk();

export default async function run_client()
{
  requestAnimationFrame(tic);
}

/**
 * Called every frame
 */
function tic(time : number) : void
{
  // Calculate timing
  delta_time = (time - last_time) / 1000;
  last_time = time;

  if (Input.get_key("ArrowLeft")) camera.pan({ x: 0.1, y: 0});
  if (Input.get_key("ArrowRight")) camera.pan({ x: -0.1, y: 0});
  if (Input.get_key("ArrowUp")) camera.pan({ x: 0, y: -0.1});
  if (Input.get_key("ArrowDown")) camera.pan({ x: 0, y: 0.1});
  if (Input.get_key("KeyP")) camera.zoom(2);
  if (Input.get_key("KeyO")) camera.zoom(-2);


  // Get player input
  if (time > move_timer)
  {
    let off_x = 0, off_y = 0;
    if (Input.get_key("KeyW")) { off_y += 1; move_timer = time + 250; }
    if (Input.get_key("KeyS")) { off_y += -1; move_timer = time + 250; }
    if (Input.get_key("KeyA")) { off_x += -1; move_timer = time + 250; }
    if (Input.get_key("KeyD")) { off_x += 1; move_timer = time + 250; }
    
    if (off_x !== 0 && off_y !== 0)
    {

      diagonal_alternate = !diagonal_alternate;
    }

    x_pos += off_x * 8;
    y_pos += off_y * 8;
  }

  // Send input to server
  // Socket.send("input", true);

  // Apply any data from server
  while (Socket.has_message())
  {
    const server_data = Socket.poll();
    // World.apply_server_data(server_data);
  }

  // Render scene
  Renderer.start_draw();

  chunk.draw();
  Renderer.draw_sprite(x_pos, y_pos, sprite);
  
  Renderer.end_draw();


  requestAnimationFrame(tic);
}

function debug_render()
{
  for (let x = -10; x < 10; ++x)
  {
    for (let y = -10; y < 10; ++y)
    {
      if ((x < 4 && x > -4) && (y < 4 && y > -4))
      {
        Renderer.draw_sprite(x * 8, y * 8, spritesheet.get_sprite(4, 8));
        continue;
      }
      let off_x = 0, off_y = 0;
      off_x = x > 0 ? 1 : -1;
      if (y === x)
      {
        off_y -= Math.sign(x);
      }
      else if (y === -x)
      {
        off_y += Math.sign(x);
      }
      else if (y < -x && y < x)
      {
        off_x = 0;
        ++off_y;
      }
      else if ( y > x && y > -x)
      {
        off_x = 0;
        --off_y;
      }
      
      Renderer.draw_sprite(x * 8, y * 8, spritesheet.get_sprite(4 + off_x, 8 + off_y));
    }
  }

  Renderer.draw_sprite(16, 0, spritesheet.get_sprite(7, 5, 2, 2));
}