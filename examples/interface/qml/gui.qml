import QtQuick 2.7
import "componentCreation.js" as MyScript

Rectangle {
	color: 'transparent'
	anchors.fill: parent
	id: appWindow
	Button {
		text: qsTr('Hello world!')
		
		onClicked: { console.log('suka') }
		
		anchors.left: parent.left
		anchors.leftMargin: 24
		anchors.top: parent.top
		anchors.topMargin: 24
	}

	Component.onCompleted: MyScript.createSpriteObjects('34');
}
