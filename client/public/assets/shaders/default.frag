#version 300 es
precision mediump float;

in vec2 v_texcoord;
in float v_fade;

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
    vec4 texture = texture(u_texture, new_uv);

    vec3 fade_color = vec3(0.65, 0.95, 0.99);
    float fade_amount = clamp(v_fade, 0.0, 1.0);

    color.a = texture.a;
    color.rgb = ((1.0 - fade_amount) * texture.rgb) + (fade_amount * fade_color);
}