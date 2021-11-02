import run_client from "./client.js";
import Context from "./graphics/context.js";
import Renderer from "./graphics/renderer.js";
import Input from "./input.js";
import Socket from "./network/socket.js";

async function main()
{
  const context = new Context("game-canvas");
  await Renderer.init(context);

  Input.listen(window);
  
  Socket.init();

  run_client();
}

main();