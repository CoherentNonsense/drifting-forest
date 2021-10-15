const PRESSED = true;
const RELEASED = false;
const keyboard_states = new Map();
function add_button(key) {
    keyboard_states.set(key, RELEASED);
}
function get_key(key) {
    return keyboard_states.get(key);
}
function on_key(event) {
    const code = event.code;
    if (keyboard_states.get(code) === undefined) {
        return;
    }
    event.preventDefault();
    const key_state = event.type === 'keydown' ? PRESSED : RELEASED;
    if (keyboard_states.get(code) === key_state) {
        return;
    }
    keyboard_states.set(code, key_state);
}
function listen(window) {
    ["keydown", "keyup"].forEach((event_name) => {
        window.addEventListener(event_name, (event) => {
            on_key(event);
        });
    });
}
const Input = Object.freeze({
    listen,
    add_button,
    get_key
});
export default Input;
