import QtQuick 2.7

Rectangle {
	
	color: 'transparent'
	anchors.fill: parent
	
	Button {
		
		objectName: 'myButton1'
		
		text: qsTr('Hello world!')
		
		onClicked: { console.log('o hai'); cb.call('ohai', { text: 'its me' }) }
		
		anchors.left: parent.left
		anchors.leftMargin: 24
		anchors.top: parent.top
		anchors.topMargin: 24
		
	}
	
}
