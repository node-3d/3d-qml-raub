import QtQuick 2.7
import QtQuick.Layouts 1.3


MouseArea {
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	
	readonly property int fontSizeEsc: 48
	readonly property string shadowColor: '#333333'
	readonly property string textColor: '#CCCCCC'
	readonly property string textColorHover: '#E5E0EE'
	readonly property int paddingHor: 20
	
	id: button
	
	signal pressed
	
	property alias text: buttonText.text
	
	hoverEnabled: true
	width: buttonText.width + 2 * paddingHor
	height: buttonText.height
	
	onClicked: pressed()
	
	Text {
		id: buttonText
		text: 'EscMenuItem'
		
		font.pixelSize: button.fontSizeEsc
		font.bold: true
		font.family: future.name
		color: button.containsMouse ? button.textColorHover : button.textColor
		
		style: Text.Raised;
		styleColor: button.shadowColor
	}
}
