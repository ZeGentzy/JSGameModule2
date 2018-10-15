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
// Where IDEs, provided, are medieval!
// Tumble those dieing hands 'cross a keyboard.
// Wait for it to un-freeze, makin' me be bored.
//
// Great is havin' t'wait for many minutes.
// If only the comps haven't some rickets,
// you might, just might, get something done, tonight.
// Instead of doing things at home! At night!
//
// Come wittness the slowest autocomplete,
// which fails with lines most basic to complete,
// it's so bad that it must've been a feat,
// to make something so quickly obsolete.
//
// What? Errors when accessing non-members?
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
// Go forth, to the land unheard of are threads.
// Fill your heart with rivers of your regrets,
// for errors, syntactic, or otherwise
// on other threads, go unheard, like your cries.
//
// Scream to the heavens, "may the die be cast."
// Watch as your hand to you is dealt, and gasp,
// fill with dread as you solve errors unread,
// treadin' the domain where no 'buggers can tread.
//
// With constant errors practice coquetry,
// dance with the lady of purgatory,
// hear the stinging sound of your feet on coal,
// watch as issues pile up beyond your control.
//
// If only you could know what you did wrong,
// instead your debugging sessions prolong,
// as you try to guess what mistakes you've made,
// since Rhino JS won't give any aid.
//
// Stand on the lines which only waxe and wane.
// Wave 'round your hand, and practice the arcane.
// Come on! Proclaim eternal victory!
// Claim mastery, over the unwordly!
//
// Over the language which wobbles and rolls,
// whose weak foundation is crattered with holes,
// which on your sanity takes it's slow toll,
// as you suffer from the stories told.
//
// WHAT HAPPENED TO THE ROUGELIKE?
//
// It was slow, to no fault of my own. Simple things, like an A* across a 64x64
// tile map were taking 3-13 seconds. Map generation was taking 9-10 seconds
// before optimization, and down to 1-2 after, ect, ect. The debugger multiplied
// the time taken by like a factor of three. Don't get me started about the
// debugger.
//
// How do I know it's to no fault of my own? For the shits and giggles, I, and
// some people on IRC took the time to write the map gen algorithm in other
// langs, the results are in:
//  - Rhino Js with `-opt -1`: ~25 seconds
//  - Rhino Js with `-opt 9`: ~1-2 seconds
//  - C (or maybe it was C++, didn't ask): ~0.01 seconds*
//  - Rust: ~0.01 seconds
//
//  * Measured and written by "OrenAudeles", on IRC
//
//  Anyways, Dominis Temporis (the rougelike) has been replaced by
//  Window Clicker TM (C) (R), an idea pitched by "OrenAudeles", inspired by
//  such ~borring~ fun games as Cookie Clicker. The source code for Dominis
//  Temporis, which interestingly actually fully implements the submitted
//  diagram dispite being incomplete, can be found in the file `myprogram2.js`.

// java -cp js.jar:lanterna-3.0.1.jar org.mozilla.javascript.tools.debugger.Main -f "myprogram.js" -opt 9

/*
 * Java imports
 */
let stdout = java.lang.System.out;
let stdin = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System['in']));
let stderr = java.lang.System.err;
let Thread = java.lang.Thread;
let Random = java.util.Random;
let Character = java.lang.Character;

let TerminalSize = com.googlecode.lanterna.TerminalSize;
importPackage(com.googlecode.lanterna.gui2);
importPackage(com.googlecode.lanterna.gui2.dialogs);
let Screen = com.googlecode.lanterna.screen.Screen;
let DefaultTerminalFactory = com.googlecode.lanterna.terminal.DefaultTerminalFactory;
let WHint = com.googlecode.lanterna.gui2.Window.Hint;
let TerminalPosition = com.googlecode.lanterna.TerminalPosition;

stdout.printf("This game has been tested with resolutions of 80 by 24 and higher. Please set your terminal to 80 by 24 or higher.\n");
//Thread.sleep(2000);

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
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// From jQuery source code.W
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

/*
 * Constants
 */
let constants = Object.freeze({
    "WINDOW_WIDTH": 36,
});

/*
 * Global gamestate variables
 */
let running = true;
let gameover = false;
let thisInput;
let textGUI;
let screen;
let time = 0;
let ads = [];
let moneyAccess = new java.util.concurrent.Semaphore(1);
let money = 0;
let random = new Random();

let activeWindowAccess = new java.util.concurrent.Semaphore(1);
let activeWindow;

