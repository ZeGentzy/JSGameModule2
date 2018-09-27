"use strict";
// Programmer's Name: Game
// Program Name:
//////////////////////////////////////////////////////////////////////////

load("cs10-txt-lib-0.4.js");

// Don't edit the line above, or you won't be able to get user input!

// Also, do not use the following variable names in your own code below:
//    load, print, getInput, javaSleep, currentDate, getWorkingDirectory, newFileReader, fileHasInput, fileGetInput, newFileWriter, newFileAppender, filePrint, fileClose

// Write your program below this line:
// ***********************************

// XTerm doesn't support some good looking characters, I assume your going to
// test it in XTerm, so we default with some not so good looking ones. If your
// terminal does support them (any other terminal bassically) flip this flag on!
let LOOK_GOOD = true;

if (!LOOK_GOOD) {
    print(ANSI_RED + "XTerm doesn't support some good looking characters, I assume your going to test it in XTerm, so we default with some not so good looking ones. If your terminal does support them (any other terminal bassically), please go to the source code and flip the `LOOK_GOOD` flag on!");
    print("May I suggest xfce4-terminal?");
    print(ANSI_RESET + "Hit enter to continue.");
    getInput();
}

print("This game has been tested with resolutions of 80 by 24 and higher. Please set your terminal to 80 by 24 or higher.");
print("Hit enter to continue.");
getInput();

/*
 * Java imports
 */
let stdout = java.lang.System.out;
let stdin = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System['in']));
let stderr = java.lang.System.err;
let Thread = java.lang.Thread;
let Random = java.util.Random;

let TextColor = com.googlecode.lanterna.TextColor;
let SGR = com.googlecode.lanterna.SGR;
let KeyType = com.googlecode.lanterna.input.KeyType;
let TerminalScreen = com.googlecode.lanterna.screen.TerminalScreen;
let TextCharacter = com.googlecode.lanterna.TextCharacter;
let TerminalPosition = com.googlecode.lanterna.TerminalPosition;
let TerminalSize = com.googlecode.lanterna.TerminalSize;
let Symbols = com.googlecode.lanterna.Symbols;
let Screen = com.googlecode.lanterna.screen.Screen;

