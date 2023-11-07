import QtQuick 2.7


Text {
	readonly property int fontSizeSmall: 36
	readonly property string shadowColor: '#333333'
	
	text: 'HudTextSmall'
	
	font.pixelSize: fontSizeSmall
	font.bold: true
	font.family: bookxel.name
	color: 'white'
	antialiasing: true
	
	style: Text.Raised;
	styleColor: shadowColor
}
