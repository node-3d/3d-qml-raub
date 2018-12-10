import QtQuick 2.7

import "item-utils.js" as ItemUtils
import "io-man.js" as IoMan


Rectangle {
	
	id: treeRoot
	
	property var tree: []
	
	function update(data) {
		treeView.model.clear();
		data.forEach(function (node) {
			treeView.model.append(node);
		});
	}
	
	function clear(data) {
		treeView.model.clear();
	}
	
	
	property var ioMan: new IoMan.IoMan()
	function ioDrop( opts ) { ioMan.drop( opts ); }
	function ioReg(  opts ) { ioMan.reg(  opts ); }
	function ioSet(  opts ) { ioMan.set(  opts ); }
	function ioGet(  opts ) { ioMan.get(  opts ); }
	
	
	width  : 200
	height : treeView.contentHeight + 30
	
	color  : "transparent"
	
	ListView {
		
		id: treeView
		
		anchors.fill: parent
		anchors.leftMargin: 10
		anchors.topMargin: 10
		anchors.bottomMargin: 10
		
		boundsBehavior: Flickable.StopAtBounds
		
		delegate: TreeItem {}
		model   : ListModel {}
		
		Component {
			
			id: headerComponent
			
			Text {
				text : 'The tree:'
				color: 'steelblue'
				font.bold: true
				font.family: 'Courier New'
				font.pixelSize: 16
			}
			
		}
		
		header: headerComponent
		
		
		Connections {
			target: treeRoot
			onTreeChanged: ItemUtils.resetModel(treeView.model, treeRoot.tree)
		}
		
		Component.onCompleted : ItemUtils.resetModel(treeView.model, treeRoot.tree)
		
	}

}
