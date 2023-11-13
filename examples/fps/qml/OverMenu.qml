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
			Layout.alignment: Qt.AlignCenter
			Score {
				id: score
			}
		}
		
		MenuItem {
			text: 'Restart'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'restart' });
		}
		
		MenuItem {
			text: 'Quit'
			Layout.alignment: Qt.AlignCenter
			onPressed: eventEmit('custom-esc', { button: 'quit' });
		}
	}
}
