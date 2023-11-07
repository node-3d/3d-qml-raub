import QtQuick 2.13
import QtQuick.Window 2.13


Window {
	visible: true
	width: 1280
	height: 720
	color: "#111224"
	title: qsTr("QML Preview")
	
	function eventEmit(type, data) {
		console.log('EVENT', type, JSON.stringify(data));
	}
	
	Image {
		id: image
		anchors.fill: parent
		source: "_preview.png"
		fillMode: Image.Stretch
	}
	
	Hud {
		id: hud
		x: 243
		y: 19
		mode: "hud"
	}
}



/*##^## Designer {
	D{i:1;anchors_height:100;anchors_width:100}
}
 ##^##*/
