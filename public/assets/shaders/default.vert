#version 300 es

uniform mat4 u_projection;
uniform mat4 u_view;

in vec4 a_position;
in vec2 a_texcoord;

out vec2 v_texcoord;

void main()
{
    v_texcoord = a_texcoord;
    gl_Position = u_projection * u_view * a_position;
}