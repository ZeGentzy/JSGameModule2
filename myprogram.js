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
// Whose weak foundation is crattered with holes,
// Which on your sanity takes it's slow toll.
// As you suffer from the stories told.
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
//  Window Clicker (tm) (c) (r), an idea pitched by OrenAudeles, inspired by
//  such ~borring~ fun games as Cookie Clicker.

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

/*
 * Constants
 */
let constants = Object.freeze({
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

            let win = new BasicWindow("SHOP");
            win.setHints([WHint.MODAL, WHint.FIXED_POSITION]);
            win.setPosition(new TerminalPosition(0, 0));
    textGUI.getGUIThread().invokeLater({
        "run": function () {
            let contentPanel = new Panel(new GridLayout(2));
            let gridLayout = contentPanel.getLayoutManager();
            gridLayout.setHorizontalSpacing(3);

            win.setComponent(contentPanel);
            textGUI.addWindow(win);
        }
    });

    while (false) {
        textGUI.getGUIThread().invokeLater({
            "run": function () {
                let win = new BasicWindow("My Root Window");
                let contentPanel = new Panel(new GridLayout(2));
                let gridLayout = contentPanel.getLayoutManager();
                gridLayout.setHorizontalSpacing(3);

                let title = new Label("This is a label that spans two columns");
                title.setLayoutData(GridLayout.createLayoutData(
                    GridLayout.Alignment.BEGINNING,
                    GridLayout.Alignment.BEGINNING,
                    true,
                    false,
                    2,
                    1
                ));
                contentPanel.addComponent(title);

                contentPanel.addComponent(new Label("Text Box (aligned)"));
                contentPanel.addComponent(
                    new TextBox()
                        .setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.BEGINNING, GridLayout.Alignment.CENTER))
                );

                contentPanel.addComponent(new Label("Password Box (aligned)"));
                contentPanel.addComponent(
                    new TextBox()
                        .setMask(new Character('*'))
                        .setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.BEGINNING, GridLayout.Alignment.CENTER))
                );

                contentPanel.addComponent(new Label("Read-only Combo Box (filled)"));
                contentPanel.addComponent(
                    new ComboBox(["Hello,", "Bye."])
                        .setReadOnly(true)
                        .setPreferredSize(new TerminalSize(20, 1))
                        .setLayoutData(GridLayout.createHorizontallyFilledLayoutData(1))
                );

                contentPanel.addComponent(new Label("Editable Combo Box (filled)"));
                contentPanel.addComponent(
                    new ComboBox("Item #1", "Item #2", "Item #3", "Item #4")
                        .setReadOnly(false)
                        .setLayoutData(GridLayout.createHorizontallyFilledLayoutData(1))
                );

                contentPanel.addComponent(new Label("Button (centered)"));
                contentPanel.addComponent(
                    new Button("Button", {
                        "run": function () {
                            MessageDialog.showMessageDialog(textGUI, "MessageBox", "This is a message box", MessageDialogButton.OK);
                        },
                    })
                        .setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.CENTER))
                );

                contentPanel.addComponent(
                    new EmptySpace()
                        .setLayoutData(GridLayout.createHorizontallyFilledLayoutData(2))
                );
                contentPanel.addComponent(
                    new Separator(Direction.HORIZONTAL)
                        .setLayoutData(GridLayout.createHorizontallyFilledLayoutData(2))
                );
                contentPanel.addComponent(
                    new Button("Close", {
                        "run": function () {
                            win.close();
                        }
                    })
                        .setLayoutData(GridLayout.createHorizontallyEndAlignedLayoutData(2))
                );

                win.setComponent(contentPanel);
                textGUI.addWindow(win);
            }
        });
        Thread.sleep(500);
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
