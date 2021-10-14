var Sprite;
(function (Sprite) {
    class Spritesheet {
        constructor(size, frame_size) {
            this.size = size;
            this.frame_size = frame_size;
        }
        get_sprite(u, v, width = 1, height = 1) {
            const frame = {
                u: u * this.frame_size,
                v: v * this.frame_size,
                width: width * this.frame_size,
                height: height * this.frame_size,
                size: this.size
            };
            return frame;
        }
    }
    Sprite.Spritesheet = Spritesheet;
})(Sprite || (Sprite = {}));
export default Sprite;