// Bad things happen if we don't put this out here.
let objsAccess = new java.util.concurrent.Semaphore(1);
let objs = [];

let actionAccess = new java.util.concurrent.Semaphore(1);
let action;
let activeAction;
let activeActionBuy;

/*
 * We need to keep track of which thread should actually be working, else the
 * vars on the main thread might go out of scope before the GUI thread starts.
 * This is the only explaination I can think of for the random errors I was
 * experiencing.
 *
 * Cause JS.
 *
 * False = main thread.
 * True = GUI thread.
 */
let atomicWhoseJob = new java.util.concurrent.atomic.AtomicBoolean(false);

let keyQueueAccess = new java.util.concurrent.Semaphore(1);
let keyQueue = [];

let buyables = [
    {"upgrade": true, "owned": false, "available": true, "text": "E\nF\nG\nH", "cost": 20, "title": "Flimsy Keyboard", "effects": []},
    {"upgrade": true, "owned": false, "available": true, "text": "A\nB\nC\nD", "cost": 50, "title": "Faster CPU", "effects": []},
    {"upgrade": false, "owned": false, "available": true, "text": "c\nd\ne\nf", "cost": 500, "title": "Monkey", "effects": []},
];

function MarginlessGrid(i) {
    return new GridLayout(i)
        .setTopMarginSize(0)
        .setBottomMarginSize(0)
        .setRightMarginSize(0)
        .setLeftMarginSize(0);
}

