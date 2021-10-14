const PRESSED = true;
const RELEASED = false;

const keyboard_states : Map<string, boolean> = new Map();

function add_button(key : string)
{
  keyboard_states.set(key, RELEASED);
}

function get_key(key : string)
{
  return keyboard_states.get(key);
}

function on_key(event : KeyboardEvent)
{
  const code = event.code;

  if (keyboard_states.get(code) === undefined)
  {
    return;
  }

  event.preventDefault();

  const key_state = event.type === 'keydown' ? PRESSED : RELEASED;

  if (keyboard_states.get(code) === key_state) {
    return;
  }

  keyboard_states.set(code, key_state);
}

function listen(window : Window)
{
  ["keydown", "keyup"].forEach((event_name) => {
    window.addEventListener(event_name, (event) => {
      on_key(event as KeyboardEvent);
    });
  });
}

const Input = Object.freeze({
  listen,
  add_button,
  get_key
});

export default Input;