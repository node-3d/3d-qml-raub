import QtQuick 2.7
import QtQuick.Layouts 1.3


Rectangle {
	anchors.fill: parent
	color: '#BB000000'
	
	property alias score: score.score
	
	ColumnLayout {
		anchors.centerIn: parent
		spacing: 32
		
		Item {
			Layout.alignment: Qt.AlignHCenter
			width: 512
			height: 256
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
