import QtQuick 2.7


Text {
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	
	text: '100'
	
	font.pixelSize: 84
	font.bold: true
	font.family: future.name
	color: 'green'
	
	style: Text.Outline
	styleColor: '#333333'
}
