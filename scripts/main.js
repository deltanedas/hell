require("hell/no");

var buffer, shader, rabbit;

function beginDraw() {
	buffer.resize(Core.graphics.width, Core.graphics.height);
	buffer.begin(Color.clear);
}

function endDraw() {
	buffer.end();

	shader.bind();
	shader.setUniformf("u_time", Time.globalTime() / 100.0);

	Draw.blit(buffer, shader);
}

Events.on(ClientLoadEvent, e => {
	buffer = new FrameBuffer(Core.graphics.width, Core.graphics.height);
	rabbit = Core.atlas.find("rabbit");
	shader = new Shader(readString("shaders/screenspace.vert"), readString("shaders/hell.frag"));
});

Events.run(Trigger.preDraw, beginDraw);

Events.run(Trigger.uiDrawBegin, () => {
	if (Vars.state.isMenu()) {
		beginDraw();
	}
});

Events.run(Trigger.uiDrawEnd, endDraw);
