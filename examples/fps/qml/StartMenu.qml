import QtQuick
import QtQuick.Layouts


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		MenuItem {
			text: 'Start'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'start' })
		}
		
		MenuItem {
			text: 'Quit'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'quit' })
		}
	}
}
