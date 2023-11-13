import QtQuick 2.7


Text {
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	
	readonly property int fontSizeHp: 84
	readonly property string shadowColor: '#333333'
	
	text: '100'
	
	font.pixelSize: fontSizeHp
	font.bold: true
	font.family: future.name
	color: 'green'
	
	style: Text.Raised;
	styleColor: hudView.shadowColor
}
