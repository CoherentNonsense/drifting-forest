export default class Shader
{
  public compiled : boolean;
  private webGl : WebGL2RenderingContext;
  private attributes : Map<string, number | null>;
  private uniforms : Map<string, WebGLUniformLocation | null>;

  private program_id : WebGLProgram;
  private vertex_shader_id : WebGLShader;
  private fragment_shader_id : WebGLShader;

  constructor(webGl : WebGL2RenderingContext, vertex_shader_source : string, fragment_shader_source : string)
  {
    this.webGl = webGl;
    this.compiled = false;
    this.attributes = new Map();
    this.uniforms = new Map();

    this.vertex_shader_id = this.createShader(this.webGl.VERTEX_SHADER, vertex_shader_source);
    this.fragment_shader_id = this.createShader(this.webGl.FRAGMENT_SHADER, fragment_shader_source);
    this.program_id = this.createProgram() as WebGLProgram;

    this.compile();
  }

  compile()
  {
    if (this.program_id != null)
    {
      this.compiled = true;
    }
  }

  createShader(type : number, source : string) : WebGLShader
  {
    const shader_id : WebGLShader = this.webGl.createShader(type) as WebGLShader;
    this.webGl.shaderSource(shader_id, source);
    this.webGl.compileShader(shader_id);

    const success : boolean = this.webGl.getShaderParameter(shader_id, this.webGl.COMPILE_STATUS);
    if (!success)
    {
      console.log('failed to compile shader');
      console.log(this.webGl.getShaderInfoLog(shader_id));
      this.webGl.deleteShader(shader_id);
    }

    return shader_id;
  }

  createProgram() : WebGLProgram | null
  {
    const program_id = this.webGl.createProgram() as WebGLProgram;
    this.webGl.attachShader(program_id, this.vertex_shader_id);
    this.webGl.attachShader(program_id, this.fragment_shader_id);
    this.webGl.linkProgram(program_id);

    const success = this.webGl.getProgramParameter(program_id, this.webGl.LINK_STATUS);
    if (!success)
    {
      console.log('failed to link program');
      console.log(this.webGl.getProgramInfoLog(program_id));
      this.webGl.deleteProgram(program_id);
    }

    this.webGl.deleteShader(this.vertex_shader_id);
    this.webGl.deleteShader(this.fragment_shader_id);

    return program_id;
  }
  
  getUniform(uniform_name : string) : WebGLUniformLocation
  {
    if (!this.uniforms.has(uniform_name))
    {
      const location = this.webGl.getUniformLocation(this.program_id, uniform_name);
      this.uniforms.set(uniform_name, location);
    }

    const location = this.uniforms.get(uniform_name);
    if (location === null || location === undefined)
    {
      throw new Error(`Shader uniform '${uniform_name}' does not exist`);
    }

    return location;
  }

  getAttribute(attrib_name : string) : number
  {
    if (!this.attributes.has(attrib_name))
    {
      const location = this.webGl.getAttribLocation(this.program_id, attrib_name);
      this.attributes.set(attrib_name, location);
    }

    const location = this.attributes.get(attrib_name);
    if (location === null || location === undefined)
    {
      throw new Error(`Shader attribute '${attrib_name}' does not exist'`);
    }

    return location;
  }

  vertexAttribPointer(attrib_name : string, size : number, type : number, normalized : boolean, stride : number, offset : number) : void
  {
    const attrib = this.getAttribute(attrib_name);
    this.webGl.enableVertexAttribArray(attrib);
    this.webGl.vertexAttribPointer(attrib, size, type, normalized, stride, offset);
  }

  use() : void
  {
    this.webGl.useProgram(this.program_id);
  }
}