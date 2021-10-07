const Deserialise = Object.freeze({
  server_message: (server_message_buffer) => {
    const server_message = { id: undefined };

    const int8View = new Int8Array(server_message_buffer);
    server_message.id = int8View[0];

    return server_message;
  }
});

const Serialise = Object.freeze({
  move: (message) => {
    
  }
});

export default Serialise;