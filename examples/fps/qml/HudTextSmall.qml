import QtQuick


Text {
	FontLoader { id: bookxel; source: 'fonts/Bookxel.otf' }
	
	readonly property int fontSizeSmall: 36
	readonly property string shadowColor: '#333333'
	
	text: 'HudTextSmall'
	
	font.pixelSize: fontSizeSmall
	font.bold: true
	font.family: bookxel.name
	color: 'white'
	antialiasing: true
	
	style: Text.Outline;
	styleColor: shadowColor
}
