var Socket;
(function (Socket) {
    const URL = "ws://localhost:8080";
    let socket = null;
    let connected = false;
    const server_data = new Array();
    function on_open() {
        console.log("Connected to server...");
        connected = true;
    }
    function on_close(_e) {
        console.log("Disconnected from server... ");
        connected = false;
        setTimeout(() => {
            init();
        }, 5000);
    }
    function on_message(message) {
        const view = new Uint8Array(message.data);
        console.log("Incoming message: " + view);
    }
    function init() {
        socket = new WebSocket(URL);
        socket.binaryType = "arraybuffer";
        socket.onopen = on_open;
        socket.onclose = on_close;
        socket.onerror = on_close;
        socket.onmessage = on_message;
    }
    Socket.init = init;
    function send(id, data) {
        if (!connected)
            return;
        console.log(`Sending: ${id} ${data}`);
    }
    Socket.send = send;
    function has_message() {
        return server_data.length > 0;
    }
    Socket.has_message = has_message;
    function poll() {
    }
    Socket.poll = poll;
})(Socket || (Socket = {}));
export default Socket;
