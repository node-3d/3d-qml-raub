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
	
	RowLayout {
		x: 20
		spacing: 20
		
		ColumnLayout {
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
		
		ColumnLayout {
			width: 140
			HudTextSmall {
				text: 'Fuel:'
			}
			Slider {
				id: sliderFuel
				value: 1
				Layout.alignment: Qt.AlignJustify
			}
		}
		
		ColumnLayout {
			width: 140
			HudTextSmall {
				text: 'Charge:'
			}
			Slider {
				id: sliderCharge
				Layout.alignment: Qt.AlignJustify
			}
		}
		
		ColumnLayout {
			width: 140
			HudTextSmall {
				text: 'HP:'
			}
			Slider {
				id: sliderHp
				stepSize: 1
				value: 100
				maximumValue: 100
				Layout.alignment: Qt.AlignJustify
			}
		}
		
		ColumnLayout {
			width: 140
			HudTextSmall {
				text: 'Score:'
			}
			Slider {
				id: sliderScore
				stepSize: 100
				value: 0
				maximumValue: 9999
				Layout.alignment: Qt.AlignJustify
			}
		}
		
		HudTextSmall {
			text: 'Green'
			color: 'green'
			MouseArea {
				anchors.fill: parent
				onClicked: hud.flashColor('green')
			}
		}
		
		HudTextSmall {
			text: 'Red'
			color: 'red'
			MouseArea {
				anchors.fill: parent
				onClicked: hud.flashColor('red')
			}
		}
	}
}


/*##^## Designer {
    D{i:1;anchors_height:100;anchors_width:100}
}
 ##^##*/
