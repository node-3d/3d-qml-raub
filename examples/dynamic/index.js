'use strict';

const core3d = require('3d-core-raub');
const qml3d = require('3d-qml-raub');

qml3d(core3d);


const { qml, Screen, loop, gl, Points, doc } = core3d;
const { View, Overlay, Method } = qml;

const screen = new Screen();
loop(() => screen.draw());


const F_KEY = 70;

doc.on('keydown', e => {
	if (e.keyCode === F_KEY && e.ctrlKey && e.shiftKey) {
		screen.mode = 'windowed';
	} else if (e.keyCode === F_KEY && e.ctrlKey && e.altKey) {
		screen.mode = 'fullscreen';
	} else if (e.keyCode === F_KEY && e.ctrlKey) {
		screen.mode = 'borderless';
	}
});

View.libs(`${__dirname}/lib`);
const ui = new View({ width: screen.w, height: screen.h, file: `${__dirname}/qml/gui.qml` });
const updateTree = new Method({ view: ui, name: 'dynamic-tree', key: 'update' });
const clearTree = new Method({ view: ui, name: 'dynamic-tree', key: 'clear' });

doc.on('mousedown', ui.mousedown.bind(ui));
doc.on('mouseup', ui.mouseup.bind(ui));
doc.on('mousemove', ui.mousemove.bind(ui));
doc.on('keydown', ui.keydown.bind(ui));
doc.on('keyup', ui.keyup.bind(ui));

new Overlay({ screen, view: ui });


// ----------- KINJUTSU: Dynamic QML Tree

// Tree presets
const tree1 = [
  {
    "title": "Cosmos",
    "type": "Scope",
    "value": 0,
    "subtree": [
      {
        "title": "cheatsteps",
        "type": "Var"
      },
      {
        "title": "_cdist",
        "type": "Var"
      },
      {
        "title": "fluid",
        "type": "Var"
      },
      {
        "title": "fluid_k2",
        "type": "Var"
      },
      {
        "title": "cdist7",
        "type": "Var"
      },
      {
        "title": "windangle",
        "type": "Var"
      },
      {
        "title": "tiesteps",
        "type": "Var"
      },
      {
        "title": "check_robust",
        "type": "Var"
      },
      {
        "title": "check_robust_intersect",
        "type": "Var"
      },
      {
        "title": "fl_collide",
        "type": "Var"
      },
      {
        "title": "frict",
        "type": "Var"
      },
      {
        "title": "tonus_dist_mul",
        "type": "Var"
      },
      {
        "title": "movek",
        "type": "Var"
      },
      {
        "title": "tonus_pow_mul",
        "type": "Var"
      },
      {
        "title": "grid_interstep",
        "type": "Var"
      },
      {
        "title": "iii",
        "type": "Var"
      },
      {
        "title": "fast_tiesteps",
        "type": "Var"
      },
      {
        "title": "sdeFactor",
        "type": "Var"
      },
      {
        "title": "fluid_pow",
        "type": "Var"
      },
      {
        "title": "k7",
        "type": "Var"
      },
      {
        "title": "wind_maxpart",
        "type": "Var"
      },
      {
        "title": "Light",
        "type": "Scope",
        "value": 0,
        "subtree": [
          {
            "title": "show_cde",
            "type": "Var"
          },
          {
            "title": "cde",
            "type": "Var"
          },
          {
            "title": "sde",
            "type": "Var"
          },
          {
            "title": "atan_white",
            "type": "Var"
          },
          {
            "title": "eforce_sat",
            "type": "Var"
          }
        ]
      },
      {
        "title": "Link",
        "type": "Scope",
        "value": 0,
        "subtree": []
      },
      {
        "title": "Node",
        "type": "Scope",
        "value": 0,
        "subtree": [
          {
            "title": "was_removes",
            "type": "Var"
          },
          {
            "title": "Collider",
            "type": "Scope",
            "value": 0,
            "subtree": [
              {
                "title": "gridstep",
                "type": "Var"
              },
              {
                "title": "Grid",
                "type": "Scope",
                "value": 0,
                "subtree": []
              },
              {
                "title": "Vec",
                "type": "Scope",
                "value": 0,
                "subtree": []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "title": "UI",
    "type": "Scope",
    "value": 0,
    "subtree": [
      {
        "title": "mousePow",
        "type": "Var"
      },
      {
        "title": "mouseRadius",
        "type": "Var"
      },
      {
        "title": "Mode",
        "type": "Scope",
        "value": 0,
        "subtree": [
          {
            "title": "Draw",
            "type": "Scope",
            "value": 0,
            "subtree": []
          },
          {
            "title": "Drag",
            "type": "Scope",
            "value": 0,
            "subtree": []
          },
          {
            "title": "MFP",
            "type": "Scope",
            "value": 0,
            "subtree": []
          }
        ]
      }
    ]
  },
  {
    "title": "Random",
    "type": "Scope",
    "value": 100000,
    "subtree": [
      {
        "title": "mcursor",
        "type": "Var"
      }
    ]
  },
  {
    "title": "Render",
    "type": "Scope",
    "value": 0,
    "subtree": [
      {
        "title": "Key",
        "type": "Scope",
        "value": 0,
        "subtree": [
          {
            "title": "char",
            "type": "Var"
          },
          {
            "title": "ctrl",
            "type": "Var"
          },
          {
            "title": "alt",
            "type": "Var"
          },
          {
            "title": "shft",
            "type": "Var"
          }
        ]
      },
      {
        "title": "Mouse",
        "type": "Scope",
        "value": 0,
        "subtree": [
          {
            "title": "pos",
            "type": "Var"
          },
          {
            "title": "posx",
            "type": "Var"
          },
          {
            "title": "posy",
            "type": "Var"
          },
          {
            "title": "mfp",
            "type": "Var"
          }
        ]
      }
    ]
  }
];

let activeTree = tree1;

const randomize = tree => {
	tree.forEach(item => {
		item.title = Math.floor(Math.random() * 1e9).toString(16);
		if (item.subtree) {
			randomize(item.subtree);
		}
	});
};

ui.on('tree-clicked', e => console.log('tree-clicked', e.title));

ui.on('tree-randomize', e => {
	randomize(activeTree);
	updateTree.call(activeTree);
});

ui.on('tree-switch', e => {
	activeTree = (activeTree === tree1) ? tree2 : tree1;
	updateTree.call(activeTree);
});

updateTree.call(activeTree);
