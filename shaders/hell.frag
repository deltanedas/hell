uniform sampler2D u_texture;
uniform float u_time;

varying vec2 v_texCoords;

void main() {
	vec2 uv = v_texCoords * 8.0;
	uv.y += cos(u_time * 0.85 + uv.x);
	uv.x += sin(u_time + uv.y);
	uv += sin(u_time + uv * 3.1415) + sin(u_time + uv.x * uv.y * 0.42);

	uv = mod(uv, 1.0);
	gl_FragColor = texture2D(u_texture, uv);
}
