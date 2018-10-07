"use strict";
// Programmer's Name: Game
// Program Name:
//////////////////////////////////////////////////////////////////////////

// PROLOGUE
//
// Oh wondrous Muses, I call 'pon your aid,
// help me 'pon this crusade to dissuade
// people who consider javascript wise,
// opinions which them folks must now revise.
//
// Oh, how beloved is my javascript,
// where obj plus array is a valid script,
// where the errors are far and few between,
// yet where randomness is constantly seen.
//
// Welcome to the land with the least green yards,
// where performance is only for retards.
// Stacktraces, or performance? Pick one.
// Actually, you will only get none.
//
// Welcome to the land of the boll weevil!
// Where IDE's, provided, are medieval!
// Tumble those dieing hands 'cross a keyboard.
// Wait for it to un-freeze, makin' me be bored.
//
// Great is havin' t'wait for many minutes.
// If only the comps haven't some rickets,
// you might, just might, get something done, tonight.
// instead of doing things at home! At night!
//
// Come wittness the slowest autocomplete,
// Which fails with lines most basic to complete,
// it's so bad that it must've been a feat,
// to make something so quickly obsolete.
//
// Want? Errors when accessing non-members?
// Instead we'll put your results ina blender.
// Ask! What does the `splice` of `undefined` do?
// Removes the first element, who woulda knew!
//
// Do your numbers not have the member `m`?
// Well, to find, that bug's gonna be a gem.
// Do you want something that isn't a float?
// You must settle instead with `Math` `floor` quotes.
//
// So you want any constant vars today?
// Just make do with `object` `freeze`, okay?
// Did you access any constant not there?
// We *might* just give you a warning, we swear.
//
// Fly to where you can access vars not passed,
// and watch where your sanity gets a blast!
// Java calls might hand out errors, deadly,
// or calls might just work, by luck, correctly.
//
// To the distant land where var'dics are arrays,
// when pass'd to Java libs, unless one prays.
// The shitty land that I'm forced to endure,
// for all my modules, including numb' two.
//
// Want to make a clone of a variable?
// I'm afraid we weren't that charitable.
// Anywho, why do what you wanna go do?
// Do you think we thought any of this through?
//
// Do you want a half decent debugger?
// How 'bout this terrible little fucker?
// It'll tell the line your exceptions lay 'pon,
// if you tick some random fuckin' box on!
//
// You want a font bigger than point six?
// Hey now, t'oesn't even have the basics,
// with it's UI made out of duck' 'n' glue,
// an' a carefully chosen white-on-blue,
//
// emanating a wierd VBA vibe,
// in looking like what '08 would provide.
// If only I could say that it's aged well,
// but instead it makes my eyes hurt and swell.
//
// See them hum, my most beloved orioles,
// watch them dance, to the bright borealis,
// tap a dance, jumpin' on your computer,
// fill with rage, yet it's only October.
//
// Crack open a 'bugger, that's not handy,
// drink down your imaginary brandy,
// for today is a long day, as they say,
// When it hands error B, instead of A.
//
// Today, you chug down bottles of Kava!
// Trying, to pass those objects to Java!
// Watch them fail, to distinguish between them!
// Take your anger in a bottle'n vent 'em!
//
// Stand on the lines which only waxe and wane.
// Wave 'round your hand, and practice the arcane.
// Come on! Proclaim eternal victory!
// Claim mastery, over the unwordly!
//
// Over the language which wobbles and rolls,
// Whose weak foundation is crattered with holes,
// Which on your sanity takes it's slow toll.
// As you suffer from the stories told.

// java -cp js.jar:lanterna-3.0.1.jar org.mozilla.javascript.tools.debugger.Main -f "myprogram.js" -opt 9

// Todo:
// [x] Terminal Setup
// [x] Log menu
// [x] Perimative UI
// [x] Cavern Map Gen
// [x] Consistent Random
// [x] Action replays + auto commit
// [x] Player Movment
// [x] FOV
// [x] Multilevel
// [x] Last seen
// [ ] AI & Monsters & Combat
// [ ] Look around
// [ ] Splash screen
// [ ] FOV edge cases fixes. (Non visible walls, visible diagonals)
// [ ] Light and visibility
// [ ] Sound
// [ ] AI & Monsters & Combat, revisited
// [ ] Player Inventory
// [ ] Stats
// [ ] Items
// [ ] Chests
// [ ] Better map gen variety (e.g. Rooms, doors, ect).
// [ ] Tutorial
// [ ] Help screen
// [ ] Music

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

let LOOK_GOOD = true;

if (!LOOK_GOOD) {
    stdout.printf("\u001B[31mXTerm doesn't support some good looking characters, I assume your going to test it in XTerm, so we default with some not so good looking ones. If your terminal does support them (any other terminal bassically), please go to the source code and flip the `LOOK_GOOD` flag on!\n");
    stdout.printf("\u001B[25mIt should be noted that some terminals don't support blinking (e.g. XTerm, LXTerminal, ect). This Text should be blinking.\n");
    stdout.printf("\u001B[25mHere is underlining and \u001B[7minversing and \u001B[1m bold and finally \u001B[9m crossed out.\n");
    stdout.printf("\u001B[0m\u001B[32mMay I suggest xfce4-terminal?\n");
    stdout.printf("\u001B[0m\n");
    Thread.sleep(2000);
}

stdout.printf("This game has been tested with resolutions of 80 by 24 and higher. Please set your terminal to 80 by 24 or higher.\n");
//Thread.sleep(2000);

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

function CoordPair(x, y) {
    return {
        "x": x,
        "y": y,
    };
}

function InRange(a, b, r) {
    if (
        a.x - r <= b.x
        && a.x + r >= b.x
        && a.y - r <= b.y
        && a.y + r >= b.y
    ) { 
        return true;
    }

    return false;
}

/*
 * For legal reasons I must include this:
 *
 * Copyright JS Foundation and other contributors, https://js.foundation/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// From jQuery source code.
var IsFunction = function isFunction( obj ) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// From jQuery source code.
let IsPlainObject = function(obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = Object.getPrototypeOf(obj);

    // Objects with no prototype (e.g., `Object.create(null)`) are plain
    if (!proto) {
        return true;
    }

    let class2type = {};
    let hasOwn = class2type.hasOwnProperty;
    let fnToString = hasOwn.toString;
    let ObjectFunctionString = fnToString.call(Object);
    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

// From jQuery source code.
let Extend;
Extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !IsFunction(target)) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (IsPlainObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && IsPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = Extend(deep, clone, copy);
                // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

function ASSERT(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function ColourRatio(a, b, r) {
    let ac = a.toColor();
    let bc = b.toColor();

    let ra = 1 - r;
    let rb = r;

    return TextColor.Indexed.fromRGB(
        ra * ac.getRed()     + rb * bc.getRed(),
        ra * ac.getGreen()   + rb * bc.getGreen(),
        ra * ac.getBlue()    + rb * bc.getBlue()
    );
}

function ColourRatioToBG(a, r) {
    let tg = screen.newTextGraphics();
    let bg = tg.getForegroundColor();
    return ColourRatio(bg, a, r);
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

    "BRAINEATER_CREATURE": 2,
    //"SKELETAL_PIKEMAN_CREATURE": 2,
    //"SKELETAL_ARCHER_CREATURE": 2,
    //"WHIZZBOT_CREATURE": 2,
    //"GREYGOO_CREATURE": 2,

    "BRAINEATER_CREATURE_COST": 1,
    //"SKELETAL_PIKEMAN_CREATURE": 2,
    //"SKELETAL_ARCHER_CREATURE": 2,
    //"WHIZZBOT_CREATURE": 2,
    //"GREYGOO_CREATURE": 2,

    "MAX_BRAINEATER_HP": 50,
    //"SKELETAL_PIKEMAN_CREATURE": 2,
    //"SKELETAL_ARCHER_CREATURE": 2,
    //"WHIZZBOT_CREATURE": 2,
    //"GREYGOO_CREATURE": 2,

    "FLOOR_TILE": 1,
    //"DOOR_TILE": 2,
    //"SECRET_DOOR_TILE": 3,
    //"WALL_TILE": 4,
    //"CHEST_TILE": 5,
    "DIRT_TILE": 6,
    "UP_STAIRS_TILE": 7,
    "DOWN_STAIRS_TILE": 8,

    "MAX_PLAYER_HP": 1000,

    "TURN_SP": 1000,

    "LEVEL_X_DIM": 64,
    "LEVEL_Y_DIM": 64,

    // Thank you ##latin @ freenode.net for helping translate this.
    "GAME_NAME": "Dominīs Temporis",

    "HEAD_ACTION": 0,
    "MOVE_NORTH_ACTION": 1,
    "MOVE_NORTHEAST_ACTION": 2,
    "MOVE_EAST_ACTION": 3,
    "MOVE_SOUTHEAST_ACTION": 4,
    "MOVE_SOUTH_ACTION": 5,
    "MOVE_SOUTHWEST_ACTION": 6,
    "MOVE_WEST_ACTION": 7,
    "MOVE_NORTHWEST_ACTION": 8,
    "ROTATE_CLOCKWISE_ACTION": 9,
    "ROTATE_COUNTERCLOCKWISE_ACTION": 10,
    "ACCEND_UPWARDS_ACTION": 11,
    "DECCEND_DOWNARDS_ACTION": 12,

    "SP_REFILL_RATE": 0.2,
    "SP_REFILL_RATE_AI": 1,

    "CREATURE_POINTS": 10,
    "CREATURE_POINTS_INFLATION": 1.07,
});

/*
 * Global gamestate variables
 */
