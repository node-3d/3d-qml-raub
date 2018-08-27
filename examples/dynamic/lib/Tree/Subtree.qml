import QtQuick 2.7


Row {
	
	padding: 1
	
	property bool isOpen: true
	
	Image {
		source  : 'tri.png'
		width   : 16
		height  : 16
		visible : subtree && subtree.length ? true : false
		
		transform : Rotation { origin.x: 8; origin.y: 8; angle: isOpen ? 90 : 0 }
		
		MouseArea {
			anchors.fill : parent
			onClicked    : isOpen = ! isOpen
		}
	}
	
	Column {
		
		Text {
			
			text : title
			
			color : 'red'
			
			font.bold      : true
			font.family    : 'Courier New'
			font.pixelSize : 16
			
		}
		
		Loader {
			source: isOpen && subtree && subtree.length ? 'Subtree.qml' : 'Empty.qml'
		}
		
	}
	
}
