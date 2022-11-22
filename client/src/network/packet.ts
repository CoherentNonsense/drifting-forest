export default class Packet {
  private buffer: ArrayBuffer;
  private front: number;
  
  // only called inside this class
  private constructor(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.front = 0;
  }
  
  // initialisers
  // ------------
  static empty() : Packet {
    const buffer = new ArrayBuffer(1);
    const packet = new Packet(buffer);
    
    return packet;
  }

  static fromArrayBuffer(buffer: ArrayBuffer) : Packet {
    const packet = new Packet(buffer);
    
    return packet;
  }
  
  // methods
  // -------
  read_u16() : number {
    const size = 2;

    const view = new Uint16Array(this.buffer);
    const data = view[Math.ceil(this.front / size)];
    this.front += size;

    return data;
  }    
}    