let running = true;
let gameover = false;
let thisInput;
let screen;
let term;

let random = new Random(java.lang.System.currentTimeMillis());
let crandom = {
    "isRecording": false,
    "recordedValues": [],
    "isReplaying": false,
    "replayingValues": [],
};

crandom.StartRecording = function() {
    ASSERT(!this.isRecording, "Already recording");
    this.isRecording = true;
}

crandom.StopRecording = function() {
    ASSERT(this.isRecording, "Not recording");
    this.isRecording = false;
    let ret = this.recordedValues;
    this.recordedValues = [];
    return ret;
}

crandom.StartReplaying = function(replay) {
    ASSERT(!this.isReplaying, "Already replaying.");
    this.isReplaying = true;
    this.replayingValues = replay;
}

crandom.StopReplaying = function() {
    ASSERT(this.isReplaying, "Not replaying.");
    this.isReplaying = false;
    this.replayingValues = [];
}

crandom.NextInt = function(i) {
    let r;
    if (this.isReplaying && this.replayingValues.length) {
        ASSERT(i == this.replayingValues[0].i, "Max values should be consistent.");
        r = this.replayingValues[0].r;
        this.replayingValues = this.replayingValues.slice(1);
    } else {
        r = random.nextInt(i);
    }

    if (this.isRecording) {
        this.recordedValues[this.recordedValues.length] = {"i": i, "r": r};
    }

    return r;
}

// Tile flashing logic
let time = 0;
let mapDrawLevels;

// Maps
let curLevel = 0;
let mapLevels = [];

// Turn Data
let turnSel = [];
let turnData = [{
    "creature": -1,
    "action": constants.HEAD_ACTION,
    "played": true,
    "replay": [],
    "next": [],
}];
let turnHead = turnData[0];
let mapHead;
let autoCommit = false;

function Commit() {
    let pLoc = FindPlayerLocation(mapHead);
    ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

    for (let i = 0; i < mapHead.creatures.length; ++i) {
        let c = mapHead.creatures[i];
        if (c.type == constants.CHARACTER_CREATURE) {
            c.sp += constants.SP_REFILL_RATE * constants.TURN_SP;
            c.sp = Math.min(c.sp, constants.TURN_SP);
        } else {
            c.sp += constants.SP_REFILL_RATE_AI * constants.TURN_SP;
            c.sp = Math.min(c.sp, constants.TURN_SP);
        }
    }

    turnSel = [];
    turnData = [{
        "creature": -1,
        "action": constants.HEAD_ACTION,
        "played": true,
        "replay": [],
        "next": [],
    }];
    turnHead = turnData[0];

    mapLevels[curLevel] = Extend(true, {}, mapHead);
}

function Replay(r) {
    let nextTurnHead = turnHead.next[r];
    let creature = nextTurnHead.creature;
    let dc = mapHead.creatures[nextTurnHead.creature];

    let pLoc = FindPlayerLocation(mapHead);
    ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

    let isPlayer = creature == pLoc;

    if (isPlayer) {
        if (nextTurnHead.played) {
            crandom.StartReplaying(nextTurnHead.replay);
        } else {
            crandom.StartRecording();
        }
    }

    let suc;
    let cost;
    let tirednessMatters = true;
    let canDoPlayerFirstTime = true;

    switch (nextTurnHead.action) {
        case constants.MOVE_NORTH_ACTION:
            suc = MoveCreature(mapHead, CoordPair(0, -1), creature);
            cost = (AngleDir(constants.NORTH_DIR, dc.dir) * 0.1 + 1) * 100;
            break;
        case constants.MOVE_NORTHEAST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(1, -1), creature);
            cost = (AngleDir(constants.NORTHEAST_DIR, dc.dir) * 0.1 + 1) * 100 * Math.sqrt(2);
            break;
        case constants.MOVE_EAST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(1, 0), creature);
            cost = (AngleDir(constants.EAST_DIR, dc.dir) * 0.1 + 1) * 100;
            break;
        case constants.MOVE_SOUTHEAST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(1, 1), creature);
            cost = (AngleDir(constants.SOUTHEAST_DIR, dc.dir) * 0.1 + 1) * 100 * Math.sqrt(2);
            break;
        case constants.MOVE_SOUTH_ACTION:
            suc = MoveCreature(mapHead, CoordPair(0, 1), creature);
            cost = (AngleDir(constants.SOUTH_DIR, dc.dir) * 0.1 + 1) * 100;
            break;
        case constants.MOVE_SOUTHWEST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(-1, 1), creature);
            cost = (AngleDir(constants.SOUTHWEST_DIR, dc.dir) * 0.1 + 1) * 100 * Math.sqrt(2);
            break;
        case constants.MOVE_WEST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(-1, 0), creature);
            cost = (AngleDir(constants.WEST_DIR, dc.dir) * 0.1 + 1) * 100;
            break;
        case constants.MOVE_NORTHWEST_ACTION:
            suc = MoveCreature(mapHead, CoordPair(-1, -1), creature);
            cost = (AngleDir(constants.NORTHWEST_DIR, dc.dir) * 0.1 + 1) * 100 * Math.sqrt(2);
            break;

        case constants.ROTATE_CLOCKWISE_ACTION:
            dc.dir = NextDir(dc.dir, true);
            cost = 10;
            suc = true;
            break;
        case constants.ROTATE_COUNTERCLOCKWISE_ACTION:
            dc.dir = NextDir(dc.dir, false);
            cost = 10;
            suc = true;
            break;

        case constants.WAIT_ACTION:
            cost = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < mapHead.creatures.length; ++i) {
                cost = Math.min(mapHead.creatures[i].waitTime, cost);
            }

            cost = (Math.max(cost, dc.waitTime) - Math.min(cost, dc.waitTime)) / 2;
            suc = true;
            tirednessMatters = false;
            canDoPlayerFirstTime = false;
            break;

        case constants.ACCEND_UPWARDS_ACTION:
            if (mapHead.tiles[dc.x + dc.y * mapHead.dims.x].type == constants.UP_STAIRS_TILE) {
                if (curLevel > 0) {
                    Commit();
                    if (nextTurnHead.played) {
                        crandom.StopReplaying();
                    } else {
                        crandom.StopRecording();
                    }
                    --curLevel;
                    SetupLevel(false);
                    Revert(true);
                    return true;
                }
            }
            suc = false;
            cost = 0;
            break;
        case constants.DECCEND_DOWNARDS_ACTION:
            if (mapHead.tiles[dc.x + dc.y * mapHead.dims.x].type == constants.DOWN_STAIRS_TILE) {
                Commit();
                if (nextTurnHead.played) {
                    crandom.StopReplaying();
                } else {
                    crandom.StopRecording();
                }
                ++curLevel;
                SetupLevel(true);
                Revert(true);
                return true;
            }
            suc = false;
            cost = 0;
            break;

        default:
            ASSERT(false, "Unkown action.");
    }

    if (tirednessMatters) {
        cost *= constants.TURN_SP;
        cost /= mapLevels[curLevel].creatures[creature].sp;
    }

    if (cost > dc.sp) {
        suc = false;
    }

    ASSERT(isPlayer || suc, "AI should never fail.");

    nextTurnHead.played = true;
    turnHead = nextTurnHead;
    turnSel[turnSel.length] = r;

    if (!suc) {
        if (nextTurnHead.played) {
            crandom.StopReplaying();
        } else {
            nextTurnHead.replay = crandom.StopRecording();
        }

        return false;
    }

    for (let i = 0; i < mapHead.creatures.length; ++i) {
        mapHead.creatures[i].waitTime -= cost;
    }
    dc.waitTime += 2 * cost;
    dc.sp -= cost;

    if (isPlayer) {
        switch (nextTurnHead.action) {
            case constants.MOVE_NORTH_ACTION:
            case constants.MOVE_NORTHEAST_ACTION:
            case constants.MOVE_EAST_ACTION:
            case constants.MOVE_SOUTHEAST_ACTION:
            case constants.MOVE_SOUTH_ACTION:
            case constants.MOVE_SOUTHWEST_ACTION:
            case constants.MOVE_WEST_ACTION:
            case constants.MOVE_NORTHWEST_ACTION:
                if (mapHead.tiles[dc.x + dc.y * mapHead.dims.x].type == constants.UP_STAIRS_TILE) {
                    let lf = NewLogFactory();
                    if (curLevel == 0) {
                        lf.SetTxt("The surface's light casts it's shadow down,");
                        lf.CommitToLog();
                        lf.SetTxt("knowing you can't go back up makes you frown,");
                        lf.CommitToLog();
                        lf.SetTxt("lest you find your head fallen on the ground.");
                        lf.CommitToLog();
                    } else {
                        lf.SetTxt("In the dark you can construe,");
                        lf.CommitToLog();
                        lf.SetTxt("a skyward winding corkscrew.");
                        lf.CommitToLog();
                    }
                }
                else if (mapHead.tiles[dc.x + dc.y * mapHead.dims.x].type == constants.DOWN_STAIRS_TILE) {
                    let lf = NewLogFactory();
                    lf.SetTxt("From the stairs, emanates megatons of evil,");
                    lf.CommitToLog();
                    lf.SetTxt("whipin' you back into a state of vigil.");
                    lf.CommitToLog();
                }
                break;
        }

        while (true) {
            stderr.printf("Dispatching AI\n");
            let minP = Number.MAX_SAFE_INTEGER;
            let numC = 0;
            for (let i = 0; i < mapHead.creatures.length; ++i) {
                let c = mapHead.creatures[i];
                if (c.type == constants.CHARACTER_CREATURE && !canDoPlayerFirstTime) {
                    continue;
                }

                if (c.waitTime < minP) {
                    minP = c.waitTime;
                    numC = 1;
                } else if (c.waitTime == minP) {
                    ++numC;
                }
            }

            ASSERT(numC != 0);
            let cC = crandom.NextInt(numC) + 1;
            let i;
            for (i = 0; cC != 0; ++i) {
                let c = mapHead.creatures[i];
                if (c.type == constants.CHARACTER_CREATURE && !canDoPlayerFirstTime) {
                    continue;
                }

                if (c.waitTime == minP) {
                    --cC;
                }
            }

            --i;

            let c = mapHead.creatures[i];
            if (c.type == constants.CHARACTER_CREATURE) {
                ASSERT(canDoPlayerFirstTime);
                break;
            }

            DispatchAI(i);

            canDoPlayerFirstTime = true;
        }
    } else {

    }

    if (isPlayer) {
        if (nextTurnHead.played) {
            crandom.StopReplaying();
        } else {
            nextTurnHead.replay = crandom.StopRecording();
        }
    }

    return true;
}

