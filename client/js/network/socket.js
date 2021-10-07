const URL = "ws://localhost:8080";

let socket = null;
let connected = false;

let server_data = [];


function on_open()
{
  connected = true;
}

function on_close()
{
  connected = false;
  setTimeout(() => {
    init();
  }, 1000);
}

function on_message(message)
{
  console.log(message);
}

function init()
{
  socket = new WebSocket(URL);
  socket.binaryType = "arraybuffer";

  socket.onopen = on_open;
  socket.onclose = on_close;
  socket.onerror = on_close;
  socket.onmessage = on_message;
}

function send(id, data)
{
  if (!connected) return;
  console.log(`Sending: ${id} ${data}`);
}

function has_message()
{
  return server_data.length > 0;
}

function poll()
{
  return Serialise.message(server_data.pop());
}

const Socket = Object.freeze({
  init,
  send,
  poll,
  has_message
});

export default Socket;