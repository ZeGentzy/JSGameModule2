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
var LOOK_GOOD = true;

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
var stdout = java.lang.System.out;
var stdin = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System['in']));
var stderr = java.lang.System.err;
var Thread = java.lang.Thread;
var Random = java.util.Random;

var TextColor = com.googlecode.lanterna.TextColor;
var SGR = com.googlecode.lanterna.SGR;
var KeyType = com.googlecode.lanterna.input.KeyType;
var TerminalScreen = com.googlecode.lanterna.screen.TerminalScreen;
var TextCharacter = com.googlecode.lanterna.TextCharacter;
var TerminalPosition = com.googlecode.lanterna.TerminalPosition;
var TerminalSize = com.googlecode.lanterna.TerminalSize;
var Symbols = com.googlecode.lanterna.Symbols;
var Screen = com.googlecode.lanterna.screen.Screen;

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
    Symbols.DOUBLE_LINE_HORIZONTAL = "b";
}

/*
 * Misc Helper Functions
 */
function ToChar(s) {
    return s.charCodeAt(0);
}

/*
 * Constants
 */
var constants = Object.freeze({
    "NORTH_DIR": 0,
    "NORTHEAST_DIR": 1,
    "EAST_DIR": 2,
    "SOUTHEAST_DIR": 3,
    "SOUTH_DIR": 4,
    "SOUTHWEST_DIR": 5,
    "WEST_DIR": 6,
    "NORTHWEST_DIR": 7,
    "MAX_HP": 200,
    "MAX_SP": 200,
});

/*
 * Global gamestate variables (yes, I know globals aren't the best)
 */
var hp = constants.MAX_HP;
var st = constants.MAX_SP;
var dir = constants.NORTH_DIR;
var running = true;
var thisInput;
var random = new Random();

var term;
try {
    /*
     * Terminal Setup
     */
    {
        var termFactory = new com.googlecode.lanterna.terminal.DefaultTerminalFactory();
        term = termFactory.createTerminal();
    }
    var screen = new TerminalScreen(term);
    screen.startScreen();
    screen.setCursorPosition(null);

    var termSize = screen.getTerminalSize();

    /*
     * Main Game Functions
     */

    function DrawBar(name, val, max, x, y, len) {
        var tg = screen.newTextGraphics();

        tg.putString(new TerminalPosition(x + len - name.length + 1, y), name)

        var remLen = len - name.length - 1;
        var barLen = (remLen - 1) * val / max + 1;
        var percStat = val / max;

        if (percStat <= 0) {
            return;
        } else if (percStat < 0.10) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers(SGR.BLINK);
            tg.enableModifiers(SGR.BOLD);
            tg.enableModifiers(SGR.REVERSE);
        } else if (percStat < 0.20) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers(SGR.BLINK);
            tg.enableModifiers(SGR.BOLD);
        } else if (percStat < 0.30) {
            tg.setForegroundColor(TextColor.ANSI.RED);
            tg.enableModifiers(SGR.BLINK);
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

    function DrawGame() {
        var tg = screen.newTextGraphics();
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
    }

    function GameLogic() {
        if (thisInput != null && thisInput.getKeyType() == KeyType.Escape) {
            running = false;
            return;
        }

        hp -= 10;
    }

    /*
     * Main Game Loop.
     */
    while (running) {
        var newTermSize = screen.doResizeIfNecessary();
        if (newTermSize != null) {
            termSize = newTermSize;
        }

        screen.clear();
        DrawGame();
        screen.refresh(Screen.RefreshType.DELTA);
        Thread.yield();

        thisInput = term.readInput();
        GameLogic();
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
    stdout.printf(" FATAL ERROR: %s\n", err.toString());
}

/*
                         2/3x                                   1/3x
|---------------------------------------------------|--------------------------|
|                                                   | ||||||||||||||||||||| HP |
|                                                   |                          |
|                                                   | ||||||||||||||||||||| SP |
|                                                   |           _   _          |
|                                                   |          |  ^  |         |
|                                                   |            \|/           | 10 chars
|                                                   |          <--O-->         |
|                                                   |            /|\           |
|                                                   |          |_ v _|         |
|                                                   |                          |
|                                                   |--------------------------|
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|                                                   |                          | y - 10 chars.
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|                                                   |                          |
|---------------------------------------------------|--------------------------|
*/