if (!LOOK_GOOD) {
    Symbols = Object.freeze({
        "ARROW_DOWN": 'v',
        "ARROW_LEFT": '<',
        "ARROW_RIGHT": '>',
        "ARROW_UP": '^',

        "BLOCK_DENSE": '#',
        "BLOCK_MIDDLE": '*',
        "BLOCK_SOLID": '#',
        "BLOCK_SPARSE": '.',

        "BOLD_FROM_NORMAL_SINGLE_LINE_HORIZONTAL": '-',
        "BOLD_FROM_NORMAL_SINGLE_LINE_VERTICAL": '|',
        "BOLD_SINGLE_LINE_HORIZONTAL": '-',
        "BOLD_SINGLE_LINE_VERTICAL": '|',
        "BOLD_TO_NORMAL_SINGLE_LINE_HORIZONTAL": '-',
        "BOLD_TO_NORMAL_SINGLE_LINE_VERTICAL": '|',

        "BULLET": '.',
        "CLUB": '*',
        "DIAMOND": '&',

        "DOUBLE_LINE_BOTTOM_LEFT_CORNER": '|',
        "DOUBLE_LINE_BOTTOM_RIGHT_CORNER": '|',
        "DOUBLE_LINE_CROSS": '+',
        "DOUBLE_LINE_HORIZONTAL": '-',
        "DOUBLE_LINE_HORIZONTAL_SINGLE_LINE_CROSS": '+',
        "DOUBLE_LINE_T_DOWN": 'T',
        "DOUBLE_LINE_T_LEFT": '|',
        "DOUBLE_LINE_T_RIGHT": '|',
        "DOUBLE_LINE_T_SINGLE_DOWN": 'T',
        "DOUBLE_LINE_T_SINGLE_LEFT": '|',
        "DOUBLE_LINE_T_SINGLE_RIGHT": '|',
        "DOUBLE_LINE_T_SINGLE_UP": '|',
        "DOUBLE_LINE_T_UP": '|',
        "DOUBLE_LINE_TOP_LEFT_CORNER": '|',
        "DOUBLE_LINE_TOP_RIGHT_CORNER": '|',
        "DOUBLE_LINE_VERTICAL": '|',
        "DOUBLE_LINE_VERTICAL_SINGLE_LINE_CROSS": '+',

        "FACE_BLACK": '@',
        "FACE_WHITE": '@',

        "FEMALE": "F",
        "HEART": "H",
        "INVERSE_BULLET": "o",
        "INVERSE_WHITE_CIRCLE": "O",
        "MALE": "M",
        "OUTLINED_SQUARE": ".",
        "OUTLINED_SQUARE_SMALL": ".",

        "SINGLE_LINE_BOTTOM_LEFT_CORNER": "|",
        "SINGLE_LINE_BOTTOM_RIGHT_CORNER": "|",
        "SINGLE_LINE_CROSS": "+",
        "SINGLE_LINE_HORIZONTAL": "-",
        "SINGLE_LINE_T_DOUBLE_DOWN": "T",
        "SINGLE_LINE_T_DOUBLE_LEFT": "|",
        "SINGLE_LINE_T_DOUBLE_RIGHT": "|",
        "SINGLE_LINE_T_DOUBLE_UP": "|",
        "SINGLE_LINE_T_DOWN": "T",
        "SINGLE_LINE_T_LEFT": "|",
        "SINGLE_LINE_T_RIGHT": "|",
        "SINGLE_LINE_T_UP": "-",
        "SINGLE_LINE_TOP_LEFT_CORNER": "|",
        "SINGLE_LINE_TOP_RIGHT_CORNER": "|",
        "SINGLE_LINE_VERTICAL": "|",

        "SOLID_SQUARE": ".",
        "SOLID_SQUARE_SMALL": ".",
        "SPADES": "^",
        "TRIANGLE_DOWN_POINTING_BLACK": "V",
        "TRIANGLE_DOWN_POINTING_MEDIUM_BLACK": "v",
        "TRIANGLE_LEFT_POINTING_BLACK": "<",
        "TRIANGLE_LEFT_POINTING_MEDIUM_BLACK": "<",
        "TRIANGLE_RIGHT_POINTING_BLACK": ">",
        "TRIANGLE_RIGHT_POINTING_MEDIUM_BLACK": ">",
        "TRIANGLE_UP_POINTING_BLACK": "^",
        "TRIANGLE_UP_POINTING_MEDIUM_BLACK": "^",
        "WHITE_CIRCLE": "o",
    });
}

/*
 * Misc Helper Functions
 */
function ToChar(s) {
    return s.charCodeAt(0);
}

// From jQuery source code.
var IsFunction = function isFunction( obj ) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// From jQuery source code.
let IsPlainObject = function( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    proto = Object.getPrototypeOf( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
        return true;
    }

    let class2type = {};
    let hasOwn = class2type.hasOwnProperty;
    let fnToString = hasOwn.toString;
    let ObjectFunctionString = fnToString.call( Object );
    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
};

