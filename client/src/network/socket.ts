import Packet from "./packet";

namespace Network
{
  const URL : string = "ws://localhost:8080";

  let socket : WebSocket;
  let connected : boolean = false;
  const serverData : Packet[] = new Array();

  function on_open() : void
  {
    console.log("Connected to server...");
    connected = true;
    send(2, 99);
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
    const packet = Packet.fromArrayBuffer(message.data);
    serverData.push(packet);
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

  export function hasMessage() : boolean
  {
    return serverData.length > 0;
  }

  export function poll() : Packet
  {
    const packet = serverData.pop() as Packet;
    
    return packet;
  }

}

export default Network;