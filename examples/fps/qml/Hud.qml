import QtQuick 2.7
import QtQuick.Layouts 1.3


Item {
	objectName: 'hud'
	anchors.fill: parent
	
	FontLoader { id: future; source: 'fonts/Kenney Future Narrow.ttf' }
	FontLoader { id: bookxel; source: 'fonts/Bookxel.otf' }
	
	property alias hp: hud.hp
	property alias ammo: hud.ammo
	property string mode: 'hud'
	
	HudView {
		id: hud
		visible: mode === 'hud'
	}
	
	EscMenu {
		id: esc
		visible: mode === 'esc'
	}
}
