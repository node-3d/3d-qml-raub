import QtQuick 2.7
import QtQuick.Window 2.7
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.3

Window {
	visible: true
	width: 1280
	height: 720
	color: "#111224"
	title: qsTr("QML Preview")
	
	function eventEmit(type, data) {
		console.log('EVENT', type, JSON.stringify(data));
	}
	
	readonly property var hudModes: ["start", "hud", "esc", "over"]
	
	Image {
		anchors.fill: parent
		source: "_preview.png"
		fillMode: Image.Stretch
	}
	
	Score {
		score: sliderScore.value
	}
	
	Hud {
		id: hud
		mode: hudModes[selectMode.currentIndex]
		hp: sliderHp.value
		charge: sliderCharge.value
		fuel: sliderFuel.value
	}
	
	ColumnLayout {
		id: selectModeBox
		anchors.left: parent.left
		anchors.leftMargin: 20
		width: 140
		HudTextSmall {
			text: 'Mode:'
		}
		ComboBox {
			id: selectMode
			currentIndex: 0
			model: hudModes.slice()
			Layout.alignment: Qt.AlignJustify
		}
	}
	
	Slider {
		id: sliderFuel
		x: 424
		y: 0
		value: 1
		width: 140
		anchors.left: selectModeBox.right
		anchors.leftMargin: 20
	}
	
	Slider {
		id: sliderCharge
		x: 636
		y: 0
		width: 140
		anchors.left: sliderFuel.right
		anchors.leftMargin: 20
	}
	
	Slider {
		id: sliderHp
		x: 211
		y: 0
		stepSize: 1
		value: 100
		maximumValue: 100
		width: 140
		anchors.left: sliderCharge.right
		anchors.leftMargin: 20
	}
	
	Slider {
		id: sliderScore
		x: 844
		y: 0
		stepSize: 100
		value: 0
		maximumValue: 9999
		width: 140
		anchors.left: sliderHp.right
		anchors.leftMargin: 20
	}
}


/*##^## Designer {
    D{i:1;anchors_height:100;anchors_width:100}
}
 ##^##*/
