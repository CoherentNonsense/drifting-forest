import run_client from "./client";
import Context from "./graphics/context";
import Renderer from "./graphics/renderer";
import Input from "./input";
import Network from "./network/socket";

async function main()
{
  const context = new Context("game-canvas");
  await Renderer.init(context);

  Input.listen(window);
  
  Network.init();

  run_client();
}

main();