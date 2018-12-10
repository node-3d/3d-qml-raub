'use strict';

/* exported resetModel */


function extend(data) {
	return {
		
		uid   : typeof data.uid === 'string' ? data.uid : null,
		title : data.title || 'Unnamed',
		kind  : data.kind || 'fold',
		value : data.value !== undefined ? data.value : null,
		
		isOpen  : ( !! data.isOpen ) || false,
		subtree : data.subtree || [],
		
	};
}


function resetModel(model, data) {
	
	model.clear();
	
	if (data.forEach) {
		data.forEach(function (node) {
			model.append( extend(node) );
		});
	} else if (data.get && data.count) {
		for (var i = 0; i < data.count; i++) {
			model.append( extend(data.get(i)) );
		}
	}
	
}
