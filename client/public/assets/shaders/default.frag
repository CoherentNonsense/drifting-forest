#version 300 es
precision mediump float;
in vec2 v_texcoord;
uniform sampler2D u_texture;
out vec4 color;

void main()
{
    vec2 new_uv = v_texcoord;
    new_uv.x = (new_uv.x) * 512.0f;
    new_uv.y = (new_uv.y) * 512.0f;
    new_uv.x = floor(new_uv.x);
    new_uv.y = floor(new_uv.y);
    new_uv.x /= 512.0f;
    new_uv.y /= 512.0f;
    color = texture(u_texture, new_uv);
}