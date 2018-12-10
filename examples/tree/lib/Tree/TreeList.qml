import QtQuick 2.7

import "item-utils.js" as ItemUtils


Column {
	
	visible : isOpen
	height  : isOpen ? repeater.contentHeight : 0
	
	Repeater {
		
		id: repeater
		
		delegate: TreeItem {}
		model   : ListModel { dynamicRoles: true }
		
		Component.onCompleted: ItemUtils.resetModel(repeater.model, subtree)
		
	}
	
}