function Revert(comp) {
    mapHead = Extend(true, {}, mapLevels[curLevel]);
    turnHead = turnData[0];
    let prvTurnSel = turnSel;
    turnSel = [];

    if (comp) {
        turnHead.next = [];
    }

    return prvTurnSel;
}

function Rewind(r, abandon) {
    ASSERT(r >= 0 && r <= turnSel.length, "Invalid selections to rewind.");

    let lp;
    for (let i = 0; i < r; ++i) {
        lp = turnSel.pop();
    }

    let prvTurnSel = Revert(false);

    for (let i = 0; i < prvTurnSel.length; ++i) {
        ASSERT(Replay(prvTurnSel[i]), "All commands in the rewind queue should be valid.");
    }

    if (abandon == true) {
        turnHead.next.splice(lp, 1);
    }
}

function RewindToLastChoice() {
    let nth = turnData[0];
    let sel = -1;

    let pLoc = FindPlayerLocation(mapHead);
    ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

    for (let i = 0; i < turnSel.length; ++i) {
        nth = nth.next[turnSel[i]];
        if (nth.creature == pLoc) {
            sel = i;
        }
    }

    if (sel == -1) {
        return;
    }

    --sel;

    Rewind(turnSel.length - sel - 1);
}

function IssueCommand(cr, act) {
    let i;
    for (i = 0; i < turnHead.next.length; ++i) {
        if (turnHead.next[i].action == act && turnHead.next[i].creature == cr) {
            ASSERT(Replay(i), "Pre issued commands should be valid.");
            return;
        }
    }

    turnHead.next[i] = {
        "creature": cr,
        "action": act,
        "played": false,
        "replay": [],
        "next": [],
    };

    if (!Replay(i)) {
        Rewind(1, true);
    }
}

// Thanks, https://gist.github.com/nzakas/9959066
function SimpleCMap(c2) {  
    this._data = {};
    this._c2 = c2;
}

SimpleCMap.prototype = {
    get: function(key) {
        let k = key.x + key.y * constants.LEVEL_X_DIM;
        if (this.has(key)) {
            let d = this._data['@' + k];
            if (this._c2) {
                return CoordPair(
                    d % constants.LEVEL_X_DIM,
                    Math.floor(d / constants.LEVEL_X_DIM)
                );
            } else {
                return d;
            }
        } else {
            return void 0;
        }
    },

    has: function(key) {
        let k = key.x + key.y * constants.LEVEL_X_DIM;
        return this.hasOwnProperty.call(this._data, '@' + k);
    },

    set: function(key, value) {
        let k = key.x + key.y * constants.LEVEL_X_DIM;
        let v = this._c2 ? value.x + value.y * constants.LEVEL_X_DIM : value;
        this._data['@' + k] = v;
    }
};

function AStar(map, start, end) {
    function Dist(s, e) {
        return Math.sqrt(
            (Math.max(s.x, e.x) - Math.min(s.x, e.x))
            * (Math.max(s.x, e.x) - Math.min(s.x, e.x))
            + (Math.max(s.y, e.y) - Math.min(s.y, e.y))
            * (Math.max(s.y, e.y) - Math.min(s.y, e.y))
        );
    }

    function ReconstructPath(cameFrom, current) {
        let ret = [current];
        let c = current;
        while (cameFrom.has(c)) {
            c = cameFrom.get(c);
            ret[ret.length] = c;
        }

        ret.reverse();
        return ret;
    }

    let closedSet = [];
    let openSet = [start];
    let cameFrom = new SimpleCMap(true);
    let gScore = new SimpleCMap(false);
    let fScore = new SimpleCMap(false);

    gScore.set(start, 0);
    fScore.set(start, Dist(start, end));
    
    while (openSet.length != 0) {
        let current = openSet[0];
        let currentI = 0;
        for (let i = 1; i < openSet.length; ++i) {
            if (fScore.get(openSet[i]) < fScore.get(current)) {
                current = openSet[i];
                currentI = i;
            }
        }

        if (current.x == end.x && current.y == end.y) {
            return ReconstructPath(cameFrom, current);
        }

        openSet.splice(currentI, 1);
        closedSet[closedSet.length] = current;

        for (let x = -1; x <= 1; ++x) {
            outer: for (let y = -1; y <= 1; ++y) {
                if (x == 0 && y == 0) {
                    continue outer;
                }

                let n = CoordPair(x + current.x, y + current.y);

                if ((n.x != end.x || n.y != end.y) && !CanMoveCreature(map, CoordPair(x, y), current, true)) {
                    continue outer;
                }

                for (let i = 0; i < closedSet.length; ++i) {
                    if (closedSet[i].x == n.x && closedSet[i].y == n.y) {
                        continue outer;
                    }
                }

                let possibleGScore = gScore.get(current) + Dist(current, n);
                let found = false;
                f: for (let i = 0; i < openSet.length; ++i) {
                    if (openSet[i].x == n.x && openSet[i].y == n.y) {
                        found = true;
                        break f;
                    }
                }

                if (!found) {
                    openSet[openSet.length] = n;
                } else if (gScore.has(n) && possibleGScore >= gScore.get(n)) {
                    continue outer;
                }

                cameFrom.set(n, current);
                gScore.set(n, possibleGScore);
                fScore.set(n, gScore.get(n) + Dist(n, end));
            }
        }
    }

    ASSERT(false, "Path not found.");
}

function DispatchAI(i) {
    stderr.printf("Dispatched AI for %f\n", i);
    let c = mapHead.creatures[i];
    ASSERT(c.type != constants.CHARACTER_CREATURE);

    let pLoc = FindPlayerLocation(mapHead);
    ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");
    let p = mapHead.creatures[pLoc];

    if (c.type == constants.BRAINEATER_CREATURE) {
        let a = CoordPair(c.x, c.y);
        let b = CoordPair(p.x, p.y);
        if (!InRange(a, b, 1)) {
            stderr.printf("Finding path for %f\n", i);
            let path = AStar(mapHead, a, b);
            stderr.printf("Found path for %f\n", i);
            let dir = GetDir(path[0], path[1]);

            if (dir == c.dir) {
                IssueCommand(i, DirToMoveCmd(dir));
            } else {
                IssueCommand(i, DirToRotate(c.dir, dir));
            }
        } else {
            IssueCommand(i, constants.WAIT_ACTION);
        }
    }
    stderr.printf("Dispatched AI for %f END\n", i);
}

