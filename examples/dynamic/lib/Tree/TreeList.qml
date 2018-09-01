import QtQuick 2.7


Column {
	
	visible: isOpen
	height: isOpen ? repeater.contentHeight : 0
	
	Repeater {
		
		id: repeater
		
		delegate: TreeItem {}
		model   : list
		
	}
	
}
