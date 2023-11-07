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
	
	id: root
	anchors.fill: parent
	
	objectName: 'hud'
	property real hp: 100
	property real ammo: 1
	
	function getColor(value) {
		const hp256 = value / 100 * root.maxColorValue;
		const oneMinus = root.maxColorValue - hp256;
		const red = oneMinus.toString(16).padStart(2, '0');
		const green = hp256.toString(16).padStart(2, '0');
		const blue = root.blueColorValue.toString(16).padStart(2, '0');
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
			Layout.leftMargin: root.paddingHor
			Layout.bottomMargin: root.paddingVert
			Layout.topMargin: root.paddingVert
			Layout.alignment: Qt.AlignLeft | Qt.AlignBottom
			
			Text {
				text: Math.floor(root.hp)
				
				font.pixelSize: fontSizeHp
				font.bold: true
				font.family: future.name
				color: getColor(root.hp)
				
				style: Text.Raised;
				styleColor: root.shadowColor
			}
			
			HudTextSmall {
				text: 'Health'
				Layout.alignment: Qt.AlignLeft
			}
		}
		
		ColumnLayout {
			Layout.rightMargin: root.paddingHor
			Layout.bottomMargin: root.paddingVert
			Layout.topMargin: root.paddingVert
			Layout.alignment: Qt.AlignRight | Qt.AlignBottom
			
			spacing: 18
			
			Rectangle {
				width: root.ammoBarWidth
				height: root.ammoBarHeight
				color: 'transparent'
				radius: 4
				
				border.color: getColor(root.ammo * 100)
				border.width: 2
				
				Rectangle {
					width: root.ammo * root.ammoBarWidth - 6
					height: root.ammoBarHeight - 6
					y: 3
					x: 3
					radius: 2
					
					border.color: root.shadowColor
					border.width: 1
					
					gradient: Gradient {
						GradientStop { position: 0.0; color: '#fff' }
						GradientStop { position: 1.0; color: '#000' }
					}
					
					transitions: Transition {
						NumberAnimation { properties: 'width'; easing.type: Easing.InOutQuad }
					}
				}
			}
			
			HudTextSmall {
				text: 'Ammo'
				Layout.alignment: Qt.AlignRight
			}
		}
	}
}
