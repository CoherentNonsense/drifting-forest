import Renderer from "./graphics/renderer.js";
import Spritesheet from "./graphics/spritesheet.js";
import Input from "./input.js";
import Socket from "./network/socket.js";

Input.add_button("KeyW");
Input.add_button("KeyA");
Input.add_button("KeyS");
Input.add_button("KeyD");
const spritesheet = new Spritesheet(512, 8);
const sprite = spritesheet.get_sprite(3, 2, 1, 1);
let last_time = 0;
let move_timer = 0;
let y_pos = 0;
let x_pos = 0;


export default function run_client()
{
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
    if (Input.get_key("KeyA")) { x_pos -= 8; move_timer = time + 250; }
    if (Input.get_key("KeyS")) { y_pos -= 8; move_timer = time + 250; }
    if (Input.get_key("KeyD")) { x_pos += 8; move_timer = time + 250; }
    if (Input.get_key("KeyW")) { y_pos += 8; move_timer = time + 250; }
  }


  // Send input to server

  // Apply any data from server


  // Render scene
  Renderer.start_draw();

  Renderer.draw_sprite(x_pos, y_pos, sprite);

  Renderer.end_draw();


  // End of tic
  requestAnimationFrame(tic);
}