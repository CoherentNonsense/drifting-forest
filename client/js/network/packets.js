const MAX_BUFFER_SIZE = 100;
const buffer = new ArrayBuffer(MAX_BUFFER_SIZE);
const uint8 = new Uint8Array(buffer);
const int8 = new Int8Array(buffer);

function slice(buffer, bytes)
{
  return buffer.slice(0, bytes * 4);
}

export default packets = {
  move: {
    pack: (x, y) => {
      uint8[0] = 0;
      int8[1] = x;
      int8[2] = y;
      int8[3] = z;
      return slice(buffer, 4);
    }
  }
};