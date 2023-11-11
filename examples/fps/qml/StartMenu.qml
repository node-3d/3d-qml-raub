import QtQuick 2.7
import QtQuick.Layouts 1.3


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		MenuItem {
			text: 'Start'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'start' });
		}
		
		MenuItem {
			text: 'Quit'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'quit' });
		}
	}
}
