import QtQuick
import QtQuick.Layouts


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	property alias score: score.score
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		Item {
			Layout.alignment: Qt.AlignHCenter
			Layout.preferredWidth: 512
			Layout.preferredHeight: 256
			Score {
				id: score
			}
		}
		
		MenuItem {
			text: 'Restart'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'restart' })
		}
		
		MenuItem {
			text: 'Quit'
			Layout.alignment: Qt.AlignHCenter
			onPressed: eventEmit('custom-esc', { button: 'quit' })
		}
	}
}
