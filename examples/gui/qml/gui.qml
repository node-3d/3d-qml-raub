import QtQuick
import QtQuick.Controls.Basic
import QtQuick.Controls

Column {
	anchors.fill: parent
	anchors.margins: 24
	spacing: 24
	
	CustomButton {
		id: button
		objectName: 'myButton1'
		
		text: qsTr('Hello world!')
		
		onClicked: {
			console.log('o hai');
			eventEmit('ohai', { text: 'its me' });
		}
		
		function func(x) {
			console.log('func called', x);
		}
	}
	
	TextArea {
		text: 'Hello'
		color: 'black'
		font.pixelSize: 24
	}
}
