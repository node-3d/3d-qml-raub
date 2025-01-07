import QtQuick


Text {
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	
	readonly property string colorNormal: '#CCCCCC'
	readonly property string colorHover: '#E5E0EE'
	
	signal pressed
	
	text: 'Menu Item'
	rightPadding: 20
	leftPadding: 20
	
	font.pixelSize: 48
	font.bold: true
	font.family: future.name
	color: pressable.containsMouse ? colorHover : colorNormal
	
	style: Text.Raised;
	styleColor: '#333333'
	
	MouseArea {
		id: pressable
		anchors.fill: parent
		hoverEnabled: true
		onClicked: parent.pressed()
	}
}
