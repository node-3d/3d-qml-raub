import QtQuick 2.7
import QtQuick.Layouts 1.3


Item {
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	FontLoader { id: bookxel; source: 'fonts/Bookxel.otf' }
	
	readonly property int fontSizeTitle: 84
	readonly property int fontSizeValue: 110
	readonly property string shadowColor: '#222222'
	
	id: root
	objectName: 'score'
	anchors.fill: parent
	
	property real score: 0
	
	ColumnLayout {
		anchors.centerIn: parent
		
		Text {
			text: 'SCORE'
			Layout.alignment: Qt.AlignHCenter
			
			font.pixelSize: fontSizeTitle
			font.bold: true
			font.family: future.name
			color: '#FAFACC'
			
			style: Text.Outline
			styleColor: root.shadowColor
		}
		
		Text {
			text: Math.min(9999, root.score)
			Layout.alignment: Qt.AlignHCenter
			
			font.pixelSize: fontSizeValue
			font.bold: true
			font.family: bookxel.name
			color: 'white'
			
			style: Text.Outline
			styleColor: root.shadowColor
		}
	}
}