function NewLogFactory() {
    let ret = {
        "sgrs": [],
        "fgs": [],
        "bgs": [],
        "txt": ""
    };

    ret.SetSGR = function(sgr, pos, state) {
        let i;
        for (i = 0; i < this.sgrs.length && this.sgrs[i].pos != pos; ++i) {}

        if (i == this.sgrs.length) {
            this.sgrs[i] = {};
            this.sgrs[i].pos = pos;
            this.sgrs[i].sgrs = {};
        }
        this.sgrs[i].sgrs[sgr] = state;
    };

    ret.SetFg = function(fg, pos) {
        let i;
        for (i = 0; i < this.fgs.length && this.fgs[i].pos != pos; ++i) {}

        this.fgs[i] = {};
        this.fgs[i].pos = pos;
        this.fgs[i].fg = fg;
    };

    ret.SetBg = function(bg, pos) {
        let i;
        for (i = 0; i < this.bgs.length && this.bgs[i].pos != pos; ++i) {}

        this.bgs[i] = {};
        this.bgs[i].pos = pos;
        this.bgs[i].bg = bg;
    };

    ret.SetTxt = function(txt) {
        this.txt = txt;
    };

    ret.EnableSGRS = function(sgrs, pos) {
        for (let i = 0; i < sgrs.length; ++i) {
            this.SetSGR(sgrs[i], pos, true);
        }
    };

    ret.DisableSGRS = function(sgrs, pos) {
        for (let i = 0; i < sgrs.length; ++i) {
            this.SetSGR(sgrs[i], pos, false);
        }
    };

    ret.CommitToLog = function() {
        this.sgrs.sort(function(a, b) { return a.pos - b.pos; });
        this.fgs.sort(function(a, b) { return a.pos - b.pos; });
        this.bgs.sort(function(a, b) { return a.pos - b.pos; });

        let next = {
            "sgrs": this.sgrs,
            "fgs": this.fgs,
            "bgs": this.bgs,
            "txt": this.txt,
        };

        mapHead.log[mapHead.log.length] = Extend(true, {}, next);
    };

    return ret;
}

function NewDirtTile() {
    let ret = {};
    ret.type = constants.DIRT_TILE;
    ret.flashVisible = true;
    ret.canWalk = false;
    ret.opaque = true;
    return ret;
}

function NewWallTile() {
    let ret = {};
    ret.type = constants.WALL_TILE;
    ret.flashVisible = true;
    ret.canWalk = false;
    ret.opaque = true;
    return ret;
}

function NewStairsTile(up) {
    let ret = {};
    ret.type = up ? constants.UP_STAIRS_TILE : constants.DOWN_STAIRS_TILE;
    ret.flashVisible = true;
    ret.canWalk = true;
    ret.opaque = false;
    return ret;
}

function NewFloorTile() {
    let ret = {};
    ret.type = constants.FLOOR_TILE;
    ret.flashVisible = false;
    ret.canWalk = true;
    ret.opaque = false;

    switch (random.nextInt(6)) {
        case 0:
            ret.rchar = ".";
            break;
        case 1:
            ret.rchar = ",";
            break;
        case 2:
            ret.rchar = "\"";
            break;
        case 3:
            ret.rchar = "'";
            break;
        case 4:
            ret.rchar = ":";
            break;
        case 5:
            ret.rchar = ";";
            break;
    }

    return ret;
}

// Thanks:
//      http://www.roguebasin.com/index.php?title=Permissive_Field_of_View_in_Python
//      https://github.com/skishore/z/blob/master/permissive-fov/permissive-fov.cc
//      https://web.archive.org/web/20170708200308/http://www.roguebasin.com/index.php?title=Precise_Permissive_Field_of_View
function FOV(map, x1, y1, r, dir) {
    let ret = Array(map.dims.x * map.dims.y);

    for (let i = 0; i < ret.length; ++i) {
        ret[i] = false;
    }

    function NewLine(x1, y1, x2, y2) {
        return {
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,

            "dx": function() { return this.x2 - this.x1; },
            "dy": function() { return this.y2 - this.y1; },

            "PBellow": function(x, y) { return this.RelativeSlope(x, y) > 0; },
            "PBellowOrCollinear": function(x, y) { return this.RelativeSlope(x, y) >= 0; },
            "PAbove": function(x, y) { return this.RelativeSlope(x, y) < 0; },
            "PAboveOrCollinear": function(x, y) { return this.RelativeSlope(x, y) <= 0; },
            "PCollinear": function(x, y) { return this.RelativeSlope(x, y) == 0; },
            "LCollinear": function(line) {
                return this.PCollinear(line.x1, line.y1)
                    && this.PCollinear(line.x2, line.y2);
            },
            "RelativeSlope": function(x, y) {
                return (this.dy() * (this.x2 - x)) - (this.dx() * (this.y2 - y));
            }
        };
    }

    function NewViewBump(x, y, par) {
        return {
            "x": x,
            "y": y,
            "par": par
        };
    }

    function NewView(shL, stL) {
        return {
            "shallowLine": shL,
            "steepLine": stL,
            "shallowBump": null,
            "steepBump": null
        };
    }

    function AddShallowBump(x, y, activeViews, viewIndex) {
        activeViews[viewIndex].shallowLine.x2 = x;
        activeViews[viewIndex].shallowLine.y2 = y;

        activeViews[viewIndex].shallowBump = NewViewBump(
            x,
            y,
            activeViews[viewIndex].shallowBump
        );

        let cur = activeViews[viewIndex].steepBump;
        while (cur != null) {
            if (activeViews[viewIndex].shallowLine.PAbove(cur.x, cur.y)) {
                activeViews[viewIndex].shallowLine.x1 = cur.x;
                activeViews[viewIndex].shallowLine.y1 = cur.y;
            }

            cur = cur.par;
        }
    }

    function AddSteepBump(x, y, activeViews, viewIndex) {
        activeViews[viewIndex].steepLine.x2 = x;
        activeViews[viewIndex].steepLine.y2 = y;

        activeViews[viewIndex].steepBump = NewViewBump(
            x,
            y,
            activeViews[viewIndex].steepBump
        );

        let cur = activeViews[viewIndex].shallowBump;
        while (cur != null) {
            if (activeViews[viewIndex].steepLine.PBellow(cur.x, cur.y)) {
                activeViews[viewIndex].steepLine.x1 = cur.x;
                activeViews[viewIndex].steepLine.y1 = cur.y;
            }

            cur = cur.par;
        }
    }

    function CheckView(activeViews, viewIndex) {
        let shallowLine = activeViews[viewIndex].shallowLine;
        let steepLine = activeViews[viewIndex].steepLine;

        if (
            shallowLine.LCollinear(steepLine)
            && (shallowLine.PCollinear(0, 1) || shallowLine.PCollinear(1, 0))
        ) {
            activeViews.splice(viewIndex, 1);
            return false;
        } else {
            return true;
        }
    }

    function VisitCoord(x1, y1, x, y, dx, dy, viewIndex, activeViews) {
        let topLeft = CoordPair(x, y + 1);
        let bottomRight = CoordPair(x + 1, y);

        while (
            viewIndex.m < activeViews.length
            && activeViews[viewIndex.m].steepLine.PBellowOrCollinear(bottomRight.x, bottomRight.y)
        ) {
            ++viewIndex.m;
        }

        if (
            viewIndex.m == activeViews.length ||
            activeViews[viewIndex.m].shallowLine.PAboveOrCollinear(topLeft.x, topLeft.y)
        ) {
            return;
        }

        let rx = x * dx;
        let ry = y * dy;

        let t = x1 + rx + (y1 + ry) * map.dims.x;
        ret[t] = true;

        let isBlocked = map.tiles[t].opaque;
        if (!isBlocked) {
            return;
        }

        if (
            activeViews[viewIndex.m].shallowLine.PAbove(bottomRight.x, bottomRight.y)
            && activeViews[viewIndex.m].steepLine.PBellow(topLeft.x, topLeft.y)
        ) {
            activeViews.splice(viewIndex.m, 1);
        } else if (
            activeViews[viewIndex.m].shallowLine.PAbove(bottomRight.x, bottomRight.y)
        ) {
            AddShallowBump(topLeft.x, topLeft.y, activeViews, viewIndex.m);
            CheckView(activeViews, viewIndex.m);
        } else if (
            activeViews[viewIndex.m].steepLine.PBellow(topLeft.x, topLeft.y)
        ) {
            AddSteepBump(bottomRight.x, bottomRight.y, activeViews, viewIndex.m);
            CheckView(activeViews, viewIndex.m)
        } else {
            let shallowViewIndex = viewIndex.m;
            let steepViewIndex = ++viewIndex.m;
            activeViews.splice(shallowViewIndex, 0, Extend(true, {}, activeViews[shallowViewIndex]))

            AddSteepBump(bottomRight.x, bottomRight.y, activeViews, shallowViewIndex);
            if (!CheckView(activeViews, shallowViewIndex)) {
                --viewIndex;
                --steepViewIndex;
            }
            AddShallowBump(topLeft.x, topLeft.y, activeViews, steepViewIndex);

            if (!CheckView(activeViews, steepViewIndex)) {
                --viewIndex;
            }
        }
    }

    function CheckQuadrant(map, x1, y1, dx, dy, r, down, up) {
        let activeViews = [];

        let maxI = 4 * r;
        let partI = Math.floor(3.9 * r);
        let shallowLine = NewLine(0, 1, maxI, up ? partI : 0);
        let steepLine = NewLine(1, 0, down ? partI : 0, maxI);
        activeViews[activeViews.length] = NewView(shallowLine, steepLine);

        let viewIndex = {"m": 0};

        let r2 = r * r;
        let i = 1;
        while (i <= maxI && activeViews.length > 0) {
            let startJ = Math.max(0, i - r);
            let maxJ = Math.min(r, i);

            let j = startJ;
            while (j <= maxJ  && viewIndex.m < activeViews.length) {
                let x = i - j;
                let y = j;
                if (
                    x1 + (dx * x) >= 0 && x1 + (dx * x) < map.dims.x
                    && y1 + (dy * y) >= 0 && y1 + (dy * y) < map.dims.y
                    && x * x + y * y <= r2
                ) {
                    VisitCoord(x1, y1, x, y, dx, dy, viewIndex, activeViews);
                }
                ++j;
            }
            ++i;
            viewIndex = {"m": 0};
        }
    }

    ret[x1 + y1 * map.dims.x] = true;

    if (AngleDir(constants.NORTHEAST_DIR, dir) < 3) {
        CheckQuadrant(map, x1, y1,  1, -1, r, dir == constants.SOUTHEAST_DIR, dir == constants.NORTHWEST_DIR);
    }
    if (AngleDir(constants.NORTHWEST_DIR, dir) < 3) {
        CheckQuadrant(map, x1, y1, -1, -1, r, dir == constants.SOUTHWEST_DIR, dir == constants.NORTHEAST_DIR);
    }
    if (AngleDir(constants.SOUTHEAST_DIR, dir) < 3) {
        CheckQuadrant(map, x1, y1,  1,  1, r, dir == constants.NORTHEAST_DIR, dir == constants.SOUTHWEST_DIR);
    }
    if (AngleDir(constants.SOUTHWEST_DIR, dir) < 3) {
        CheckQuadrant(map, x1, y1, -1,  1, r, dir == constants.NORTHWEST_DIR, dir == constants.SOUTHEAST_DIR);
    }

    return ret;
}

