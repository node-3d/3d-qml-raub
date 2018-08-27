import QtQuick 2.7


Column {
	
	Repeater{
		
		id: repeater
		
		delegate: TreeItem {}
		model   : ListModel { dynamicRoles: true }
		
		Component.onCompleted: {
			for (var i = 0; i < subtree.count; i++) {
				repeater.model.append(subtree.get(i));
			}
		}
		
	}
	
}
