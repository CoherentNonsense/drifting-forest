import Renderer from "./graphics/renderer.js";
import Spritesheet from "./graphics/spritesheet.js";
import Input from "./input.js";
import Socket from "./network/socket.js";
import World from "./game/world.js";
import Chunk from "./game/chunk.js";

Input.add_button("KeyW");
Input.add_button("KeyA");
Input.add_button("KeyS");
Input.add_button("KeyD");

const spritesheet = new Spritesheet(512, 8);
const sprite = spritesheet.get_sprite(3, 0);

let last_time = 0;
let move_timer = 0;
let y_pos = 0;
let x_pos = 0;
let diagonal_alternate = false;

const chunk = new Chunk();

export default function run_client()
{
  Socket.init();
  requestAnimationFrame(tic);
}

/**
 * Called every frame
 */
function tic(time)
{
  // Calculate timing
  const delta_time = (time - last_time) / 1000;
  last_time = time;

  // Get player input
  if (time > move_timer)
  {
    let off_x = 0, off_y = 0;
    if (Input.get_key("KeyW")) { off_y = 1; move_timer = time + 250; }
    if (Input.get_key("KeyS")) { off_y = -1; move_timer = time + 250; }
    if (Input.get_key("KeyA")) { off_x = -1; move_timer = time + 250; }
    if (Input.get_key("KeyD")) { off_x = 1; move_timer = time + 250; }

    if (off_x !== 0 && off_y !== 0)
    {

      diagonal_alternate = !diagonal_alternate;
    }

    x_pos += off_x * 8;
    y_pos += off_y * 8;
  }

  // Send input to server
  Socket.send("input", true);

  // Apply any data from server
  while (Socket.has_message())
  {
    const server_data = Socket.poll();
    World.apply_server_data(server_data);
  }

  // Render scene
  Renderer.start_draw();

  debug_render();
  // chunk.draw();
  Renderer.draw_sprite(x_pos, y_pos, sprite);
  
  Renderer.end_draw();


  // End of tic
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