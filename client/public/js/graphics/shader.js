export default class Shader {
    constructor(webGl, vertex_shader_source, fragment_shader_source) {
        this.webGl = webGl;
        this.compiled = false;
        this.attributes = new Map();
        this.uniforms = new Map();
        this.vertex_shader_id = this.createShader(this.webGl.VERTEX_SHADER, vertex_shader_source);
        this.fragment_shader_id = this.createShader(this.webGl.FRAGMENT_SHADER, fragment_shader_source);
        this.program_id = this.createProgram();
        this.compile();
    }
    compile() {
        if (this.program_id != null) {
            this.compiled = true;
        }
    }
    createShader(type, source) {
        const shader_id = this.webGl.createShader(type);
        this.webGl.shaderSource(shader_id, source);
        this.webGl.compileShader(shader_id);
        const success = this.webGl.getShaderParameter(shader_id, this.webGl.COMPILE_STATUS);
        if (!success) {
            console.log('failed to compile shader');
            console.log(this.webGl.getShaderInfoLog(shader_id));
            this.webGl.deleteShader(shader_id);
        }
        return shader_id;
    }
    createProgram() {
        const program_id = this.webGl.createProgram();
        this.webGl.attachShader(program_id, this.vertex_shader_id);
        this.webGl.attachShader(program_id, this.fragment_shader_id);
        this.webGl.linkProgram(program_id);
        const success = this.webGl.getProgramParameter(program_id, this.webGl.LINK_STATUS);
        if (!success) {
            console.log('failed to link program');
            console.log(this.webGl.getProgramInfoLog(program_id));
            this.webGl.deleteProgram(program_id);
        }
        this.webGl.deleteShader(this.vertex_shader_id);
        this.webGl.deleteShader(this.fragment_shader_id);
        return program_id;
    }
    getUniform(uniform_name) {
        if (!this.uniforms.has(uniform_name)) {
            const location = this.webGl.getUniformLocation(this.program_id, uniform_name);
            this.uniforms.set(uniform_name, location);
        }
        const location = this.uniforms.get(uniform_name);
        if (location === null || location === undefined) {
            throw new Error(`Shader uniform '${uniform_name}' does not exist`);
        }
        return location;
    }
    getAttribute(attrib_name) {
        if (!this.attributes.has(attrib_name)) {
            const location = this.webGl.getAttribLocation(this.program_id, attrib_name);
            this.attributes.set(attrib_name, location);
        }
        const location = this.attributes.get(attrib_name);
        if (location === null || location === undefined) {
            throw new Error(`Shader attribute '${attrib_name}' does not exist'`);
        }
        return location;
    }
    vertexAttribPointer(attrib_name, size, type, normalized, stride, offset) {
        const attrib = this.getAttribute(attrib_name);
        this.webGl.enableVertexAttribArray(attrib);
        this.webGl.vertexAttribPointer(attrib, size, type, normalized, stride, offset);
    }
    use() {
        this.webGl.useProgram(this.program_id);
    }
}
