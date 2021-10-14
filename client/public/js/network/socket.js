var Network;
(function (Network) {
    const URL = "ws://localhost:8080";
    let socket = null;
    let connected = false;
    const server_data = new Array();
    function on_open() {
        connected = true;
    }
    function on_close() {
        connected = false;
        setTimeout(() => {
            init();
        }, 1000);
    }
    function on_message(message) {
        console.log(message);
    }
    function init() {
        socket = new WebSocket(URL);
        socket.binaryType = "arraybuffer";
        socket.onopen = on_open;
        socket.onclose = on_close;
        socket.onerror = on_close;
        socket.onmessage = on_message;
    }
    Network.init = init;
    function send(id, data) {
        if (!connected)
            return;
        console.log(`Sending: ${id} ${data}`);
    }
    Network.send = send;
    function has_message() {
        return server_data.length > 0;
    }
    Network.has_message = has_message;
    function poll() {
    }
    Network.poll = poll;
})(Network || (Network = {}));
export default Network;
