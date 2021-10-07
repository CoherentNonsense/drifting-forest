import run_client from "./client.js";
import Context from "./graphics/context.js";
import Renderer from "./graphics/renderer.js";
import Input from "./input.js";
import Socket from "./network/socket.js";

async function main()
{
  const uiHTML = document.getElementById("game-ui");
  const context = new Context("game-canvas");

  await Renderer.init(context);
  Input.listen(window);
  Socket.init("ws://localhost:8080");
  run_client();
}

main();