// From jQuery source code.
let Extend;
Extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !IsFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( IsPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && IsPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = Extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

/*
 * Constants
 */
let constants = Object.freeze({
    "NORTH_DIR": 1,
    "NORTHEAST_DIR": 2,
    "EAST_DIR": 3,
    "SOUTHEAST_DIR": 4,
    "SOUTH_DIR": 5,
    "SOUTHWEST_DIR": 6,
    "WEST_DIR": 7,
    "NORTHWEST_DIR": 8,

    "CHARACTER_CREATURE": 1,

    "EMPTY_TILE": 1,

    "MAX_HP": 200,
    "MAX_SP": 200,

    "GAME_NAME": "Gentz' Game",
});

/*
 * Global gamestate variables
 */
let hp = constants.MAX_HP;
let st = constants.MAX_SP;
let dir = constants.NORTH_DIR;
let running = true;
let gameover = false;
let thisInput;
let random = new Random();
let screen;
let term;
let log = [];

let time = 0;

let curLevel = 0;
let mapLevels = [];
let mapDrawLevels;

function NewLogFactory() {
    let ret = {
        "sgrs": [],
        "fgs": [],
        "bgs": [],
        "txt": ""
    };

    ret.SetSGR = function(sgr, pos, state) {
        let i;
        for (i = 0; i < ret.sgrs.length && ret.sgrs[i].pos != pos; ++i) {}

        if (i == ret.sgrs.length) {
            ret.sgrs[i] = {};
            ret.sgrs[i].pos = pos;
            ret.sgrs[i].sgrs = {};
        }
        ret.sgrs[i].sgrs[sgr] = state;
    };

    ret.SetFg = function(fg, pos) {
        let i;
        for (i = 0; i < ret.fgs.length && ret.fgs[i].pos != pos; ++i) {}

        ret.fgs[i] = {};
        ret.fgs[i].pos = pos;
        ret.fgs[i].fg = fg;
    };

    ret.SetBg = function(bg, pos) {
        let i;
        for (i = 0; i < ret.bgs.length && ret.bgs[i].pos != pos; ++i) {}

        ret.bgs[i] = {};
        ret.bgs[i].pos = pos;
        ret.bgs[i].bg = bg;
    };

    ret.SetTxt = function(txt) {
        ret.txt = txt;
    };
    
    ret.EnableSGRS = function(sgrs, pos) {
        for (let i = 0; i < sgrs.length; ++i) {
            ret.SetSGR(sgrs[i], pos, true);
        }
    };

    ret.DisableSGRS = function(sgrs, pos) {
        for (let i = 0; i < sgrs.length; ++i) {
            ret.SetSGR(sgrs[i], pos, false);
        }
    };

    ret.CommitToLog = function() {
        ret.sgrs.sort(function(a, b) { return a.pos - b.pos; });
        ret.fgs.sort(function(a, b) { return a.pos - b.pos; });
        ret.bgs.sort(function(a, b) { return a.pos - b.pos; });

        let next = {
            "sgrs": ret.sgrs,
            "fgs": ret.fgs,
            "bgs": ret.bgs,
            "txt": ret.txt,
        };

        log[log.length] = Extend(true, {}, next);
    };
    
    return ret;
}

let lf = NewLogFactory();
lf.EnableSGRS([SGR.BOLD], 0);
lf.EnableSGRS([SGR.UNDERLINE], "Welcome to".length + 1);
lf.DisableSGRS([SGR.UNDERLINE], "Welcome to".length + constants.GAME_NAME.length + 1);
lf.SetFg(TextColor.ANSI.GREEN, 0);
lf.SetTxt("Welcome to " + constants.GAME_NAME + "!");
lf.CommitToLog();

try {
    /*
     * Terminal Setup
     */
    {
        let termFactory = new com.googlecode.lanterna.terminal.DefaultTerminalFactory();
        term = termFactory.createTerminal();
    }
    screen = new TerminalScreen(term);
    screen.startScreen();
    screen.setCursorPosition(null);

    let termSize = screen.getTerminalSize();

    /*
     * Main Game Functions
     */

    function SetupFirstLevel() {
        mapLevels[curLevel] = {
            "creatures": [
                {"type": constants.CHARACTER_CREATURE, "x": 0, "y": 0}
            ],
            "items": [],
            "tiles": [
                {"type": constants.EMPTY_TILE}
            ],
            "dims": {
                "x": 1,
                "y": 1,
            }
        };

        mapDrawLevels = [0];
    }

    function DrawBar(name, val, max, x, y, len) {
        let tg = screen.newTextGraphics();

        tg.putString(new TerminalPosition(x + len - name.length + 1, y), name)

        let remLen = len - name.length - 1;
        let barLen = remLen * val / max;
        barLen = barLen < 0 ? 0 : barLen;
        let percStat = val / max;

        if (percStat <= 0) {
            return;
        } else if (percStat < 0.10) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers([SGR.BLINK, SGR.BOLD, SGR.REVERSE]);
        } else if (percStat < 0.20) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers([SGR.BLINK, SGR.BOLD]);
        } else if (percStat < 0.30) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers([SGR.BLINK]);
        } else if (percStat < 0.40) {
            tg.setForegroundColor(TextColor.ANSI.RED);
        } else if (percStat < 0.80) {
            tg.setForegroundColor(TextColor.ANSI.YELLOW);
        } else {
            tg.setForegroundColor(TextColor.ANSI.GREEN);
        }

        tg.drawLine(
            new TerminalPosition(x, y),
            new TerminalPosition(x + barLen, y),
            "|"
        );
    }

    function NextDir(dir, cw) {
        return cw
            ? ((dir == constants.NORTHWEST_DIR) ? constants.NORTH_DIR : dir + 1)
            : ((dir == constants.NORTH_DIR) ? constants.NORTHWEST_DIR : dir - 1)
    }

    function DrawDirectionWheel(x, y, dir) {
        let tg = screen.newTextGraphics();
        tg.setCharacter(new TerminalPosition(x, y), 'O');

        switch (dir) {
            case constants.NORTH_DIR:
                tg.setCharacter(new TerminalPosition(x, y - 1), Symbols.SINGLE_LINE_VERTICAL);
                tg.setCharacter(new TerminalPosition(x, y - 2), Symbols.TRIANGLE_UP_POINTING_BLACK);
                break;
            case constants.NORTHEAST_DIR:
                tg.setCharacter(new TerminalPosition(x + 1, y - 1), '/');
                tg.setCharacter(new TerminalPosition(x + 2, y - 2), Symbols.SINGLE_LINE_TOP_RIGHT_CORNER);
                break;
            case constants.EAST_DIR:
                tg.setCharacter(new TerminalPosition(x + 1, y), Symbols.SINGLE_LINE_HORIZONTAL);
                tg.setCharacter(new TerminalPosition(x + 2, y), Symbols.TRIANGLE_RIGHT_POINTING_BLACK);
                break;
            case constants.SOUTHEAST_DIR:
                tg.setCharacter(new TerminalPosition(x + 1, y + 1), '\\');
                tg.setCharacter(new TerminalPosition(x + 2, y + 2), Symbols.SINGLE_LINE_BOTTOM_RIGHT_CORNER);
                break;
            case constants.SOUTH_DIR:
                tg.setCharacter(new TerminalPosition(x, y + 1), Symbols.SINGLE_LINE_VERTICAL);
                tg.setCharacter(new TerminalPosition(x, y + 2), Symbols.TRIANGLE_DOWN_POINTING_BLACK);
                break;
            case constants.SOUTHWEST_DIR:
                tg.setCharacter(new TerminalPosition(x - 1, y + 1), '/');
                tg.setCharacter(new TerminalPosition(x - 2, y + 2), Symbols.SINGLE_LINE_BOTTOM_LEFT_CORNER);
                break;
            case constants.WEST_DIR:
                tg.setCharacter(new TerminalPosition(x - 1, y), Symbols.SINGLE_LINE_HORIZONTAL);
                tg.setCharacter(new TerminalPosition(x - 2, y), Symbols.TRIANGLE_LEFT_POINTING_BLACK);
                break;
            case constants.NORTHWEST_DIR:
                tg.setCharacter(new TerminalPosition(x - 1, y - 1), '\\');
                tg.setCharacter(new TerminalPosition(x - 2, y - 2), Symbols.SINGLE_LINE_TOP_LEFT_CORNER);
                break;
        }
    }

    function UpdateLog() {
        let tg = screen.newTextGraphics();

        let logLines = termSize.getRows() - 13;
        let lineLen = Math.floor((termSize.getColumns() - 1) / 3);

        tg.fillRectangle(
            new TerminalPosition(termSize.getColumns() * 2 / 3, 12),
            new TerminalSize(lineLen, logLines),
            ' '
        );

        let linesSoFar = 0;
        let i;
        for (i = log.length - 1; i >= 0 && linesSoFar < logLines; --i) {
            linesSoFar += Math.ceil(log[i].txt.length / lineLen);
        }

        let partials = Math.max(0, linesSoFar - logLines) * lineLen;
        let first = true;
        ++i;

        linesSoFar = 0;
        for (; i < log.length; ++i) {
            let tg = screen.newTextGraphics();
            // TODO: SGR & Colours
            let wrapedLines = Math.ceil(log[i].txt.length / lineLen);
            let charsSoFar = 0;

            let j = 0;
            let k = 0;
            let l = 0;
            for (let m = first ? partials : 0; m < log[i].txt.length; ++m, ++charsSoFar) {
                if (charsSoFar == lineLen) {
                    charsSoFar = 0;
                    ++linesSoFar;
                }

                for (; j < log[i].sgrs.length && log[i].sgrs[j].pos < m; ++j) {}
                for (; k < log[i].fgs.length  && log[i].fgs[k].pos < m; ++k) {}
                for (; l < log[i].bgs.length  && log[i].bgs[l].pos < m; ++l) {}

                if (j < log[i].sgrs.length && log[i].sgrs[j].pos == m) {
                    for (let key in log[i].sgrs[j].sgrs) {
                        if (
                            log[i].sgrs[j].sgrs.hasOwnProperty(key) 
                            && log[i].sgrs[j].sgrs[key]
                        ) {
                            tg.enableModifiers([SGR.valueOf(key)]);
                        } else {
                            tg.disableModifiers([SGR.valueOf(key)]);
                        }
                    }
                }
                if (k < log[i].fgs.length && log[i].fgs[k].pos == m) {
                    tg.setForegroundColor(log[i].fgs[k].fg);
                }
                if (l < log[i].bgs.length && log[i].bgs[l].pos == m) {
                    tg.SetBacgroundColor(log[i].bgs[l].bg);
                }

                tg.setCharacter(
                    new TerminalPosition(
                        termSize.getColumns() * 2 / 3 + charsSoFar, 
                        12 + linesSoFar
                    ), 
                    log[i].txt[m]
                );
            }
            ++linesSoFar;
            first = false;
        }
    }

    function FindPlayerLocation(map) {
        let pLoc;
        for (pLoc = 0; pLoc < map.creatures.length && map.creatures[pLoc].type != constants.CHARACTER_CREATURE; ++pLoc) {}
        return pLoc;
    }

    function FindCreaturesOnTile(map, x, y) {
        let ret = [];
        for (let i = 0; i < map.creatures.length; ++i) {
            if (map.creatures[i].x == x && map.creatures[i].y == y) {
                ret[ret.length] = map.creatures[i];
            }
        }
        return ret;
    }

    function FindItemsOnTile(map, x, y) {
        let ret = [];
        for (let i = 0; i < map.items.length; ++i) {
            if (map.items[i].x == x && map.items[i].y == y) {
                ret[ret.length] = map.items[i];
            }
        }
        return ret;
    }

    function DrawCreature(map, xO, yO, c) {
        let tg = screen.newTextGraphics();
        if (c.type == constants.CHARACTER_CREATURE) {
            tg.setCharacter(
                new TerminalPosition(1 + xO, 1 + yO),
                Symbols.FACE_WHITE
            );
        }
    }

    function DrawTile(map, xO, yO, t) {
        let tg = screen.newTextGraphics();
    }

    function DrawTile(map, xO, yO, x, y) {
        let tg = screen.newTextGraphics();
        let t = x + y * map.dims.x;
        if (map.tiles[t].type == constants.EMPTY_TILE) {
        }
    }

    function UpdateGameView() {
        let tg = screen.newTextGraphics();
        let length = termSize.getColumns() * 2 / 3 - 2;
        let width = termSize.getRows() - 2;
        tg.fillRectangle(
            new TerminalPosition(1, 1),
            new TerminalSize(length, width),
            ' '
        );

        let map = mapLevels[curLevel];

        let pLoc = FindPlayerLocation(map);
        assert(pLoc != map.creatures.length, "Character not found on level.");

        let startX = Math.floor(map.creatures[pLoc].x - length / 2);
        let startY = Math.floor(map.creatures[pLoc].y - width / 2);

        for (let yO = 0; yO < width; ++yO) {
            for (let xO = 0; xO < length; ++xO) {
                let x = startX + xO;
                let y = startY + yO;

                if (
                    x >= 0
                    && x < map.dims.x
                    && y >= 0
                    && y < map.dims.y
                ) {
                    // Draw Order:
                    // 1. Creatures
                    // 2. Items
                    // 3. Tiles
                    let cs = FindCreaturesOnTile(map, x, y);
                    let is = FindItemsOnTile(map, x, y);

                    let t = x + y * map.dims.x;

                    if (mapDrawLevels[t] < cs.length) {
                        DrawCreature(map, xO, yO, cs[mapDrawLevels[t]]);
                    } else if (mapDrawLevels[t] < (cs.length + is.length)) {
                        DrawItem(map, xO, yO, is[mapDrawLevels[t] - cs.length]);
                    } else {
                        DrawTile(map, xO, yO, x, y);
                    }

                    ++mapDrawLevels[t];

                    if (mapDrawLevels[t] > (cs.length + is.length - 1)) {
                        mapDrawLevels[t] = 0;
                    }

                }
            }
        }
    }

    function DrawGame() {
        let tg = screen.newTextGraphics();

        if (gameover) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers([SGR.BOLD, SGR.REVERSE]);
        }

        // Top and bottom
        tg.drawLine(
            new TerminalPosition(1, 0),
            new TerminalPosition(termSize.getColumns() - 2, 0),
            Symbols.DOUBLE_LINE_HORIZONTAL
        );
        tg.drawLine(
            new TerminalPosition(1, termSize.getRows() - 1),
            new TerminalPosition(termSize.getColumns() - 2, termSize.getRows() - 1),
            Symbols.DOUBLE_LINE_HORIZONTAL
        );

        // left, middle and right
        tg.drawLine(
            new TerminalPosition(0, 1),
            new TerminalPosition(0, termSize.getRows() - 2),
            Symbols.DOUBLE_LINE_VERTICAL
        );
        tg.drawLine(
            new TerminalPosition(termSize.getColumns() / 3 * 2 - 1, 1),
            new TerminalPosition(termSize.getColumns() / 3 * 2 - 1, termSize.getRows() - 2),
            Symbols.SINGLE_LINE_VERTICAL
        );
        tg.drawLine(
            new TerminalPosition(termSize.getColumns() - 1, 1),
            new TerminalPosition(termSize.getColumns() - 1, termSize.getRows() - 2),
            Symbols.DOUBLE_LINE_VERTICAL
        );

        // Corners
        tg.setCharacter(
            new TerminalPosition(0, 0),
            Symbols.DOUBLE_LINE_TOP_LEFT_CORNER
        );
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() - 1, 0),
            Symbols.DOUBLE_LINE_TOP_RIGHT_CORNER
        );
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() - 1, termSize.getRows() - 1),
            Symbols.DOUBLE_LINE_BOTTOM_RIGHT_CORNER
        );
        tg.setCharacter(
            new TerminalPosition(0, termSize.getRows() - 1),
            Symbols.DOUBLE_LINE_BOTTOM_LEFT_CORNER
        );

        // `T` intersections
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() / 3 * 2 - 1, 0),
            Symbols.DOUBLE_LINE_T_SINGLE_DOWN
        );
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() / 3 * 2 - 1, termSize.getRows() - 1),
            Symbols.DOUBLE_LINE_T_SINGLE_UP
        );

        // Middle bar above log
        tg.drawLine(
            new TerminalPosition(termSize.getColumns() / 3 * 2, 11),
            new TerminalPosition(termSize.getColumns() - 2, 11),
            Symbols.SINGLE_LINE_HORIZONTAL
        );

        // `T` intersections
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() / 3 * 2 - 1, 11),
            Symbols.SINGLE_LINE_T_RIGHT
        );
        tg.setCharacter(
            new TerminalPosition(termSize.getColumns() - 1, 11),
            Symbols.DOUBLE_LINE_T_SINGLE_LEFT
        );

        DrawBar(
            "HP",
            hp,
            constants.MAX_HP,
            termSize.getColumns() / 3 * 2 + 1,
            1,
            termSize.getColumns() / 3 - 4
        );

        DrawBar(
            "SP",
            st,
            constants.MAX_SP,
            termSize.getColumns() / 3 * 2 + 1,
            2,
            termSize.getColumns() / 3 - 4
        );

        DrawDirectionWheel(
            termSize.getColumns() / 6 * 5  - 1,
            6,
            dir
        );

        UpdateLog();
        UpdateGameView();
    }

    function GameLogic() {
        if (
            thisInput.getKeyType() == KeyType.Escape
            || gameover && thisInput.getKeyType() == KeyType.Enter
        ) {
            running = false;
            return;
        } else if (gameover) {
            return;
        }

        hp -= 5;
        dir = NextDir(dir, true);

        if (hp <= 0) {
            let lf = NewLogFactory();
            lf.EnableSGRS([SGR.BOLD, SGR.REVERSE, SGR.BLINK], 0);
            lf.SetFg(TextColor.ANSI.RED, 0);
            lf.SetTxt("You have succumb to weakness.");
            lf.CommitToLog();
            lf.SetTxt("Hit enter to exit.");
            lf.CommitToLog();

            gameover = true;
        }
    }

    SetupFirstLevel();

    /*
     * Main Game Loop.
     */
    while (running) {
        let newTermSize = screen.doResizeIfNecessary();
        if (newTermSize != null) {
            termSize = newTermSize;
            screen.clear();
            screen.refresh(Screen.RefreshType.COMPLETE);
        }

        let nTime = java.lang.System.currentTimeMillis();
        let dTime = nTime - time;

        if (dTime > 1000) {
            screen.clear();
            DrawGame();
            screen.refresh(Screen.RefreshType.DELTA);
            time = java.lang.System.currentTimeMillis();
            Thread.yield();
        }

        thisInput = term.pollInput();
        if (thisInput != null) {
            GameLogic();

            for (let i = 0; i < mapDrawLevels.length; ++i) {
                mapDrawLevels[i] = 0;
            }
            time = 0;
        } else {
            Thread.yield();
        }
    }

    /*
     * Cleanup
     */
    screen.stopScreen();

} catch (err) {
    // This try-catch is not ideal, as we loose the line on which the error
    // occurred, however me must do this, because if we don't, Rhino JS will
    // print the error while the terminal is in private mode and then that
    // error will be cleared from the screen when it auto-exits from private
    // mode. A vauge error is better than no error, I guess.
    //
    // So first we close the screen so that we exit from private mode, then
    // we print out the caught exception.
    screen.stopScreen();
    Thread.sleep(200);
    stdout.printf("\nFATAL ERROR: %s\n", err.toString());
    stdout.flush();
}
