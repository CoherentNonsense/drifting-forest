let socket = new WebSocket("ws://localhost:8080");
socket.binaryType = "arraybuffer";

let ping_timer = 0;
socket.onmessage = (data) => {
  const time = performance.now();
  console.log(time - ping_timer);
}

socket.onopen = () => {
  addEventListener("mousedown", () => {
    ping_timer = performance.now();
    socket.send("Ping");
  });
}
