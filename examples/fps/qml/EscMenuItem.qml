import QtQuick 2.7
import QtQuick.Layouts 1.3


Item {
	readonly property int fontSizeEsc: 48
	readonly property string shadowColor: '#333333'
	readonly property string textColor: '#CCCCCC'
	readonly property string textColorHover: '#E5E0EE'
	readonly property int paddingHor: 20
	
	id: button
	
	signal pressed
	
	property alias text: buttonText.text
	
	width: buttonText.width + 2 * paddingHor
	height: buttonText.height
	
	Text {
		id: buttonText
		text: 'EscMenuItem'
		
		font.pixelSize: button.fontSizeEsc
		font.bold: true
		font.family: future.name
		color: mouseArea.containsMouse ? button.textColorHover : button.textColor
		
		style: Text.Raised;
		styleColor: button.shadowColor
	}
	
	MouseArea {
		id: mouseArea
		hoverEnabled: true
		anchors.fill: parent
		onClicked: parent.pressed()
	}
}