try {
    /*
     * Terminal Setup
     */
    {
        let termFactory = new com.googlecode.lanterna.terminal.DefaultTerminalFactory();
        term = termFactory.createTerminalEmulator();
    }
    screen = new TerminalScreen(term);
    screen.startScreen();
    screen.setCursorPosition(null);

    let termSize = screen.getTerminalSize();

    /*
     * Main Game Functions
     */

    function IsWall(tiles, t) {
        return tiles[t].type == constants.WALL_TILE;
    }

    function TilesOfTypeAroundTile(tiles, x, y, x1, y1, offsets) {
        let ret = 0;
        for (let i = 0; i < offsets.length; ++i) {
            let t = offsets[i].x + x1 + (offsets[i].y + y1) * x;
            if (
                offsets[i].x + x1 < 0 || offsets[i].y + y1 < 0
                || offsets[i].x + x1 >= x || offsets[i].y + y1 >= y
                || tiles[t]
            ) {
                ret += 1;
            }
        }

        return ret;
    }

    // Scanline flood fill
    function FloodFill(tiles, x, y, x1, y1) {
        let ret = new Array(x * y);
        for (let i = 0; i < (x * y); ++i) {
            ret[i] = true;
        }

        let stRange = {};
        stRange.goUp = true;
        stRange.goDown = true;
        stRange.y = y1;
        stRange.sx = x1;
        stRange.ex = x1;

        let ranges = [stRange];

        while (ranges.length) {
            let r = ranges.pop();

            if (!ret[r.sx + r.y * x]) {
                continue;
            }

            let cex = r.ex;
            while ((cex + 1) < x && !tiles[cex + 1 + r.y * x]) {
                ++cex;
            }

            let csx = r.sx;
            while ((csx - 1) >= 0 && !tiles[csx - 1 + r.y * x]) {
                --csx;
            }

            for (let cx = csx; cx <= cex; ++cx) {
                ret[cx + r.y * x] = false;
            }

            function Line(tiles, r, csx, cex, ranges, up) {
                let yO = up ? -1 : 1;
                let go = up ? r.goUp : r.goDown;

                let shown = false;
                let cx;
                for (cx = csx; cx <= cex; ++cx) {
                    if (!shown && (tiles[cx + (r.y + yO) * x] || !go && cx == r.sx)) {
                        shown = true;

                        if (cx > csx) {
                            let stRange = {};
                            stRange.goUp = up;
                            stRange.goDown = !up;
                            stRange.y = r.y + yO;
                            stRange.sx = csx;
                            stRange.ex = cx - 1;
                            ranges[ranges.length] = stRange;
                        }
                    } else if (shown && !tiles[cx + (r.y + yO) * x] && (go || cx < r.sx || cx > r.ex)) {
                        shown = false;
                        csx = cx;
                    }
                }

                if (!shown) {
                    let stRange = {};
                    stRange.goUp = up;
                    stRange.goDown = !up;
                    stRange.y = r.y + yO;
                    stRange.sx = csx;
                    stRange.ex = cx - 1;
                    ranges[ranges.length] = stRange;
                }
            }

            Line(tiles, r, csx, cex, ranges, true);
            Line(tiles, r, csx, cex, ranges, false);
        }

        return ret;
    }

    // Thanks, http://roguebasin.roguelikedevelopment.org/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
    function MakeTileGrid(x, y) {
        let offsets1 = [
            CoordPair(-1, -1), CoordPair( 0, -1), CoordPair(+1, -1),
            CoordPair(-1,  0), CoordPair( 0,  0), CoordPair(+1,  0),
            CoordPair(-1, +1), CoordPair( 0, +1), CoordPair(+1, +1)
        ];

        let offsets2 = [
            CoordPair(-2, -2), CoordPair(-1, -2), CoordPair( 0, -2), CoordPair(+1, -2), CoordPair(+2, -2),
            CoordPair(-2, -1),                                                          CoordPair(+2, -1),
            CoordPair(-2,  0),                                                          CoordPair(+2,  0),
            CoordPair(-2, +1),                                                          CoordPair(+2, +1),
            CoordPair(-2, +2), CoordPair(-1, +2), CoordPair( 0, +2), CoordPair(+1, +2), CoordPair(+2, +2)
        ];

        while (true) {
            let tiles = new Array(x * y);
            for (let cy = 0; cy < y; ++cy) {
                for (let cx = 0; cx < x; ++cx) {
                    let t = cx + cy * x;
                    let dirt = random.nextInt(100) < 40;
                    if (dirt) {
                        tiles[t] = true;
                    } else {
                        tiles[t] = false;
                    }
                }
            }

            for (let i = 0; i < 7; ++i) {
                let prvTiles = tiles;
                tiles = new Array(x * y);

                for (let cy = 0; cy < y; ++cy) {
                    for (let cx = 0; cx < x; ++cx) {
                        let t = cx + cy * x;
                        let n1 = TilesOfTypeAroundTile(
                            prvTiles,
                            x, y,
                            cx, cy,
                            offsets1
                        );
                        let n2 = TilesOfTypeAroundTile(
                            prvTiles,
                            x, y,
                            cx, cy,
                            offsets2
                        );

                        if (n1 >= 5 || (n1 + n2) <= Math.min(i, 2)) {
                            tiles[t] = true;
                        } else {
                            tiles[t] = false;
                        }
                    }
                }
            }

            for (let i = 0; i < 4; ++i) {
                let prvTiles = tiles;
                tiles = new Array(x * y);

                for (let cy = 0; cy < y; ++cy) {
                    for (let cx = 0; cx < x; ++cx) {
                        let t = cx + cy * x;
                        let n1 = TilesOfTypeAroundTile(
                            prvTiles,
                            x, y,
                            cx, cy,
                            offsets1
                        );

                        if (n1 >= 4) {
                            tiles[t] = true;
                        } else {
                            tiles[t] = false;
                        }
                    }
                }
            }

            for (let i = 0; i < 1; ++i) {
                let prvTiles = tiles;
                tiles = new Array(x * y);

                for (let cy = 0; cy < y; ++cy) {
                    for (let cx = 0; cx < x; ++cx) {
                        let t = cx + cy * x;
                        let n1 = TilesOfTypeAroundTile(
                            prvTiles,
                            x, y,
                            cx, cy,
                            offsets1
                        );

                        if (n1 >= 5) {
                            tiles[t] = true;
                        } else {
                            tiles[t] = false;
                        }
                    }
                }
            }

            let rTile = random.nextInt(tiles.length);
            while (tiles[rTile]) {
                rTile = random.nextInt(tiles.length);
            }

            let prvTiles = tiles;
            tiles = FloodFill(
                prvTiles,
                x, y,
                rTile % x, Math.floor(rTile / x)
            );

            for (let cx = 0; cx < x; ++cx) {
                let t = cx + (y - 1) * x;
                tiles[cx] = true;
                tiles[t] = true;
            }

            for (let cy = 0; cy < y; ++cy) {
                let t = cy * x;
                tiles[t + x - 1] = true;
                tiles[t] = true;
            }

            let fc = 0;
            for (let i = 0; i < tiles.length; ++i) {
                if (tiles[i]) {
                    tiles[i] = NewDirtTile();
                } else {
                    tiles[i] = NewFloorTile();
                    ++fc;
                }
            }

            for (let i = 0; i < tiles.length; ++i) {
                if (tiles[i].type == constants.FLOOR_TILE) {
                    tiles[i] = NewStairsTile(true);
                    break;
                }
            }

            for (let i = tiles.length - 1; i >= 0; --i) {
                if (tiles[i].type == constants.FLOOR_TILE) {
                    tiles[i] = NewStairsTile(false);
                    break;
                }
            }

            if (fc >= tiles.length * 0.4) {
                return tiles;
            }

            stderr.printf("Retrying map gen, fc %f, len %f\n", fc, tiles.length / 2);
        }
    }

    function NewBrainEater(x, y) {
        return {
            "type": constants.BRAINEATER_CREATURE,
            "x": x,
            "y": y,
            "dir": constants.NORTH_DIR,
            "hp": constants.MAX_BRAINEATER_HP,
            "sp": constants.TURN_SP,
            "mhp": constants.MAX_BRAINEATER_HP,
            "waitTime": 0,
        };
    }
    
    function HasCreature(cs, t) {
        let x = t % constants.LEVEL_X_DIM;
        let y = Math.floor(t / constants.LEVEL_X_DIM);
        for (let i = 0; i < cs.length; ++i) {
            if (x == cs[i].x && y == cs[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    function GetCreatures(cs, t) {
        let ret = [];
        let x = t % constants.LEVEL_X_DIM;
        let y = Math.floor(t / constants.LEVEL_X_DIM);
        for (let i = 0; i < cs.length; ++i) {
            if (x == cs[i].x && y == cs[i].y) {
                ret[ret.length] = i;
            }
        }t
        
        return ret;
    }

    function SpawnCreatures(tiles) {
        let ret = [];
        let points = Math.floor(constants.CREATURE_POINTS * Math.pow(constants.CREATURE_POINTS_INFLATION, curLevel));

        let mPoints = Math.min(
            0,
            constants.BRAINEATER_CREATURE_COST
        );

        while (points >= mPoints) {
            let rTile = random.nextInt(tiles.length);
            while (!tiles[rTile].canWalk || HasCreature(ret, rTile)) {
                rTile = random.nextInt(tiles.length);
            }

            let c = random.nextInt(1);

            if (c == 0) {
                ret[ret.length] = NewBrainEater(
                    rTile % constants.LEVEL_X_DIM,
                    Math.floor(rTile / constants.LEVEL_X_DIM)
                );
                points -= constants.BRAINEATER_CREATURE_COST;
            }
        }

        return ret;
    }

    function SetupLevel(down) {
        if (curLevel == mapLevels.length) {
            let tiles = MakeTileGrid(constants.LEVEL_X_DIM, constants.LEVEL_Y_DIM);
            let creatures = SpawnCreatures(tiles);

            let seenTiles = new Array(tiles.length);
            for (let i = 0; i < tiles.length; ++i) {
                seenTiles[i] = false;
            }

            mapLevels[curLevel] = {
                "tiles": tiles,
                "creatures": creatures,
                "items": [],
                "dims": CoordPair(constants.LEVEL_X_DIM, constants.LEVEL_Y_DIM),
                "log": [],
                "seenTiles": seenTiles
            };
        }

        let u;
        for (u = 0; u < mapLevels[curLevel].tiles.length; ++u) {
            if (
                !down && mapLevels[curLevel].tiles[u].type == constants.DOWN_STAIRS_TILE
                || down && mapLevels[curLevel].tiles[u].type == constants.UP_STAIRS_TILE
            ) {
                break;
            }
        }
                    
        let rmCs = GetCreatures(mapLevels[curLevel].creatures, u);
        for (let i = 0; i < rmCs.length; ++i) {
            mapLevels[curLevel].creatures.splice(rmCs[i], 1)
        }

        if (curLevel == 0 && down) {
            mapLevels[curLevel].creatures[mapLevels[curLevel].creatures.length] = {
                "type": constants.CHARACTER_CREATURE,
                "x": u % constants.LEVEL_X_DIM,
                "y": Math.floor(u / constants.LEVEL_X_DIM),
                "dir": constants.NORTH_DIR,
                "hp": constants.MAX_PLAYER_HP,
                "sp": constants.TURN_SP,
                "mhp": constants.MAX_PLAYER_HP,
                "waitTime": 0,
            };
        } else if (down) {
            let pLoc = FindPlayerLocation(mapLevels[curLevel]);
            let opLoc = FindPlayerLocation(mapLevels[curLevel - 1]);
            mapLevels[curLevel].creatures[pLoc] = mapLevels[curLevel - 1].creatures[pLoc];
            mapLevels[curLevel].creatures[pLoc].x = u % constants.LEVEL_X_DIM;
            mapLevels[curLevel].creatures[pLoc].y = Math.floor(u / constants.LEVEL_X_DIM);
        } else {
            let pLoc = FindPlayerLocation(mapLevels[curLevel]);
            let opLoc = FindPlayerLocation(mapLevels[curLevel + 1]);
            mapLevels[curLevel].creatures[pLoc] = mapLevels[curLevel + 1].creatures[pLoc];
            mapLevels[curLevel].creatures[pLoc].x = u % constants.LEVEL_X_DIM;
            mapLevels[curLevel].creatures[pLoc].y = Math.floor(u / constants.LEVEL_X_DIM);
        }

        mapDrawLevels = new Array(mapLevels[curLevel].tiles.length);
        for (let i = 0; i < mapLevels[curLevel].tiles.length; ++i) {
            mapDrawLevels[i] = 0;
        }

        mapLevels[curLevel].log = [];
        mapHead = mapLevels[curLevel];

        if (curLevel == 0) {
            let lf = NewLogFactory();
            lf.SetTxt("You're sins banish you from the land above,");
            lf.CommitToLog();
            lf.SetTxt("Accend only with a head on a plate,");
            lf.CommitToLog();
            lf.SetTxt("Either yours or the monster's, held in glove,");
            lf.CommitToLog();
            lf.SetTxt("Lest they take into their own hands your fate.");
            lf.CommitToLog();
            lf.EnableSGRS([SGR.BOLD], 0);
            lf.EnableSGRS([SGR.UNDERLINE], "Welcome to".length + 1);
            lf.DisableSGRS([SGR.UNDERLINE], "Welcome to".length + constants.GAME_NAME.length + 1);
            lf.SetFg(TextColor.ANSI.GREEN, 0);
            lf.SetTxt("Welcome to " + constants.GAME_NAME + "!");
            lf.CommitToLog();
        } else if (down) {
            let lf = NewLogFactory();
            lf.SetTxt("You decend closer to the great evil.");
            lf.CommitToLog();
        } else {
            let lf = NewLogFactory();
            lf.SetTxt("You flee upwards, closer to god's domain, in fear.");
            lf.CommitToLog();
        }

        mapHead = Extend(true, {}, mapLevels[curLevel]);
    }

    function DrawBar(name, val, max, x, y, len, brightness) {
        if (brightness == 0) {
            return;
        }

        let tg = screen.newTextGraphics();

        tg.putString(new TerminalPosition(x + len - name.length + 1, y), name)

        let remLen = len - name.length - 1;
        let barLen = remLen * val / max;
        barLen = barLen < 0 ? 0 : barLen;
        let percStat = val / max;

        if (percStat <= 0) {
            return;
        } else if (percStat < 0.10) {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 0, 0), brightness));
            tg.enableModifiers([SGR.BLINK, SGR.BOLD, SGR.REVERSE]);
        } else if (percStat < 0.20) {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 0, 0), brightness));
            tg.enableModifiers([SGR.BLINK, SGR.BOLD]);
        } else if (percStat < 0.30) {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 0, 0), brightness));
            tg.enableModifiers([SGR.BLINK]);
        } else if (percStat < 0.40) {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 0, 0), brightness));
        } else if (percStat < 0.80) {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 255, 0), brightness));
        } else {
            tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(0, 255, 0), brightness));
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

    function AngleDir(a, b) {
        return Math.max(a, b) - Math.min(a, b) > 4
            ? 8 - Math.max(a, b) + Math.min(a, b)
            : Math.max(a, b) - Math.min(a, b);
    }

    function DirToMoveCmd(dir) {
        switch (dir) {
            case constants.NORTH_DIR:
                return constants.MOVE_NORTH_ACTION;
            case constants.NORTHEAST_DIR:
                return constants.MOVE_NORTHEAST_ACTION;
            case constants.EAST_DIR:
                return constants.MOVE_EAST_ACTION;
            case constants.SOUTHEAST_DIR:
                return constants.MOVE_SOUTHEAST_ACTION;
            case constants.SOUTH_DIR:
                return constants.MOVE_SOUTH_ACTION;
            case constants.SOUTHWEST_DIR:
                return constants.MOVE_SOUTHWEST_ACTION;
            case constants.WEST_DIR:
                return constants.MOVE_WEST_ACTION;
            case constants.NORTHWEST_DIR:
                return constants.MOVE_NORTHWEST_ACTION;
        }
    }

    function DirToRotate(s, t) {
        // FIXME: be efficient
        return constants.ROTATE_CLOCKWISE_ACTION;
    }

    function GetDir(a, b) {
        if (a.x > b.x) {
            if (a.y > b.y) {
                return constants.NORTHWEST_DIR;
            } else if (a.y < b.y) {
                return constants.SOUTHWEST_DIR;
            } else {
                return constants.WEST_DIR;
            }
        } else if (a.x < b.x) {
            if (a.y > b.y) {
                return constants.NORTHEAST_DIR;
            } else if (a.y < b.y) {
                return constants.SOUTHEAST_DIR;
            } else {
                return constants.EAST_DIR;
            }
        } else {
            if (a.y > b.y) {
                return constants.SOUTH_DIR;
            } else if (a.y < b.y) {
                return constants.NORTH_DIR;
            }
        }

        ASSERT(false);
    }

    /*
     * Precondition: |offset.x| <= 1 && |offset.y| <= 1
     */
    function CanMoveCreature(map, offset, coords, overlap) {
        let x = coords.x + offset.x;
        let y = coords.y + offset.y;

        let tile = x + y * map.dims.x;

        if (!map.tiles[tile].canWalk) {
            return false;
        }

        // Diagonals are special.
        if (
            Math.abs(offset.x) == 1 && Math.abs(offset.y) == 1
            && !(
                CanMoveCreature(map, CoordPair(offset.x, 0), coords, false)
                || CanMoveCreature(map, CoordPair(0, offset.y), coords, false)
            )
        ) {
            return false;
        }

        if (overlap) {
            let i;
            for (i = 0; i < map.creatures.length && (map.creatures[i].x != x || map.creatures[i].y != y); ++i) {}
            if (i != map.creatures.length) {
                return false;
            }
        }

        return true;
    }

    function MoveCreature(map, offset, creature) {
        let c = map.creatures[creature];
        let x = c.x + offset.x;
        let y = c.y + offset.y;

        if (!CanMoveCreature(map, offset, CoordPair(c.x, c.y), true)) {
            return false;
        }

        c.x = x;
        c.y = y;

        return true;
    }

    function DrawDirectionWheel(x, y, dir, brightness) {
        if (brightness == 0) {
            return;
        }

        let tg = screen.newTextGraphics();
        tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 255, 255), brightness));
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
        for (i = mapHead.log.length - 1; i >= 0 && linesSoFar < logLines; --i) {
            linesSoFar += Math.ceil(mapHead.log[i].txt.length / lineLen);
        }

        let partials = Math.max(0, linesSoFar - logLines) * lineLen;
        let first = true;
        ++i;

        linesSoFar = 0;
        for (; i < mapHead.log.length; ++i) {
            let tg = screen.newTextGraphics();
            let wrapedLines = Math.ceil(mapHead.log[i].txt.length / lineLen);
            let charsSoFar = 0;

            let j = 0;
            let k = 0;
            let l = 0;
            for (let m = first ? partials : 0; m < mapHead.log[i].txt.length; ++m, ++charsSoFar) {
                if (charsSoFar == lineLen) {
                    charsSoFar = 0;
                    ++linesSoFar;
                }

                for (; j < mapHead.log[i].sgrs.length && mapHead.log[i].sgrs[j].pos < m; ++j) {}
                for (; k < mapHead.log[i].fgs.length  && mapHead.log[i].fgs[k].pos < m; ++k) {}
                for (; l < mapHead.log[i].bgs.length  && mapHead.log[i].bgs[l].pos < m; ++l) {}

                if (j < mapHead.log[i].sgrs.length && mapHead.log[i].sgrs[j].pos == m) {
                    for (let key in mapHead.log[i].sgrs[j].sgrs) {
                        if (
                            mapHead.log[i].sgrs[j].sgrs.hasOwnProperty(key)
                            && mapHead.log[i].sgrs[j].sgrs[key]
                        ) {
                            tg.enableModifiers([SGR.valueOf(key)]);
                        } else {
                            tg.disableModifiers([SGR.valueOf(key)]);
                        }
                    }
                }
                if (k < mapHead.log[i].fgs.length && mapHead.log[i].fgs[k].pos == m) {
                    tg.setForegroundColor(mapHead.log[i].fgs[k].fg);
                }
                if (l < mapHead.log[i].bgs.length && mapHead.log[i].bgs[l].pos == m) {
                    tg.SetBacgroundColor(mapHead.log[i].bgs[l].bg);
                }

                tg.setCharacter(
                    new TerminalPosition(
                        termSize.getColumns() * 2 / 3 + charsSoFar,
                        12 + linesSoFar
                    ),
                    mapHead.log[i].txt[m]
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

    function DrawCreature(map, xO, yO, c, brightness) {
        if (brightness == 0) {
            return;
        }

        let tg = screen.newTextGraphics();
        tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 255, 255), brightness));
        if (c.type == constants.CHARACTER_CREATURE) {
            tg.setCharacter(
                new TerminalPosition(1 + xO, 1 + yO),
                Symbols.FACE_WHITE
            );
        } else if (c.type == constants.BRAINEATER_CREATURE) {
            tg.setCharacter(
                new TerminalPosition(1 + xO, 1 + yO),
                'b'
            );
        }
    }

    function DrawItem(map, xO, yO, t, brightness) {
        if (brightness == 0) {
            return;
        }

        let tg = screen.newTextGraphics();
        tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 255, 255), brightness));
    }

    function DrawTile(map, xO, yO, x, y, brightness) {
        if (brightness == 0) {
            return;
        }

        let tg = screen.newTextGraphics();
        tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 255, 255), brightness));

        let t = x + y * map.dims.x;
        switch (map.tiles[t].type) {
            case constants.EMPTY_TILE:
                break;
            case constants.WALL_TILE:
                let cAbove = IsWall(map.tiles, t - map.dims.x) ? 1 : 0;
                let cBellow = IsWall(map.tiles, t + map.dims.x) ? 2 : 0;
                let cLeft = IsWall(map.tiles, t - 1) ? 4 : 0;
                let cRight = IsWall(map.tiles, t + 1) ? 8 : 0;

                let rchar;
                switch (cAbove + cBellow + cLeft  + cRight) {
                    case 0:
                        rchar = Symbols.WHITE_CIRCLE;
                        break;
                    case 1:
                    case 2:
                    case 3:
                        rchar = Symbols.DOUBLE_LINE_VERTICAL;
                        break;
                    case 4:
                    case 8:
                    case 12:
                        rchar = Symbols.DOUBLE_LINE_HORIZONTAL;
                        break;
                    case 5:
                        rchar = Symbols.DOUBLE_LINE_BOTTOM_RIGHT_CORNER;
                        break;
                    case 6:
                        rchar = Symbols.DOUBLE_LINE_TOP_RIGHT_CORNER;
                        break;
                    case 7:
                        rchar = Symbols.DOUBLE_LINE_T_DOWN;
                        break;
                    case 9:
                        rchar = Symbols.DOUBLE_LINE_BOTTOM_LEFT_CORNER;
                        break;
                    case 10:
                        rchar = Symbols.DOUBLE_LINE_TOP_LEFT_CORNER;
                        break;
                    case 11:
                        rchar = Symbols.DOUBLE_LINE_T_LEFT;
                        break;
                    case 13:
                        rchar = Symbols.DOUBLE_LINE_T_UP;
                        break;
                    case 14:
                        rchar = Symbols.DOUBLE_LINE_T_DOWN;
                        break;
                    case 15:
                        rchar = Symbols.DOUBLE_LINE_CROSS;
                        break;
                }
                tg.setCharacter(
                    new TerminalPosition(1 + xO, 1 + yO),
                    rchar
                );
                break;
            case constants.DIRT_TILE:
                tg.setCharacter(
                    new TerminalPosition(1 + xO, 1 + yO),
                    '#'
                );
                break;
            case constants.FLOOR_TILE:
                tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(160, 160, 160), brightness));
                tg.setCharacter(
                    new TerminalPosition(1 + xO, 1 + yO),
                    map.tiles[t].rchar
                );
                break;
            case constants.UP_STAIRS_TILE:
                tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 160, 160), brightness));
                tg.setCharacter(
                    new TerminalPosition(1 + xO, 1 + yO),
                    "<"
                );
                break;
            case constants.DOWN_STAIRS_TILE:
                tg.setForegroundColor(ColourRatioToBG(TextColor.Indexed.fromRGB(255, 160, 160), brightness));
                tg.setCharacter(
                    new TerminalPosition(1 + xO, 1 + yO),
                    ">"
                );
                break;
        }
    }

    function UpdateGameView() {
        let tg = screen.newTextGraphics();
        let length = Math.floor(termSize.getColumns() * 2 / 3 - 2);
        let width = Math.floor(termSize.getRows() - 2);
        tg.fillRectangle(
            new TerminalPosition(1, 1),
            new TerminalSize(length, width),
            ' '
        );

        let pLoc = FindPlayerLocation(mapHead);
        ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

        let startX = Math.floor(mapHead.creatures[pLoc].x - length / 2);
        let startY = Math.floor(mapHead.creatures[pLoc].y - width / 2);

        let fov = FOV(
            mapHead,
            mapHead.creatures[pLoc].x,
            mapHead.creatures[pLoc].y,
            10,
            mapHead.creatures[pLoc].dir
        );

        for (let i = 0; i < fov.length; ++i) {
            if (fov[i]) {
                mapLevels[curLevel].seenTiles[i] = true;
            }
        }

        let map = mapLevels[curLevel];
        for (let yO = 0; yO < width; ++yO) {
            for (let xO = 0; xO < length; ++xO) {
                let x = startX + xO;
                let y = startY + yO;
                let t = x + y * mapHead.dims.x;

                if (
                    x >= 0
                    && x < mapHead.dims.x
                    && y >= 0
                    && y < mapHead.dims.y
                ) {
                    // Draw Order:
                    // 1. Creatures
                    // 1b. Past Creatures
                    // 2. Items
                    // 2b. Past Items
                    // 3. Tiles
                    let cs = FindCreaturesOnTile(mapHead, x, y);
                    let pcs = FindCreaturesOnTile(map, x, y);
                    let is = FindItemsOnTile(mapHead, x, y);
                    let pis = FindItemsOnTile(map, x, y);

                    // TODO: FIXME
                    //let brightnessMultiplier = fov[t] ? 1 : (mapLevels[curLevel].seenTiles[t] ? 0.5 : 0);
                    let brightnessMultiplier = fov[t] ? 1 : (mapLevels[curLevel].seenTiles[t] ? 0.5 : 1);

                    if (mapDrawLevels[t] < cs.length) {
                        DrawCreature(mapHead, xO, yO, cs[mapDrawLevels[t]], brightnessMultiplier);
                    } else if (mapDrawLevels[t] < (cs.length + pcs.length)) {
                        DrawCreature(map, xO, yO, pcs[mapDrawLevels[t] - cs.length], brightnessMultiplier * 0.5);
                    } else if (mapDrawLevels[t] < (cs.length + pcs.length + is.length)) {
                        DrawItem(mapHead, xO, yO, is[mapDrawLevels[t] - cs.length - psc.length], brightnessMultiplier);
                    } else if (mapDrawLevels[t] < (cs.length + pcs.length + is.length + pis.length)) {
                        DrawItem(map, xO, yO, pis[mapDrawLevels[t] - cs.length - psc.length - is.length], brightnessMultiplier * 0.5);
                    } else {
                        DrawTile(mapHead, xO, yO, x, y, brightnessMultiplier);
                    }

                    ++mapDrawLevels[t];

                    let flash_max =
                        cs.length
                        + pcs.length
                        + is.length
                        + pis.length
                        - (mapHead.tiles[t].flashVisible ? 0 : 1);
                    if (mapDrawLevels[t] > Math.max(flash_max, 0)) {
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

        let map = mapLevels[curLevel];
        let pLoc = FindPlayerLocation(map);
        ASSERT(pLoc != map.creatures.length, "Character not found on level.");

        DrawBar(
            "HP",
            map.creatures[pLoc].hp,
            constants.MAX_PLAYER_HP,
            termSize.getColumns() / 3 * 2 + 1,
            1,
            termSize.getColumns() / 3 - 4,
            .5
        );

        DrawBar(
            "SP",
            map.creatures[pLoc].sp,
            constants.TURN_SP,
            termSize.getColumns() / 3 * 2 + 1,
            2,
            termSize.getColumns() / 3 - 4,
            .5
        );

        DrawDirectionWheel(
            termSize.getColumns() / 6 * 5  - 1,
            6,
            map.creatures[pLoc].dir,
            .5
        );

        pLoc = FindPlayerLocation(mapHead);
        ASSERT(pLoc != map.creatures.length, "Character not found on level.");

        DrawBar(
            "HP",
            mapHead.creatures[pLoc].hp,
            constants.MAX_PLAYER_HP,
            termSize.getColumns() / 3 * 2 + 1,
            1,
            termSize.getColumns() / 3 - 4,
            1
        );

        DrawBar(
            "SP",
            mapHead.creatures[pLoc].sp,
            constants.TURN_SP,
            termSize.getColumns() / 3 * 2 + 1,
            2,
            termSize.getColumns() / 3 - 4,
            1
        );

        DrawDirectionWheel(
            termSize.getColumns() / 6 * 5  - 1,
            6,
            mapHead.creatures[pLoc].dir,
            1
        );

        UpdateLog();
        UpdateGameView();
    }

    function PlayerIssue(pLoc) {
        let tchar = thisInput.getCharacter();
        if (tchar != null) {
            switch (String.fromCharCode(tchar.charValue())) {
                case 'u':
                    IssueCommand(pLoc, constants.MOVE_NORTHWEST_ACTION);
                    break;
                case 'i':
                    IssueCommand(pLoc, constants.MOVE_NORTHEAST_ACTION);
                    break;
                case 'o':
                    IssueCommand(pLoc, constants.ROTATE_CLOCKWISE_ACTION);
                    break;
                case 'p':
                    autoCommit = !autoCommit;
                    break;
                case 'j':
                    IssueCommand(pLoc, constants.MOVE_WEST_ACTION);
                    break;
                case 'k':
                    IssueCommand(pLoc, constants.MOVE_SOUTH_ACTION);
                    break;
                case 'l':
                    IssueCommand(pLoc, constants.MOVE_NORTH_ACTION);
                    break;
                case ';':
                    IssueCommand(pLoc, constants.MOVE_EAST_ACTION);
                    break;
                case 'n':
                    IssueCommand(pLoc, constants.ROTATE_COUNTERCLOCKWISE_ACTION);
                    break;
                case 'm':
                    IssueCommand(pLoc, constants.MOVE_SOUTHWEST_ACTION);
                    break;
                case ',':
                    IssueCommand(pLoc, constants.MOVE_SOUTHEAST_ACTION);
                    break;
                case '.':
                    IssueCommand(pLoc, constants.WAIT_ACTION);
                    break;
                case '<':
                    IssueCommand(pLoc, constants.ACCEND_UPWARDS_ACTION);
                    break;
                case '>':
                    IssueCommand(pLoc, constants.DECCEND_DOWNARDS_ACTION);
                    break;
            }
        }
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

        let pLoc = FindPlayerLocation(mapHead);
        ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

        let oldAC = autoCommit;
        PlayerIssue(pLoc);

        let pc = mapHead.creatures[pLoc];
        if (thisInput.getKeyType() == KeyType.Backspace) {
            RewindToLastChoice();
            autoCommit = false;
        } else if (thisInput.getKeyType() == KeyType.Enter) {
            Commit();
            autoCommit = false;
        }

        while (
            thisInput.getKeyType() != KeyType.Enter
            && autoCommit && oldAC == autoCommit
            && (constants.TURN_SP - pc.sp) > constants.TURN_SP * constants.SP_REFILL_RATE
        ) {
            RewindToLastChoice();
            Commit();
            pLoc = FindPlayerLocation(mapHead);
            ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");
            PlayerIssue(pLoc);
            pc = mapHead.creatures[pLoc];
        }

        pLoc = FindPlayerLocation(mapHead);
        ASSERT(pLoc != mapHead.creatures.length, "Character not found on level.");

        if (mapHead.creatures[pLoc].hp <= 0) {
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

    SetupLevel(true);

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
        }

        thisInput = term.pollInput();
        if (thisInput != null) {
            GameLogic();

            for (let i = 0; i < mapDrawLevels.length; ++i) {
                mapDrawLevels[i] = 0;
            }
            time = 0;
        } else {
            Thread.sleep(50);
        }
    }

    /*
     * Cleanup
     */
    screen.stopScreen();

} catch (err) {
    screen.stopScreen();
    Thread.sleep(200);
    stdout.printf("\nFATAL ERROR: %s\n", err.toString());
    stdout.flush();
}
