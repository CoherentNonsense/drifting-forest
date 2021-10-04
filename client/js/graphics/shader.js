export default class Shader
{
    constructor(webGl, vertex_shader_source, fragment_shader_source)
    {
        this.webGl = webGl;
        this.compiled = false;
        this.attributes = [];
        this.uniforms = [];

        this.compile(vertex_shader_source, fragment_shader_source)
    }

    compile(vertexShaderSource, fragmentShaderSource)
    {
        this.vertexShaderId = this.createShader(this.webGl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShaderId = this.createShader(this.webGl.FRAGMENT_SHADER, fragmentShaderSource);
        
        if (!this.vertexShaderId || !this.fragmentShaderId)
        {
            return;
        }

        this.programId = this.createProgram();

        if (this.programId != null)
        {
            this.compiled = true;
        }
    }

    createShader(type, source)
    {
        const shaderId = this.webGl.createShader(type);
        this.webGl.shaderSource(shaderId, source);
        this.webGl.compileShader(shaderId);

        const success = this.webGl.getShaderParameter(shaderId, this.webGl.COMPILE_STATUS);
        if (!success)
        {
            console.log('failed to compile shader');
            console.log(this.webGl.getShaderInfoLog(shaderId));
            this.webGl.deleteShader(shaderId);
            return null;
        }

        return shaderId;
    }

    createProgram()
    {
        const programId = this.webGl.createProgram();
        this.webGl.attachShader(programId, this.vertexShaderId);
        this.webGl.attachShader(programId, this.fragmentShaderId);
        this.webGl.linkProgram(programId);

        const success = this.webGl.getProgramParameter(programId, this.webGl.LINK_STATUS);
        if (!success)
        {
            console.log('failed to link program');
            console.log(this.webGl.getProgramInfoLog(programId));
            this.webGl.deleteProgram(programId);
            return null;
        }

        this.webGl.deleteShader(this.vertexShaderId);
        this.webGl.deleteShader(this.fragmentShaderId);

        return programId;
    }

    getUniform(uniformName)
    {
        if (!this.uniforms[uniformName])
        {
            this.uniforms[uniformName] = this.webGl.getUniformLocation(this.programId, uniformName);
        }

        return this.uniforms[uniformName] || null;
    }

    getAttribute(attribName)
    {
        if (!this.attributes[attribName])
        {
            this.attributes[attribName] = this.webGl.getAttribLocation(this.programId, attribName);
        }

        return this.attributes[attribName] || null;
    }

    vertexAttribPointer(attribName, size, type, normalized, stride, offset)
    {
        const attrib = this.getAttribute(attribName);
        this.webGl.enableVertexAttribArray(attrib);
        this.webGl.vertexAttribPointer(attrib, size, type, normalized, stride, offset);
    }

    use()
    {
        this.webGl.useProgram(this.programId);
    }
}