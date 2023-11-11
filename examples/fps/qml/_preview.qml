import QtQuick 2.7
import QtQuick.Window 2.7
import QtQuick.Controls 1.4

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
		anchors.fill: parent
		source: "_preview.png"
		fillMode: Image.Stretch
	}
	
	Score {
		score: 123
	}
	
	Hud {
		id: hud
		mode: "start"
	}
	
	ComboBox {
		id: selectMode
		currentIndex: 0
		model: ["start", "hud", "esc", "over"]
		width: 200
		onCurrentIndexChanged: {
			if (selectMode.model.length) {
				hud.mode = selectMode.model[currentIndex];
			}
		}
		
	}
}


/*##^## Designer {
    D{i:1;anchors_height:100;anchors_width:100}
}
 ##^##*/
