import Renderer from "./graphics/renderer";
import Sprite from "./graphics/spritesheet";
import Input from "./input";
import Socket from "./network/socket";
import Camera from "./graphics/camera";
import { vec2 } from "gl-matrix";

export let deltaTime : number = 0;

const buttons = ["KeyW", "KeyA", "KeyS", "KeyD", "KeyP", "KeyO", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
buttons.forEach((button) => {
  Input.add_button(button);
});

const playerSpritesheet = new Sprite.Spritesheet(512, 32);
const playerSprite = playerSpritesheet.getFrame(0, 0);
const playerSpriteAnim = new Sprite.AnimatedSprite(playerSprite, 4, 0.18);
const flowerSprite = playerSpritesheet.getFrame(0, 1);
const groundSprite = playerSpritesheet.getFrame(1, 1);


let lastTime = 0;
let yPos = 0;
let xPos = 0;
const speed = 85;

const camera = new Camera();
camera.setScale(4);

addEventListener('wheel', (e : WheelEvent) => {
  if (e.deltaY > 0) {
    camera.zoom(-1);
  } else {
    camera.zoom(1);
  }
});

export default async function run_client()
{
  requestAnimationFrame(tic);
}

/**
 * Called every frame
 */
let timer = 0;
function tic(time : number) : void
{
  // Calculate timing
  deltaTime = (time - lastTime) / 1000;
  lastTime = time;
    
  // Get player input
  let dirX = 0, dirY = 0;
  if (Input.get_key("KeyW")) { dirY += 1 * deltaTime * speed }
  if (Input.get_key("KeyS")) { dirY += -1 * deltaTime * speed }
  if (Input.get_key("KeyA")) { dirX += -1 * deltaTime * speed }
  if (Input.get_key("KeyD")) { dirX += 1 * deltaTime * speed }
  
  if (dirX !== 0 && dirY !== 0)
  {
    dirX *= 0.707;
    dirY *= 0.707;
  }
  playerSpriteAnim.update(deltaTime);

  xPos += dirX;
  yPos += dirY;

    // Send input to server
    // Socket.send("input", true);
  
    // Apply any data from server
    while (Socket.has_message())
    {
      const serverData = Socket.poll();
      // World.apply_server_data(server_data);
    }
  
    camera.moveTo(vec2.fromValues(xPos, yPos));
    // Render scene
    Renderer.start_draw(camera);
  
    // debug_render();
    // chunk.draw();
    for (let x = 0; x < 32; ++x) {
      for (let y = 0; y < 16; ++y) {
        if (Math.sin((x - y * 0.5)) > -0) {
          Renderer.draw_sprite(x * 32, y * 32, flowerSprite);
        } else {
          Renderer.draw_sprite(x * 32, y * 32, groundSprite);
        }
      }
    Renderer.draw_sprite(Math.round(xPos), Math.round(yPos), playerSpriteAnim.getFrame());
    
    Renderer.end_draw();
  }


  requestAnimationFrame(tic);
}