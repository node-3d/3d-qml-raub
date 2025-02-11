import QtQuick
import QtQuick.Layouts


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		MenuItem {
			text: 'Resume'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'resume' })
		}
		
		MenuItem {
			text: 'Restart'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'restart' })
		}
		
		MenuItem {
			text: 'Leave'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'leave' })
		}
	}
}
