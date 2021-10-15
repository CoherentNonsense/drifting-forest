import run_client from "./client.js";
import Context from "./graphics/context.js";
import Renderer from "./graphics/renderer.js";
import Input from "./input.js";
import Network from "./network/socket.js";

async function main()
{
  const uiHTML = document.getElementById("game-ui");
  const context = new Context("game-canvas");

  await Renderer.init(context);
  Input.listen(window);
  Network.init();
  run_client();
}

main();