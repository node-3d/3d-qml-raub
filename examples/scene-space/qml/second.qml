import QtQuick 2.7

Rectangle {
	
	color: 'cyan'
	anchors.fill: parent
	
	Text {
		
		text: qsTr('SECOND!')
		
		font.pixelSize: 14
		font.bold: true
		color: 'red'
		
		anchors.left: parent.left
		anchors.leftMargin: 24
		anchors.top: parent.top
		anchors.topMargin: 24
		
	}
	
}
