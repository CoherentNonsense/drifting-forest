#version 300 es

uniform vec3 u_offset;
uniform float u_scale;

in vec4 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;
out float v_fade;

void main()
{
    gl_Position = a_position + vec4(u_offset, 0.0);
    gl_Position.xyz *= u_scale;
    v_texcoord = a_texcoord;
    
    // range [min, max]
    v_fade = (u_offset.z - a_position.z) * 0.0625;
}