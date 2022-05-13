import run_client from "./client";
import Context from "./graphics/context";
import Renderer from "./graphics/renderer";
import Input from "./input";
import Socket from "./network/socket";

async function main()
{
  const context = new Context("game-canvas");
  await Renderer.init(context);

  Input.listen(window);
  
  Socket.init();

  run_client();
}

main();