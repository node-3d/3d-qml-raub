import QtQuick

Rectangle {
	id: root
	objectName: 'hud'
	anchors.fill: parent
	
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	FontLoader { id: bookxel; source: 'fonts/Bookxel.otf' }
	
	property alias hp: hud.hp
	property alias charge: hud.charge
	property alias fuel: hud.fuel
	property alias score: over.score
	property string mode: 'start'
	
	color: '#00000000'
	
	SequentialAnimation {
		id: anim
		PropertyAnimation {
			id: targetColor
			target: root
			property: 'color'
			to: '#554BB543'
			duration: 150
		
		}
		PropertyAnimation {
			target: root
			property: 'color'
			to: '#00000000'
			duration: 250
		}
	}
	
	function flashColor(name) {
		targetColor.to = name === 'green' ? '#994BB543' : '#99FF000F';
		anim.running = true;
	}
	
	StartMenu {
		visible: root.mode === 'start'
	}
	
	HudView {
		id: hud
		visible: root.mode === 'hud'
	}
	
	EscMenu {
		visible: root.mode === 'esc'
	}
	
	OverMenu {
		id: over
		visible: root.mode === 'over'
	}
}
