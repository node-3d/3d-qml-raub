import QtQuick 2.7
import QtQuick.Layouts 1.3


Item {
	objectName: 'hud'
	anchors.fill: parent
	
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	FontLoader { id: bookxel; source: 'fonts/Bookxel.otf' }
	
	property alias hp: hud.hp
	property alias charge: hud.charge
	property alias fuel: hud.fuel
	property string mode: 'start'
	
	StartMenu {
		visible: mode === 'start'
	}
	
	HudView {
		id: hud
		visible: mode === 'hud'
	}
	
	EscMenu {
		visible: mode === 'esc'
	}
	
	OverMenu {
		visible: mode === 'over'
	}
}
