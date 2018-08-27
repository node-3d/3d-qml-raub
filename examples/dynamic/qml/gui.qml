import QtQuick 2.7
import QtQuick.Controls 2

import Tree 1.0


Column {
	
	x: 4
	y: 4
	
	spacing: 4
	
	
	Row {
		
		spacing: 4
		
		Button {
			text: 'Randomize'
			onClicked: cb.call('tree-randomize')
		}
		
		Button {
			text: 'Switch'
			onClicked: cb.call('tree-switch')
		}
		
	}
	
	
	Tree {
		objectName: 'dynamic-tree'
	}
	
}

