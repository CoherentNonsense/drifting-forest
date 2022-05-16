namespace Network
{

type ServerDataObj = {
  id: number
};

const URL : string = "ws://localhost:8080";

let socket : WebSocket;
let connected : boolean = false;
const server_data : ServerDataObj[] = new Array();

function on_open() : void
{
  console.log("Connected to server...");
  connected = true;
}

function on_close(_e : Event) : void
{
  console.log("Disconnected from server... ")
  connected = false;
  // setTimeout(() => {
  //   init();
  // }, 5000);
}

function on_message(message : MessageEvent<any>) : void
{
  const view = new Uint16Array(message.data);
  console.log("Incoming message: " + view);
}

export function init() : void
{
  socket = new WebSocket(URL);
  socket.binaryType = "arraybuffer";

  socket.onopen = on_open;
  socket.onclose = on_close;
  socket.onerror = on_close;
  socket.onmessage = on_message;
}

export function send(id : number, data : any) : void
{
  if (!connected)
    return;
  console.log(`Sending: ${id} ${data}`);
  const buffer = new ArrayBuffer(4);
  const view = new Uint16Array(buffer);
  view[0] = id;
  view[1] = data;
  socket.send(buffer);
}

export function has_message() : boolean
{
  return server_data.length > 0;
}

export function poll() : any
{
  // return Serialise.message(server_data.pop());
}

}

addEventListener('mousedown', () => {Network.send(2, 99)});

export default Network;