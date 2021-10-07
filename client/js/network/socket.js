let socket = null;

function init(url)
{
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
}

function send(id, data)
{
  console.log("Sending Packet");
}

const Socket = Object.freeze({
  init,
  send,
});

export default Socket;