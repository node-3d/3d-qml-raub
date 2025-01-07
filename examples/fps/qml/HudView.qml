import QtQuick


Item {
	readonly property int ammoBarWidth: width / 3
	readonly property int ammoBarHeight: ammoBarWidth / 8
	readonly property int fontSizeHp: ammoBarHeight * 2
	readonly property int fontSizeCaption: ammoBarHeight
	readonly property int paddingHor: 42
	readonly property int paddingVert: 42
	readonly property int maxColorValue: 0xAA
	readonly property int blueColorValue: 0x22
	readonly property string shadowColor: '#333333'
	
	id: hudView
	anchors.fill: parent
	
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
	
	Item {
		id: bottomRow
		
		anchors.bottom: parent.bottom
		anchors.left: parent.left
		anchors.right: parent.right
		
		Column {
			anchors.bottom: parent.bottom
			anchors.left: parent.left
			
			leftPadding: hudView.paddingHor
			bottomPadding: hudView.paddingVert
			
			HpTextLarge {
				text: Math.floor(hudView.hp)
				color: hudView.getColor(hudView.hp)
				font.pixelSize: hudView.fontSizeHp
			}
			
			HudTextSmall {
				text: 'Health'
				font.pixelSize: hudView.fontSizeCaption
			}
		}
		
		Column {
			id: column
			anchors.bottom: parent.bottom
			anchors.right: parent.right
			
			rightPadding: hudView.paddingHor
			bottomPadding: hudView.paddingVert
			
			spacing: hudView.fontSizeHp / 4
			
			Item {
				width: textCharge.width
				height: hudView.ammoBarWidth
				
				Rectangle {
					anchors.bottom: parent.bottom
					anchors.right: parent.right
					height: hudView.ammoBarWidth
					width: hudView.ammoBarHeight
					color: 'transparent'
					radius: 4
					
					border.color: hudView.getColor(hudView.fuel * 100)
					border.width: 2
					
					Rectangle {
						height: hudView.fuel * hudView.ammoBarWidth - 6
						width: hudView.ammoBarHeight - 6
						radius: 2
						
						anchors.right: parent.right
						anchors.rightMargin: 3
						anchors.bottom: parent.bottom
						anchors.bottomMargin: 3
						
						border.color: hudView.shadowColor
						border.width: 2
						color: 'green'
						
						transitions: Transition {
							NumberAnimation { properties: 'width'; easing.type: Easing.InOutQuad }
						}
					}
					
					Rectangle {
						height: hudView.charge * hudView.ammoBarWidth - 6
						width: hudView.ammoBarHeight * 0.5 - 6
						radius: 2
						
						anchors.right: parent.right
						anchors.rightMargin: 3
						anchors.bottom: parent.bottom
						anchors.bottomMargin: 3
						
						border.color: hudView.shadowColor
						border.width: 2
						color: 'orange'
						
						transitions: Transition {
							NumberAnimation { properties: 'width'; easing.type: Easing.InOutQuad }
						}
					}
				}
			}
			
			HudTextSmall {
				id: textCharge
				text: 'Charge'
				horizontalAlignment: Text.AlignRight
				font.pixelSize: hudView.fontSizeCaption
			}
		}
	}
	
	Image {
		width: hudView.ammoBarHeight
		height: hudView.ammoBarHeight
		anchors.centerIn: parent
		source: 'crosshair121.png'
		fillMode: Image.PreserveAspectFit
	}
}





/*##^## Designer {
    D{i:0;autoSize:true;height:720;width:1280}
}
 ##^##*/
