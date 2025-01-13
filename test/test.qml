import QtQuick

Rectangle {
	anchors.fill: parent
	
	color: 'yellow'
	
	Item {
		objectName: 'obj1'
		property var prop1: 'value1'
		property var prop2: 'value2'
		
		onProp1Changed: cb.call('p1c')
		
		function method1() {
			cb.call('m1c');
		}
		
		function method2(x) {
			cb.call('m2c', x);
		}
		
		Text {
			text: 'Hello World!'
		}
	}
}