try {
    /*
     * Terminal Setup
     */
    {
        let termFactory = new DefaultTerminalFactory();
        screen = termFactory.createScreen();
    }
    screen.startScreen();
    screen.setCursorPosition(null);

    textGUI = new MultiWindowTextGUI(new SeparateTextGUIThread.Factory(), screen);
    textGUI.getGUIThread().start();

    textGUI.addListener({
        "onUnhandledKeyStroke": function (tg, key) {
            if (key != null) {
                keyQueueAccess.acquire();
                keyQueue[keyQueue.length] = key;
                keyQueueAccess.release();
            }

            return false;
        }
    });

    let pinWindow = new BasicWindow();
    pinWindow.setVisible(false);
    atomicWhoseJob.set(true);
    textGUI.getGUIThread().invokeLater({
        "run": function () {
		    while (!atomicWhoseJob.get()) {}
            textGUI.addWindow(pinWindow);
            atomicWhoseJob.set(false);
        }
    });
	while (atomicWhoseJob.get()) {}

    let splashActive = true;
    let splashWin = new BasicWindow("Buy");
    splashWin.setHints([WHint.EXPANDED]);
    let splashPanel = new Panel(MarginlessGrid(1));

    let splashLabel = new Label("hiii! SPlash screen here.");
    splashLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, true, 1, 1));
    splashPanel.addComponent(splashLabel);

    let splashButton = new Button("Close", {"run": function () {splashWin.close(); splashActive = false;}});
    splashButton.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
    splashPanel.addComponent(splashButton);

    splashWin.setComponent(splashPanel);
    atomicWhoseJob.set(true);
    textGUI.getGUIThread().invokeLater({
        "run": function () {
            while (!atomicWhoseJob.get()) {}
            textGUI.addWindow(splashWin);
            atomicWhoseJob.set(false);
        }
    });
    while (atomicWhoseJob.get()) {}

    let shopWin = new BasicWindow("Shop");
    activeWindowAccess.acquire();
    activeWindow = shopWin;
    activeWindowAccess.release();
    shopWin.setHints([WHint.FIXED_POSITION, WHint.FIXED_SIZE]);
    let wSize = textGUI.getScreen().getTerminalSize();
    shopWin.setPosition(new TerminalPosition(wSize.getColumns() - 5 - constants.WINDOW_WIDTH, 1));
    shopWin.setSize(new TerminalSize(constants.WINDOW_WIDTH, wSize.getRows() - 5));

    let shopPanel = new Panel(MarginlessGrid(3));

    // If we don't have a textbox at the top, things break :/
    shopPanel.addComponent(
        new TextBox(new TerminalSize(200, 4), "Welcome to Window Clicker TM (C) (R)\nStart by pressing tab, then wait for\nwindows to start poping up\n", TextBox.Style.MULTI_LINE)
            .setReadOnly(true)
            .setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER, true, false, 3, 1))
    );

    let sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    moneyAccess.acquire();
    let mLabel = new Label("Money - " + money + "W");
    moneyAccess.release();
    mLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(mLabel);

    sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    let uLabel = new Label("Upgrades");
    uLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(uLabel);

    sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    var uPanel = new ActionListBox();
    uPanel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, true, 3, 1));
    shopPanel.addComponent(uPanel);

    sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    let pLabel = new Label("Buy");
    pLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(pLabel);

    sep = new Separator(Direction.HORIZONTAL);
    sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.CENTER));
    shopPanel.addComponent(sep);

    var pPanel = new ActionListBox();
    pPanel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, true, 3, 1));
    shopPanel.addComponent(pPanel);

    shopWin.setComponent(shopPanel);

    objsAccess.acquire();
    for (let i = 0; i < buyables.length; ++i) {
        objs[i] = {
            "run": function () {
                actionAccess.acquire();
                // There is no good way to figure out which upgrade # issues
                // the command, as JS doesn't work to well with Java async
                // stuff. We make a guess based on what's focused.
                if (uPanel.isFocused()) {
                    action = {"u": true, "i": uPanel.getSelectedIndex()};
                } else if (pPanel.isFocused()) {
                    action = {"u": false, "i": pPanel.getSelectedIndex()};
                }
                actionAccess.release();
            }
        };
    }
    objsAccess.release();

    activeWindowAccess.acquire();
    activeWindow = shopWin;
    activeWindowAccess.release();
    atomicWhoseJob.set(true);
    textGUI.getGUIThread().invokeLater({
        "run": function () {
		    while (!atomicWhoseJob.get()) {}
            textGUI.addWindow(shopWin);
            textGUI.setActiveWindow(splashWin);
            atomicWhoseJob.set(false);
        }
    });
	while (atomicWhoseJob.get()) {}

    let lastTime = java.lang.System.currentTimeMillis();
    let lastMade = pinWindow;
    while (true) {
        let curTime = java.lang.System.currentTimeMillis();
        let dTime = curTime - lastTime;

        let nAdWin;
        if (dTime > 1000) {
            nAdWin = new BasicWindow("Add");
            let toCloseLetter = String.fromCharCode(97 + random.nextInt(26));
            let nAdWinLabel = new Label("Hello man.\nadsggf\nsddddddddddddddddddddddddddf\n.dsdsd\nPress '" + toCloseLetter + "' to close.");
            nAdWin.setComponent(nAdWinLabel);

            ads[ads.length] = {
                "win": nAdWin,
                "letter": toCloseLetter
            };
        }

        atomicWhoseJob.set(true);
        textGUI.getGUIThread().invokeLater({
            "run": function () {
		        while (!atomicWhoseJob.get()) {}
                if (dTime > 1000) {
                    textGUI.setActiveWindow(lastMade);
                    textGUI.addWindow(nAdWin);
                    activeWindowAccess.acquire();
                    if (splashActive) {
                        textGUI.setActiveWindow(splashWin);
                    } else {
                        textGUI.setActiveWindow(activeWindow);
                    }
                    activeWindowAccess.release();
                    lastMade = nAdWin;
                    lastTime = curTime;
                }

                let nwSize = textGUI.getScreen().getTerminalSize();
                if (
                    nwSize.getRows() != wSize.getRows()
                    || nwSize.getColumns() != wSize.getColumns()
                ) {
                    wSize = nwSize;
                    shopWin.setPosition(new TerminalPosition(wSize.getColumns() - 5 - constants.WINDOW_WIDTH, 1));
                    shopWin.setSize(new TerminalSize(constants.WINDOW_WIDTH, wSize.getRows() - 5));
                    textGUI.updateScreen();
                }
                atomicWhoseJob.set(false);
            }
        });
        keyQueueAccess.acquire();
        let keys = keyQueue;
        keyQueue = [];
        keyQueueAccess.release();

		while (atomicWhoseJob.get()) {}

        for (let i = 0; i < keys.length; ++i) {
            for (let j = 0; j < ads.length; ++j) {
                if (keys[i].getCharacter() != null
                    && ads[j].letter.charCodeAt() == keys[i].getCharacter().charValue()) {

                    atomicWhoseJob.set(true);
                    textGUI.getGUIThread().invokeLater({
                        "run": function () {
                            while (!atomicWhoseJob.get()) {}
                            ads[j].win.close();
                            atomicWhoseJob.set(false);
                        }
                    });
		            while (atomicWhoseJob.get()) {}

                    ads.splice(j, 1);

                    if (ads.length > 0) {
                        lastMade = ads[ads.length - 1].win;
                    } else {
                        lastMade = pinWindow;
                    }
                    moneyAccess.acquire();
                    ++money;
                    moneyAccess.release();
                    break;
                }
            }
        }

        atomicWhoseJob.set(true);
        textGUI.getGUIThread().invokeLater({
            "run": function () {
                while (!atomicWhoseJob.get()) {}
                moneyAccess.acquire();
                mLabel.setText("Money - " + money + "W");
                moneyAccess.release();

                let uI = uPanel.getSelectedIndex();
                let pI = pPanel.getSelectedIndex();
                uPanel.clearItems();
                pPanel.clearItems();
                objsAccess.acquire();
                for (let i = 0; i < buyables.length; ++i) {
                    if (buyables[i].available && !buyables[i].owned) {
                        let panel = buyables[i].upgrade ? uPanel : pPanel;
                        objs[i].c = panel.getItemCount();
                        panel.addItem(buyables[i].title + " - " + buyables[i].cost + "W", objs[i]);
                    }
                }
                objsAccess.release();
                uPanel.setSelectedIndex(Math.min(uI, uPanel.getItemCount()));
                pPanel.setSelectedIndex(Math.min(pI, pPanel.getItemCount()));

                atomicWhoseJob.set(false);
            }
        });
        while (atomicWhoseJob.get()) {}

        actionAccess.acquire();
        if (action != null) {
            atomicWhoseJob.set(true);
            textGUI.getGUIThread().invokeLater({
                "run": function () {
                    while (!atomicWhoseJob.get()) {}
                    activeWindowAccess.acquire();
                    if (activeWindow != shopWin) {
                        activeWindow.close();
                    }
                    activeWindowAccess.release();
                    atomicWhoseJob.set(false);
                }
            });
            while (atomicWhoseJob.get()) {}

            let winPanel = new Panel(MarginlessGrid(2));

            let panel = action.u ? uPanel : pPanel;
            let nBuyWin = new BasicWindow("Buy");
            nBuyWin.setHints([WHint.EXPANDED]);

            let i;
            objsAccess.acquire();
            for (i = 0; i < objs.length && (objs[i].c != action.i || buyables[i].upgrade != action.u); ++i) {};
            objsAccess.release();
            activeAction = action;
            activeAction.i2 = i;

            let nBuyWinLabel = new Label(buyables[i].text);

            nBuyWinLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, true, 2, 1));
            winPanel.addComponent(nBuyWinLabel);

            let buttonClose = new Button("Close", {"run": function () {
                activeWindowAccess.acquire();
                activeWindow.close();
                activeWindow = shopWin;
                activeWindowAccess.release();
            }});
            buttonClose.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(buttonClose);
            activeActionBuy = new Button("Buy", {"run": function () {
                buyables[activeAction.i2].owned = true;
                moneyAccess.acquire();
                money -= buyables[activeAction.i2].cost;
                moneyAccess.release();
                objsAccess.acquire();
                objs[activeAction.i2].c = null;
                objsAccess.release();

                activeWindowAccess.acquire();
                activeWindow.close();
                activeWindow = shopWin;
                activeWindowAccess.release();
            }});
            activeActionBuy.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(activeActionBuy);

            nBuyWin.setComponent(winPanel);
            activeWindowAccess.acquire();
            activeWindow = nBuyWin;
            activeWindowAccess.release();
            action = null;

            atomicWhoseJob.set(true);
            textGUI.getGUIThread().invokeLater({
                "run": function () {
                    while (!atomicWhoseJob.get()) {}
                    textGUI.setActiveWindow(lastMade);
                    textGUI.addWindow(nBuyWin);
                    atomicWhoseJob.set(false);
                }
            });
            while (atomicWhoseJob.get()) {}
        }
        actionAccess.release();

        atomicWhoseJob.set(true);
        textGUI.getGUIThread().invokeLater({
            "run": function () {
                while (!atomicWhoseJob.get()) {}
                if (activeWindow != shopWin) {
                    if (money < buyables[activeAction.i2].cost) {
                        activeActionBuy.setEnabled(false);
                        activeActionBuy.setLabel("Buy (Can't afford)");
                    } else {
                        activeActionBuy.setEnabled(true);
                        activeActionBuy.setLabel("Buy");
                    }
                }
                atomicWhoseJob.set(false);
            }
        });
        while (atomicWhoseJob.get()) {}
    }

    /*
     * Cleanup
     */
    textGUI.getGUIThread().waitForStop();
    screen.stopScreen();
} catch (err) {
    screen.stopScreen();
    Thread.sleep(200);
    stdout.printf("\nFATAL ERROR: %s\n", err.toString());
    stdout.flush();
}
