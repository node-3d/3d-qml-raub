import QtQuick 2.7
import QtQuick.Layouts 1.3


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		EscMenuItem {
			text: 'Resume'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'resume' });
		}
		
		EscMenuItem {
			text: 'Quit'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'quit' });
		}
	}
}
