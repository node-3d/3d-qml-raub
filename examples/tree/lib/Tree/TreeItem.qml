import QtQuick 2.7


Row {
	
	padding: 1
	
	property string kind: model.kind
	property string value: model.value
	property bool isOpen: model.isOpen
	property var list: model.subtree
	property string title: model.title
	
	Component.onCompleted: treeRoot.ioReg({
		uid   : uid,
		setter: function (v) { value = v;    },
		getter: function ()  { return value; },
	})
	Component.onDestruction: treeRoot.ioDrop({
		uid  : uid,
		value: value,
	})
	
	onValueChanged: eventEmit('get', {
		name: uid,
		key: 'value',
		value: value,
	});
	
	
	Image {
		source  : 'tri.png'
		width   : 16
		height  : 16
		visible : list ? list.count > 0 : false
		
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
			
			MouseArea {
				anchors.fill : parent
				onClicked    : eventEmit('tree-clicked', { title: title, uid: uid })
			}
			
		}
		
		TextInput {
			color: 'white'
			visible: kind === 'value'
			text: value
		}
		
		
		Loader {
			source: 'TreeList.qml'
		}
		
	}
	
}
