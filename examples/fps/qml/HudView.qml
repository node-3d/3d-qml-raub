import QtQuick 2.7
import QtQuick.Layouts 1.3


Item {
	readonly property int fontSizeHp: 84
	readonly property int ammoBarWidth: 400
	readonly property int ammoBarHeight: 42
	readonly property int paddingHor: 42
	readonly property int paddingVert: 42
	readonly property int maxColorValue: 0xAA
	readonly property int blueColorValue: 0x22
	readonly property string shadowColor: '#333333'
	
	id: hudView
	anchors.fill: parent
	
	objectName: 'hud'
	property real hp: 100
	property real charge: 0
	property real fuel: 1
	
	function getColor(value) {
		const hp256 = Math.min(0xAA, Math.floor(value / 100 * hudView.maxColorValue));
		const oneMinus = hudView.maxColorValue - hp256;
		const red = oneMinus.toString(16).padStart(2, '0');
		const green = hp256.toString(16).padStart(2, '0');
		const blue = hudView.blueColorValue.toString(16).padStart(2, '0');
		return `#${red}${green}${blue}`;
	}
	
	Rectangle {
		anchors.fill: bottomRow
		
		gradient: Gradient {
			GradientStop { position: 0.0; color: '#00000000' }
			GradientStop { position: 1.0; color: '#66000000' }
		}
	}
	
	RowLayout {
		id: bottomRow
		
		anchors.bottom: parent.bottom
		anchors.left: parent.left
		anchors.right: parent.right
		
		ColumnLayout {
			Layout.leftMargin: hudView.paddingHor
			Layout.bottomMargin: hudView.paddingVert
			Layout.topMargin: hudView.paddingVert
			Layout.alignment: Qt.AlignLeft | Qt.AlignBottom
			
			Text {
				text: Math.floor(hudView.hp)
				
				font.pixelSize: fontSizeHp
				font.bold: true
				font.family: future.name
				color: getColor(hudView.hp)
				
				style: Text.Raised;
				styleColor: hudView.shadowColor
			}
			
			HudTextSmall {
				text: 'Health'
				Layout.alignment: Qt.AlignLeft
			}
		}
		
		ColumnLayout {
			Layout.rightMargin: hudView.paddingHor
			Layout.bottomMargin: hudView.paddingVert
			Layout.topMargin: hudView.paddingVert
			Layout.alignment: Qt.AlignRight | Qt.AlignBottom
			
			spacing: 18
			
			Rectangle {
				width: hudView.ammoBarWidth
				height: hudView.ammoBarHeight
				color: 'transparent'
				radius: 4
				
				border.color: getColor(hudView.fuel * 100)
				border.width: 2
				
				Rectangle {
					width: hudView.fuel * hudView.ammoBarWidth - 6
					height: hudView.ammoBarHeight - 6
					radius: 2
					
					anchors.right: parent.right
					anchors.rightMargin: 3
					anchors.top: parent.top
					anchors.topMargin: 3
					
					border.color: hudView.shadowColor
					border.width: 1
					color: 'green'
					
					transitions: Transition {
						NumberAnimation { properties: 'width'; easing.type: Easing.InOutQuad }
					}
				}
				
				Rectangle {
					width: hudView.charge * hudView.ammoBarWidth - 6
					height: hudView.ammoBarHeight * 0.5 - 6
					radius: 2
					
					anchors.right: parent.right
					anchors.rightMargin: 3
					anchors.bottom: parent.bottom
					anchors.bottomMargin: 3
					
					border.color: hudView.shadowColor
					border.width: 1
					color: 'orange'
					
					transitions: Transition {
						NumberAnimation { properties: 'width'; easing.type: Easing.InOutQuad }
					}
				}
			}
			
			HudTextSmall {
				text: 'Charge'
				Layout.alignment: Qt.AlignRight
			}
		}
	}
}
