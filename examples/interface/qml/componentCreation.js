var component;
var sprite;

function createSpriteObjects(a) {
	console.log(a);
	component = Qt.createComponent("Dynamic.qml");
	sprite = component.createObject(appWindow, {"x": 100, "y": 100});

	if (sprite == null) {
		console.log("Error creating object");
	}
}