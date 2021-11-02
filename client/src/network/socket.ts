namespace Socket
{

type ServerDataObj = {
  id: number
};

const URL : string = "ws://localhost:8080";

let socket : WebSocket | null = null;
let connected : boolean = false;
const server_data : ServerDataObj[] = new Array();

function on_open() : void
{
  connected = true;
}

function on_close() : void
{
  connected = false;
  setTimeout(() => {
    init();
  }, 1000);
}

function on_message(message : any) : void
{
  console.log(message);
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

export default Socket;