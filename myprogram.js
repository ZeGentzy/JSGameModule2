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
// Come witness the slowest autocomplete,
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
// Any who, why do what you wanna go do?
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
// emanating a weird VBA vibe,
// in looking like what '08 would provide.
// If only I could say that it's aged well,
// but instead it makes my eyes hurt and swell.
//
// See them hum, my most beloved orioles,
// watch them dance, to the bright Borealis,
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
// Stand on the lines which only wax and wane.
// Wave 'round your hand, and practice the arcane.
// Come on! Proclaim eternal victory!
// Claim mastery, over the unwordly!
//
// Over the language which wobbles and rolls,
// whose weak foundation is cratered with holes,
// which on your sanity takes it's slow toll,
// as you suffer from the stories told.
//
// WHAT HAPPENED TO THE ROUGELIKE?
//
// It was slow, to no fault of my own. Simple things, like an A* across a 64x64
// tile map were taking 3-13 seconds. Map generation was taking ~23-25 seconds
// before optimization, and down to 1-2 after, ect, ect. The debugger multiplied
// the time taken by like a factor of three. Don't get me started about the
// debugger.
//
// How do I know it's to no fault of my own? For the shits and giggles, I, and
// some people on IRC took the time to write the exact same map gen algorithm
// in other langs, the results are in:
//  - Rhino Js with `-opt -1`: ~25 seconds
//  - Rhino Js with `-opt 9` + tons of optimizations: ~1-2 seconds
//  - C (or maybe it was C++, didn't ask): ~0.01 seconds*
//  - Rust: ~0.01 seconds
//
//  * Measured and written by "OrenAudeles", on IRC
//
//  Anyways, Dominis Temporis (the rougelike) has been replaced by
//  Window Clicker TM (C) (R). The idea for Window Clicker was originally
//  pitched by "OrenAudeles", inspired by  such ~borring~ fun games as Cookie
//  Clicker. It was put together (minus the art) by me in roughly three classes
//  and four nights. The schedule was tight, and so many hacks have been
//  put in place, especially in regards to the concurrency safety.
//
//  For completeness sake, the source code for Dominis Temporis can be found in
//  the file `myprogram2.js`. Despite being completely nonplayable and missing
//  major features, like actually being able to fight, it does implement
//  most of the parts described in the diagram submitted. Of course,
//  the "AI Decision Game Logic" part was barely started, and the "Low Level
//  Game Logic" never got a good portion of the features it was supposed to
//  encapsulate, but oh well.
//
//  I must also thank the jQuery devs, for open sourcing jQuery, whom which I've
//  shamelessly borrowed from their `Extend` function, after minor modification.
//  I don't think it's actually used *here*, as this project is pretty simple,
//  really. However, it was extensively used in Dominis Temporis.
//
//  Anyways, I've written I nice poem, which I'm sure you've seen above,
//  describing just a small selection of the issues I experienced on this
//  project. I'm sure you derived at least one good laugh from it.
//
//  The ASCII art was at first made by downloading random pictures from the
//  internet then passing them through `www.text-image.com/convert/ascii.html`,
//  however, that made blobs that were too blurry. I then tried using line art,
//  but that also was too blury. In the end I had to manually scale down the
//  line art and colour in alot of the lines by hand, each image took roughly
//  10 to 20 minutes.
//
//  Had time allowed, I would've rigged up coloured art, alas, you'll have to
//  deal with B&W art.

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
let TerminalScreen = com.googlecode.lanterna.screen.TerminalScreen;
let DefaultTerminalFactory = com.googlecode.lanterna.terminal.DefaultTerminalFactory;
let WHint = com.googlecode.lanterna.gui2.Window.Hint;
let TerminalPosition = com.googlecode.lanterna.TerminalPosition;

stdout.printf("This game has been tested with resolutions of 80 by 24 and higher. Please set your terminal to 80 by 24 or higher.\n");
//Thread.sleep(2000);

function ASSERT(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

/*
 * Constants
 */
let constants = Object.freeze({
    "WINDOW_WIDTH": 40,

    "COST_MULTIPLIER": Math.pow(2, 0.2),
    "COST_MULTIPLIER_5": Math.pow(Math.pow(2, 0.2), 5),
    "COST_MULTIPLIER_10": Math.pow(Math.pow(2, 0.2), 10),
    "COST_MULTIPLIER_50": Math.pow(Math.pow(2, 0.2), 50),
    "COST_MULTIPLIER_100": Math.pow(Math.pow(2, 0.2), 100),

    "EFFECT_CLOSE_AD": 1,
    "EFFECT_ADD_AD": 2,
    "EFFECT_MULTIPLY_POINTS_FROM_ADS": 3,
    "EFFECT_INCREASE_USER_TYPED_ADS_CLOSED": 4,
    "EFFECT_INCREASE_USER_POINTS_PPS_PERCENTAGE": 5,
    "EFFECT_OTHER_EFFECT_MULTIPLIER": 6,
    "EFFECT_TIME_MULTIPLIER": 7,
    "EFFECT_INCREASE_USER_POINTS_ADS": 8,
    "EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED": 9,
    "EFFECT_OTHER_EFFECT_ADDER": 10,
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
let money = 0 + Math.pow(1000, 10);
let random = new Random();

let activeWindowAccess = new java.util.concurrent.Semaphore(1);
let activeWindow;

// Bad things happen if we don't put this out here.
let objsAccess = new java.util.concurrent.Semaphore(1);
let objs = [];

let actionAccess = new java.util.concurrent.Semaphore(1);
let action;
let activeAction;
let activeActionBuy = [];
let pinWindow;
let shopWin;

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

function ReadFileString(path) {
    return new java.lang.String(java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(path)));
}

let adStrings = [
    ReadFileString("ad1.txt"),
    ReadFileString("ad2.txt"),
    ReadFileString("ad3.txt"),
    ReadFileString("ad4.txt"),
    ReadFileString("ad5.txt"),
    ReadFileString("ad6.txt")
];

let adStringsSmall = [
    ReadFileString("adsmall1.txt"),
    ReadFileString("adsmall2.txt"),
    ReadFileString("adsmall3.txt"),
    ReadFileString("adsmall4.txt"),
    ReadFileString("adsmall5.txt"),
    ReadFileString("adsmall6.txt")
];

function RandomAd() {
    return adStrings[random.nextInt(adStrings.length)];
}

function RandomAdSmall() {
    return adStringsSmall[random.nextInt(adStringsSmall.length)];
}

let buyables;

function ForNonGet(id, get) {
    let count = 0;
    for (let i = 0; i < buyables.length; ++i) {
        if (buyables[i].id != id && !buyables[i].upgrade) {
            count += buyables[i].count;
        }
    }

    return get * count;
}

function ForGet(id, get) {
    let count = 0;
    for (let i = 0; i < buyables.length; ++i) {
        if (buyables[i].id == id && !buyables[i].upgrade) {
            count += buyables[i].count;
        }
    }

    return get * count;
}

buyables = [
    // CC only has clickers, we got both clickers and summoners
    // That's twice the things to build, so we run the game at twice the speed
    //
    // Since windows are hard to close, they give multiple points in the start
    //
    // And then we double speed again because I want the demo to be easy to play.
    {"id":   1, "upgrade": true, "owned": true,     "available": true, "text": "Debug only",                                                            "mins": [],                             "cost": 0,                                  "title": "Debug",               "effects": [{"intensity": function() { return 2 * 2; },                 "effect": constants.EFFECT_TIME_MULTIPLIER}, {"intensity": function () { return 1.75; }, "effect": constants.EFFECT_INCREASE_USER_POINTS_ADS}]},

    // Clickers
    {"id":   2, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("finger.txt"),                                           "mins": [],                             "cost": 15,                                 "title": "Finger",              "effects": [{"intensity": function() { return 0.1; },                   "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   3, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("monkey.txt"),                                           "mins": [],                             "cost": 100,                                "title": "Monkey",              "effects": [{"intensity": function() { return 1; },                     "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   4, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("farm.txt"),                                             "mins": [],                             "cost": 1100,                               "title": "Click Farm",          "effects": [{"intensity": function() { return 8; },                     "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   5, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("mine.txt"),                                             "mins": [],                             "cost": 12000,                              "title": "Click Mine",          "effects": [{"intensity": function() { return 47; },                    "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   6, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("factory.txt"),                                          "mins": [],                             "cost": 130000,                             "title": "Click Factory",       "effects": [{"intensity": function() { return 260; },                   "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   7, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("bank.txt"),                                             "mins": [],                             "cost": 1400000,                            "title": "Bank",                "effects": [{"intensity": function() { return 1400; },                  "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   8, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("temple.txt"),                                           "mins": [],                             "cost": 20000000,                           "title": "Temple",              "effects": [{"intensity": function() { return 7800; },                  "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":   9, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("tower.txt"),                                            "mins": [],                             "cost": 330000000,                          "title": "Wizard Tower",        "effects": [{"intensity": function() { return 44000; },                 "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  10, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("rocket.txt"),                                           "mins": [],                             "cost": 5100000000,                         "title": "Rocket",              "effects": [{"intensity": function() { return 260000; },                "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  11, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("lab.txt"),                                              "mins": [],                             "cost": 75000000000,                        "title": "Alchemy Lab",         "effects": [{"intensity": function() { return 1600000; },               "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  12, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("portal.txt"),                                           "mins": [],                             "cost": 1000000000000,                      "title": "Portal",              "effects": [{"intensity": function() { return 10000000; },              "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  13, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("machine.txt"),                                          "mins": [],                             "cost": 14000000000000,                     "title": "Time Machine",        "effects": [{"intensity": function() { return 65000000; },              "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  14, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("prism.txt"),                                            "mins": [],                             "cost": 2100000000000000,                   "title": "Prism",               "effects": [{"intensity": function() { return 2900000000; },            "effect": constants.EFFECT_CLOSE_AD}]},
    {"id":  15, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("chancemaker.txt"),                                      "mins": [],                             "cost": 26000000000000000,                  "title": "Chancemaker",         "effects": [{"intensity": function() { return 21000000000; },           "effect": constants.EFFECT_CLOSE_AD}]},

    // Makers
    {"id":  16, "upgrade": false, "count": 0,       "available": false, "text": "Press every ad you see.\n",                                            "mins": [],                             "cost": 15,                                 "title": "Odd Ads",             "effects": [{"intensity": function() { return 0.1; },                   "effect": constants.EFFECT_ADD_AD}]},
    {"id":  17, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("website.txt"),                                          "mins": [],                             "cost": 100,                                "title": "Shady Website",       "effects": [{"intensity": function() { return 1; },                     "effect": constants.EFFECT_ADD_AD}]},
    {"id":  18, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("tor.txt"),                                              "mins": [],                             "cost": 1100,                               "title": "TOR Service",         "effects": [{"intensity": function() { return 8; },                     "effect": constants.EFFECT_ADD_AD}]},
    {"id":  19, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("honeypot.txt"),                                         "mins": [],                             "cost": 12000,                              "title": "Honey Pot",           "effects": [{"intensity": function() { return 47; },                    "effect": constants.EFFECT_ADD_AD}]},
    {"id":  20, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("facebook.txt"),                                         "mins": [],                             "cost": 130000,                             "title": "Facebook Scams",      "effects": [{"intensity": function() { return 260; },                   "effect": constants.EFFECT_ADD_AD}]},
    {"id":  21, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("grandma.txt"),                                          "mins": [],                             "cost": 1400000,                            "title": "Grandmas",            "effects": [{"intensity": function() { return 1400; },                  "effect": constants.EFFECT_ADD_AD}]},
    {"id":  22, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("password.txt"),                                         "mins": [],                             "cost": 20000000,                           "title": "Weak Passwords",      "effects": [{"intensity": function() { return 7800; },                  "effect": constants.EFFECT_ADD_AD}]},
    {"id":  23, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("usb.txt"),                                              "mins": [],                             "cost": 330000000,                          "title": "Random USBs",         "effects": [{"intensity": function() { return 44000; },                 "effect": constants.EFFECT_ADD_AD}]},
    {"id":  24, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("mitm.txt"),                                             "mins": [],                             "cost": 5100000000,                         "title": "MITM Attacks",        "effects": [{"intensity": function() { return 260000; },                "effect": constants.EFFECT_ADD_AD}]},
    {"id":  25, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("magic.txt"),                                            "mins": [],                             "cost": 75000000000,                        "title": "Magic",               "effects": [{"intensity": function() { return 1600000; },               "effect": constants.EFFECT_ADD_AD}]},
    {"id":  26, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("cpu.txt"),                                              "mins": [],                             "cost": 1000000000000,                      "title": "Hardware Bugs",       "effects": [{"intensity": function() { return 10000000; },              "effect": constants.EFFECT_ADD_AD}]},
    {"id":  27, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("debian.txt"),                                           "mins": [],                             "cost": 14000000000000,                     "title": "Debian Maintainers",  "effects": [{"intensity": function() { return 65000000; },              "effect": constants.EFFECT_ADD_AD}]},
    {"id":  28, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("russia.txt"),                                           "mins": [],                             "cost": 2100000000000000,                   "title": "Foriegn Goverments",  "effects": [{"intensity": function() { return 2900000000; },            "effect": constants.EFFECT_ADD_AD}]},
    {"id":  29, "upgrade": false, "count": 0,       "available": false, "text": ReadFileString("enduser.txt"),                                          "mins": [],                             "cost": 26000000000000000,                  "title": "End Users",           "effects": [{"intensity": function() { return 21000000000; },           "effect": constants.EFFECT_ADD_AD}]},

    // Finger/Odd Ads double upgrades
    {"id":  30, "upgrade": true, "owned": false,    "available": false, "text": "Make fingers twice as effective\n",                                    "mins": [{"who":   2, "min":   1}],     "cost": 100,                                "title": "Reinforced finger",   "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  31, "upgrade": true, "owned": false,    "available": false, "text": "Make fingers twice as effective\n",                                    "mins": [{"who":   2, "min":   1}],     "cost": 500,                                "title": "Lubricated finger",   "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  32, "upgrade": true, "owned": false,    "available": false, "text": "Make fingers twice as effective\n",                                    "mins": [{"who":   2, "min":  10}],     "cost": 10000,                              "title": "Ambidextrous",        "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  33, "upgrade": true, "owned": false,    "available": false, "text": "Make ad generation twice as effective\n",                              "mins": [{"who":  16, "min":   1}],     "cost": 100,                                "title": "Plastic ads",         "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},         {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 16, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  34, "upgrade": true, "owned": false,    "available": false, "text": "Make ad generation twice as effective\n",                              "mins": [{"who":  16, "min":   1}],     "cost": 500,                                "title": "Golden ads",          "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},         {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 16, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  35, "upgrade": true, "owned": false,    "available": false, "text": "Make ad generation twice as effective\n",                              "mins": [{"who":  16, "min":  10}],     "cost": 10000,                              "title": "Titanium ads",        "effects": [{"intensity": function () { return 2; },                    "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},         {"intensity": function () { return 2; },                          "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 16, "oeffect": constants.EFFECT_ADD_AD}]},

    // Finger Other Buildings
    {"id":  36, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min":  25}],     "cost": 100000,                             "title": "Thousand finger",     "effects": [{"intensity": function () { return 1 + ForNonGet(2,     0.1); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,     0.1); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  37, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min":  50}],     "cost": 10000000,                           "title": "Million finger",      "effects": [{"intensity": function () { return 1 + ForNonGet(2,     0.5); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,     0.5); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  38, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 100}],     "cost": 100000000,                          "title": "Billion finger",      "effects": [{"intensity": function () { return 1 + ForNonGet(2,       5); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,       5); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  39, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 150}],     "cost": 1000000000,                         "title": "Trillion finger",     "effects": [{"intensity": function () { return 1 + ForNonGet(2,      50); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,      50); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  40, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 200}],     "cost": 10000000000,                        "title": "Quadrillion finger",  "effects": [{"intensity": function () { return 1 + ForNonGet(2,     500); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,     500); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  41, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 250}],     "cost": 10000000000000,                     "title": "Quintillion finger",  "effects": [{"intensity": function () { return 1 + ForNonGet(2,    5000); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,    5000); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  42, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 300}],     "cost": 10000000000000000,                  "title": "Sextillion finger",   "effects": [{"intensity": function () { return 1 + ForNonGet(2,   50000); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,   50000); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  43, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 350}],     "cost": 10000000000000000000,               "title": "Septillion finger",   "effects": [{"intensity": function () { return 1 + ForNonGet(2,  500000); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2,  500000); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  44, "upgrade": true, "owned": false,    "available": false, "text": "Fingers are slightly more effective per other construction.\n",        "mins": [{"who":   2, "min": 400}],     "cost": 10000000000000000000000,            "title": "Octillion finger",    "effects": [{"intensity": function () { return 1 + ForNonGet(2, 5000000); },    "effect": constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED},   {"intensity": function () { return ForNonGet(2, 5000000); },  "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 2, "oeffect": constants.EFFECT_CLOSE_AD}]},

    // Odd Other Buildings
    {"id":  45, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min":  25}],     "cost": 100000,                             "title": "Thousand ads",        "effects": [{"intensity": function () { return 1 + ForNonGet(16,     0.1); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,     0.1); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  46, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min":  50}],     "cost": 10000000,                           "title": "Million ads",         "effects": [{"intensity": function () { return 1 + ForNonGet(16,     0.5); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,     0.5); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  47, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 100}],     "cost": 100000000,                          "title": "Billion ads",         "effects": [{"intensity": function () { return 1 + ForNonGet(16,       5); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,       5); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  48, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 150}],     "cost": 1000000000,                         "title": "Trillion ads",        "effects": [{"intensity": function () { return 1 + ForNonGet(16,      50); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,      50); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  49, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 200}],     "cost": 10000000000,                        "title": "Quadrillion ads",     "effects": [{"intensity": function () { return 1 + ForNonGet(16,     500); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,     500); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  50, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 250}],     "cost": 10000000000000,                     "title": "Quintillion ads",     "effects": [{"intensity": function () { return 1 + ForNonGet(16,    5000); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,    5000); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  51, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 300}],     "cost": 10000000000000000,                  "title": "Sextillion ads",      "effects": [{"intensity": function () { return 1 + ForNonGet(16,   50000); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,   50000); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  52, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 350}],     "cost": 10000000000000000000,               "title": "Septillion ads",      "effects": [{"intensity": function () { return 1 + ForNonGet(16,  500000); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16,  500000); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  53, "upgrade": true, "owned": false,    "available": false, "text": "Ad generation is slightly more effective per other construction.\n",   "mins": [{"who":  16, "min": 400}],     "cost": 10000000000000000000000,            "title": "Octillion ads",       "effects": [{"intensity": function () { return 1 + ForNonGet(16, 5000000); },   "effect": constants.EFFECT_MULTIPLY_POINTS_FROM_ADS},   {"intensity": function () { return ForNonGet(16, 5000000); }, "effect": constants.EFFECT_OTHER_EFFECT_ADDER, "who": 16, "oeffect": constants.EFFECT_CLOSE_AD}]},

    // Monkey double upgrades
    {"id":  54, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min":   1}],     "cost": 1000,                               "title": "Steriods Distrib.",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  55, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min":   5}],     "cost": 5000,                               "title": "Wool mittens",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  56, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min":  25}],     "cost": 50000,                              "title": "Good manners",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  57, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min":  50}],     "cost": 5000000,                            "title": "Air Conditioning",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  58, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 100}],     "cost": 500000000,                          "title": "Basic Insurance",     "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  59, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 150}],     "cost": 50000000000,                        "title": "Pensions",            "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  60, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 200}],     "cost": 50000000000000,                     "title": "Healthcare",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  61, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 250}],     "cost": 50000000000000000,                  "title": "Personal Mansions",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  62, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 300}],     "cost": 50000000000000000000,               "title": "Reverse Dementia",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  63, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 350}],     "cost": 50000000000000000000000,            "title": "Anti Aging Creams",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  64, "upgrade": true, "owned": false,    "available": false, "text": "Make your monkies twice as effective\n",                               "mins": [{"who":   3, "min": 400}],     "cost": 500000000000000000000000000,        "title": "Lubricated seats",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 3, "oeffect": constants.EFFECT_CLOSE_AD}]},

    // Websites double upgrades
    {"id":  64, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min":   1}],     "cost": 1000,                               "title": "Faster browser",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  65, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min":   5}],     "cost": 5000,                               "title": "Unsecure browser",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  66, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min":  25}],     "cost": 50000,                              "title": "Enable flash",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  67, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min":  50}],     "cost": 5000000,                            "title": "Click everywhere",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  68, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 100}],     "cost": 500000000,                          "title": "Listen to Reddit",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  69, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 150}],     "cost": 50000000000,                        "title": "Become a Hermit",     "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  70, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 200}],     "cost": 50000000000000,                     "title": "Dedicated servers",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  71, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 250}],     "cost": 50000000000000000,                  "title": "Xtreme websufing",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  72, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 300}],     "cost": 50000000000000000000,               "title": "Timeproof monitors",  "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  73, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 350}],     "cost": 50000000000000000000000,            "title": "Deal with the devil", "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  74, "upgrade": true, "owned": false,    "available": false, "text": "Open twice as many shaddy websites\n",                                 "mins": [{"who":  17, "min": 400}],     "cost": 500000000000000000000000000,        "title": "The Unbridling",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 17, "oeffect": constants.EFFECT_ADD_AD}]},

    // Farms double upgrades
    {"id":  75, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min":   1}],     "cost": 11000,                              "title": "Cheap hoes",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  76, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min":   5}],     "cost": 55000,                              "title": "Fertilizer",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  77, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min":  25}],     "cost": 550000,                             "title": "Pesticides",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  78, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min":  50}],     "cost": 55000000,                           "title": "GMOs",                "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  79, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 100}],     "cost": 5500000000,                         "title": "Scarecrows",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  80, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 150}],     "cost": 550000000000,                       "title": "Sprinklers",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  81, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 200}],     "cost": 550000000000000,                    "title": "Fungus Cream",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  82, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 250}],     "cost": 550000000000000000,                 "title": "Triffids",            "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  83, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 300}],     "cost": 550000000000000000000,              "title": "Humane Pesticides",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  84, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 350}],     "cost": 550000000000000000000000,           "title": "Barnstars",           "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  85, "upgrade": true, "owned": false,    "available": false, "text": "Make your farms twice as effective\n",                                 "mins": [{"who":   4, "min": 400}],     "cost": 5500000000000000000000000,          "title": "Lindworms",           "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 4, "oeffect": constants.EFFECT_CLOSE_AD}]},

    // Tor double upgrades
    {"id":  86, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min":   1}],     "cost": 11000,                              "title": "Cheap servers",       "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  87, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min":   5}],     "cost": 55000,                              "title": "Faster internet",     "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  88, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min":  25}],     "cost": 550000,                             "title": "More funding",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  89, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min":  50}],     "cost": 55000000,                           "title": "Better encryption",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  90, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 100}],     "cost": 5500000000,                         "title": "Advanced Research",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  91, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 150}],     "cost": 550000000000,                       "title": "Faster speeds",       "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  92, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 200}],     "cost": 550000000000000,                    "title": "Rewrite it in Rust",  "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  93, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 250}],     "cost": 550000000000000000,                 "title": "Profiling",           "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  94, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 300}],     "cost": 550000000000000000000,              "title": "Govt. Sponserships",  "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  95, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 350}],     "cost": 550000000000000000000000,           "title": "Armed Triffids",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id":  96, "upgrade": true, "owned": false,    "available": false, "text": "Make tor twice as effective\n",                                        "mins": [{"who":  18, "min": 400}],     "cost": 5500000000000000000000000,          "title": "More users",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 18, "oeffect": constants.EFFECT_ADD_AD}]},

    // Mines double upgrades
    {"id":  97, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min":   1}],     "cost": 120000,                              "title": "Ad gas",             "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  98, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min":   5}],     "cost": 600000,                              "title": "Megadrill",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id":  99, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min":  25}],     "cost": 6000000,                             "title": "Ultradrill",         "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 100, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min":  50}],     "cost": 600000000,                           "title": "Ultimadrill",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 101, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 100}],     "cost": 60000000000,                         "title": "H-bomb mining",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 102, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 150}],     "cost": 6000000000000,                       "title": "Coreforge",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 103, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 200}],     "cost": 6000000000000000,                    "title": "Planetsplitters",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 104, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 250}],     "cost": 6000000000000000000,                 "title": "Ad oil wells",       "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 105, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 300}],     "cost": 6000000000000000000000,              "title": "Mole people",        "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 106, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 350}],     "cost": 6000000000000000000000000,           "title": "Mine canaries",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},
    {"id": 107, "upgrade": true, "owned": false,    "available": false, "text": "Make your mines twice as effective\n",                                 "mins": [{"who":   5, "min": 400}],     "cost": 60000000000000000000000000000,       "title": "Bore again",         "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 5, "oeffect": constants.EFFECT_CLOSE_AD}]},

    // Honeypot double upgrade
    {"id": 108, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min":   1}],     "cost": 120000,                              "title": "Sweatener",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 109, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min":   5}],     "cost": 600000,                              "title": "More sweatener",     "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 110, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min":  25}],     "cost": 6000000,                             "title": "Sprinkles",          "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 111, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min":  50}],     "cost": 600000000,                           "title": "Sugary cream",       "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 112, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 100}],     "cost": 60000000000,                         "title": "The good stuff",     "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 113, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 150}],     "cost": 6000000000000,                       "title": "Synthetic Honey",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 114, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 200}],     "cost": 6000000000000000,                    "title": "Robotic bees",       "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 115, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 250}],     "cost": 6000000000000000000,                 "title": "Extra tounges",      "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 116, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 300}],     "cost": 6000000000000000000000,              "title": "Anti-death sauce",   "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 117, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 350}],     "cost": 6000000000000000000000000,           "title": "Automated death",    "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},
    {"id": 118, "upgrade": true, "owned": false,    "available": false, "text": "Make your honeypots twice as effective\n",                             "mins": [{"who":  19, "min": 400}],     "cost": 60000000000000000000000000000,       "title": "Smores",             "effects": [{"intensity": function () { return 2; },                            "effect": constants.EFFECT_OTHER_EFFECT_MULTIPLIER, "who": 19, "oeffect": constants.EFFECT_ADD_AD}]},

    // Data entry is hard.
    // I'd need like four more days to get all this done. Consider this a demo.
    // TODO: Website/Monkey types upgrades
    // TODO: Ads upgrades
    // TODO: Rest of the double upgrades
];

function FindWithId(id) {
    for (let i = 0; i < buyables.length; ++i) {
        if (buyables[i].id == id) {
            return i;
        }
    }

    ASSERT(false);
}

function HasMetMins(i) {
    let cb = buyables[i];

    for (let j = 0; j < cb.mins.length; ++j) {
        let cm = cb.mins[j];

        let u = FindWithId(cm.who);
        if (buyables[u].upgrade) {
            if (!buyables[u].owned) {
                return false;
            }
        } else {
            if (buyables[u].count < cm.min) {
                return false;
            }
        }
    }

    return true;
}

function Shortenify(numb) {
    if (numb >= Math.pow(1000, 11)) {
        return (numb / Math.pow(1000, 11)).toFixed(2) + "D";
    } else if (numb >= Math.pow(1000, 10)) {
        return (numb / Math.pow(1000, 10)).toFixed(2) + "N";
    } else if (numb >= Math.pow(1000, 9)) {
        return (numb / Math.pow(1000, 9)).toFixed(2) + "O";
    } else if (numb >= Math.pow(1000, 8)) {
        return (numb / Math.pow(1000, 8)).toFixed(2) + "Y";
    } else if (numb >= Math.pow(1000, 7)) {
        return (numb / Math.pow(1000, 7)).toFixed(2) + "Z";
    } else if (numb >= Math.pow(1000, 6)) {
        return (numb / Math.pow(1000, 6)).toFixed(2) + "E";
    } else if (numb >= Math.pow(1000, 5)) {
        return (numb / Math.pow(1000, 5)).toFixed(2) + "P";
    } else if (numb >= Math.pow(1000, 4)) {
        return (numb / Math.pow(1000, 4)).toFixed(2) + "T";
    } else if (numb >= Math.pow(1000, 3)) {
        return (numb / Math.pow(1000, 3)).toFixed(2) + "G";
    } else if (numb >= Math.pow(1000, 2)) {
        return (numb / Math.pow(1000, 2)).toFixed(2) + "M";
    } else if (numb >= Math.pow(1000, 1)) {
        return (numb / Math.pow(1000, 1)).toFixed(2) + "K";
    } else {
        return "" + numb.toFixed(2) + "";
    }
}

function MarginlessGrid(i) {
    return new GridLayout(i)
            .setTopMarginSize(0)
            .setBottomMarginSize(0)
            .setRightMarginSize(0)
            .setLeftMarginSize(0);
}

/*
 * Terminal Setup
 */
let term;
{
    let termFactory = new DefaultTerminalFactory();
    termFactory.setForceAWTOverSwing(true);
    term = termFactory.createTerminal();
    screen = new TerminalScreen(term);
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

pinWindow = new BasicWindow();
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

function CostOf(cost, mul) {
    let costTotal = 0;
    let cCost = cost;
    for (let i = 0; i < mul; ++i) {
        costTotal += Math.floor(cCost);
        cCost *= constants.COST_MULTIPLIER;
    }

    return costTotal;
}

function MakeBuyButton(multiply) {
    let obj = {"m": multiply};
    obj.run = function () {
        moneyAccess.acquire();
        money -= CostOf(buyables[activeAction.i2].cost, obj.m);
        moneyAccess.release();
        if (buyables[activeAction.i2].upgrade) {
            buyables[activeAction.i2].owned = true;
        } else {
            buyables[activeAction.i2].count += obj.m;
            let mul;
            switch (obj.m) {
                case 1:
                    mul = constants.COST_MULTIPLIER;
                    break;
                case 5:
                    mul = constants.COST_MULTIPLIER_5;
                    break;
                case 10:
                    mul = constants.COST_MULTIPLIER_10;
                    break;
                case 50:
                    mul = constants.COST_MULTIPLIER_50;
                    break;
                case 100:
                    mul = constants.COST_MULTIPLIER_100;
                    break;
                default:
                    ASSERT(false, "Cost multiplier not supported.")
            }
            buyables[activeAction.i2].cost *= mul;
        }
        objsAccess.acquire();
        objs[activeAction.i2].c = null;
        objsAccess.release();

        activeWindowAccess.acquire();
        activeWindow.close();
        activeWindow = shopWin;
        activeWindowAccess.release();
    };

    return new Button("Buy " + multiply, obj);
}

function CloseAd(key, user, perClose) {
    for (let i = ads.length - 1; i >= 0; --i) {
        if (key == null || key.getCharacter() != null
                && ads[i].letter.charCodeAt() == key.getCharacter().charValue()) {

            atomicWhoseJob.set(true);
            textGUI.getGUIThread().invokeLater({
                "run": function () {
                    while (!atomicWhoseJob.get()) {}
                    ads[i].win.close();
                    atomicWhoseJob.set(false);
                }
            });
            while (atomicWhoseJob.get()) {}
            ads.splice(i, 1);

            if (ads.length > 0) {
                lastMade = ads[ads.length - 1].win;
            } else {
                lastMade = pinWindow;
            }
            moneyAccess.acquire();
            money += perClose;
            moneyAccess.release();
            break;
        }
    }
}

function EffectAdders(effect, id) {
    let ret = 0;

    for (let i = 0; i < buyables.length; ++i) {
        let effectiveness = buyables[i].upgrade
            ? (buyables[i].owned ? 1 : 0)
            : buyables[i].count;
        for (let j = 0; j < buyables[i].effects.length; ++j) {
            let ce = buyables[i].effects[j];
            if (
                ce.effect == constants.EFFECT_OTHER_EFFECT_ADDER
                && ce.oeffect == effect
                && (ce.who == null || ce.who == id)
            ) {
                ret += ce.intensity() * effectiveness;
            }
        }
    }

    return ret;
}

function EffectMultipliers(effect, id) {
    let ret = 1;

    for (let i = 0; i < buyables.length; ++i) {
        let effectiveness = buyables[i].upgrade
            ? (buyables[i].owned ? 1 : 0)
            : buyables[i].count;
        for (let j = 0; j < buyables[i].effects.length; ++j) {
            let ce = buyables[i].effects[j];
            if (
                ce.effect == constants.EFFECT_OTHER_EFFECT_MULTIPLIER
                && ce.oeffect == effect
                && (ce.who == null || ce.who == id)
            ) {
                ret *= Math.pow(ce.intensity(), effectiveness);
            }
        }
    }

    return ret;
}

function Effect(effect, addative) {
    let ret = addative ? 0 : 1;

    for (let i = 0; i < buyables.length; ++i) {
        let effectiveness = buyables[i].upgrade
            ? (buyables[i].owned ? 1 : 0)
            : buyables[i].count;
        let em = EffectMultipliers(effect, buyables[i].id);
        let ea = EffectAdders(effect, buyables[i].id);

        for (let j = 0; j < buyables[i].effects.length; ++j) {
            if (buyables[i].effects[j].effect == effect) {
                if (addative) {
                    ret += (buyables[i].effects[j].intensity() + ea) * effectiveness * em;
                } else {
                    ret *= Math.pow(buyables[i].effects[j].intensity() + ea, effectiveness * em);
                }
            }
        }
    }

    return ret;
}

function CalcOpenWindows(i) {
    let effectiveness = buyables[i].upgrade
        ? (buyables[i].owned ? 1 : 0)
        : buyables[i].count;
    let tc = 0;
    let em = EffectMultipliers(constants.EFFECT_ADD_AD, buyables[i].id);
    let ea = EffectAdders(constants.EFFECT_ADD_AD, buyables[i].id);

    for (let j = 0; j < buyables[i].effects.length; ++j) {
        if (buyables[i].effects[j].effect == constants.EFFECT_ADD_AD) {
            tc += (buyables[i].effects[j].intensity() + ea) * effectiveness * em;
        }
    }

    return tc;
}

function CalcCloseCost(i) {
    let effectiveness = buyables[i].upgrade
        ? (buyables[i].owned ? 1 : 0)
        : buyables[i].count;
    let tc = 0;
    let em = EffectMultipliers(constants.EFFECT_CLOSE_AD, buyables[i].id);
    let ea = EffectAdders(constants.EFFECT_CLOSE_AD, buyables[i].id);

    for (let j = 0; j < buyables[i].effects.length; ++j) {
        if (buyables[i].effects[j].effect == constants.EFFECT_CLOSE_AD) {
            tc += (buyables[i].effects[j].intensity() + ea) * effectiveness * em;
        }
    }

    return {"tc": tc, "pts": tc * EffectMultipliers(constants.EFFECT_MULTIPLY_POINTS_FROM_ADS, buyables[i].id)};
}

function CalcAvgAdCloseCost() {
    let ret = 0;
    let count = 0;

    for (let i = 0; i < buyables.length; ++i) {
        let cc = CalcCloseCost(i);
        count += cc.tc;
        ret += cc.pts;
    }

    return count != 0 ? ret / count : 0;
}

let splashActive = true;
let splashWin = new BasicWindow();
splashWin.setHints([WHint.EXPANDED]);
let splashPanel = new Panel(MarginlessGrid(1));

let splashLabel = new Label(ReadFileString("splash.txt"));
splashLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, true, 1, 1));
splashPanel.addComponent(splashLabel);

let splashButton = new Button("Close", {
    "run": function () {
        splashWin.close();
        splashActive = false;
    }
});
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

shopWin = new BasicWindow("Shop");
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
        .setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 3, 1))
);

let sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

moneyAccess.acquire();
let mLabel = new Label("Money - " + Shortenify(Math.floor(money)) + "W");
moneyAccess.release();
mLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(mLabel);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

let ppsLabel = new Label("PPS - " + "0");
ppsLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(ppsLabel);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

let uLabel = new Label("Upgrades");
uLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(uLabel);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

let uPanel = new ActionListBox(new TerminalSize(50, (wSize.getRows() - 13) / 3));
uPanel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, true, 3, 1));
shopPanel.addComponent(uPanel);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

let pLabel = new Label("Buy");
pLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.CENTER, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(pLabel);

sep = new Separator(Direction.HORIZONTAL);
sep.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, false, 1, 1));
shopPanel.addComponent(sep);

let pPanel = new ActionListBox(new TerminalSize(50, (wSize.getRows() - 13) * 2 / 3));
pPanel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.BEGINNING, true, true, 3, 1));
shopPanel.addComponent(pPanel);

shopWin.setComponent(shopPanel);

objsAccess.acquire();
for (let i = 0; i < buyables.length; ++i) {
    objs[i] = {};
    objs[i].u = buyables[i].upgrade;
    let obj = objs[i];
    objs[i] = function () {
        actionAccess.acquire();
        if (obj.u) {
            action = {"u": true, "i": uPanel.getSelectedIndex()};
        } else if (pPanel.isFocused()) {
            action = {"u": false, "i": pPanel.getSelectedIndex()};
        } else {
            ASSERT(false);
        }
        actionAccess.release();
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
let diffNewNumbAds = 0;
let diffmaxToRemove = 0;

while (true) {
    // I must put this loop's contents in a function for it's variables to be
    // visible in the debugger. Why? 'Cause JS.
    MainLoop();
}
function MainLoop() {
    let curTime = java.lang.System.currentTimeMillis();
    let mTime = Effect(constants.EFFECT_TIME_MULTIPLIER, false);
    let dTime = (curTime - lastTime) * mTime;
    lastTime = curTime;

    let naps = EffectMultipliers(constants.EFFECT_ADD_AD, null) + Effect(constants.EFFECT_ADD_AD, true);
    let raps = Effect(constants.EFFECT_CLOSE_AD, true);
    let newNumbAds = naps * dTime / 1000 + ads.length + diffNewNumbAds;
    let maxToRemove = raps * dTime / 1000 + diffmaxToRemove;

    diffNewNumbAds = newNumbAds - Math.floor(newNumbAds);
    diffmaxToRemove = maxToRemove - Math.floor(maxToRemove);

    let adsClosed = Math.min(
        Math.floor(newNumbAds),
        Math.floor(maxToRemove)
    );
    let perGameClose = CalcAvgAdCloseCost();
    let pps = Math.min(naps + ads.length, raps) * perGameClose * mTime;
    let perUserClick = Math.ceil(Effect(constants.EFFECT_INCREASE_USER_POINTS_ADS, true) + pps * Effect(constants.EFFECT_INCREASE_USER_POINTS_PPS_PERCENTAGE, false));

    let visualToClose = Math.max(adsClosed - Math.floor(newNumbAds) + ads.length, -Math.ceil(100 * dTime / 1000)); // neg means add
    if (ads.length - visualToClose > 100) {
        visualToClose = -(100 - ads.length);
    }

    atomicWhoseJob.set(true);
    textGUI.getGUIThread().invokeLater({
        "run": function () {
            while (!atomicWhoseJob.get()) {}
            // Why this? There is a multithreading bug somewhere which causes
            // the game to "hang". The game is of course perfectly functioning,
            // just that for some reason the active window is no longer active.
            //
            // I can't figure out why, what or where's causing this, so I think
            // you'll have to live with this little hack.
            activeWindowAccess.acquire();
            if (splashActive) {
                textGUI.setActiveWindow(splashWin);
            } else {
                textGUI.setActiveWindow(activeWindow);
            }
            activeWindowAccess.release();

            if (visualToClose < 0) {
                for (let i = 0; i < (0 - visualToClose); ++i) {
                    let nAdWin = new BasicWindow("Ad");
                    let toCloseLetter = String.fromCharCode(97 + random.nextInt(26));
                    let nAdWinLabel = new Label(RandomAdSmall() + "Press '" + toCloseLetter + "' to close.");
                    nAdWin.setComponent(nAdWinLabel);

                    ads[ads.length] = {
                        "win": nAdWin,
                        "letter": toCloseLetter
                    };
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
                }
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
    while (atomicWhoseJob.get()) {}

    keyQueueAccess.acquire();
    let keys = keyQueue;
    keyQueue = [];
    keyQueueAccess.release();

    let uT = (1 + Effect(constants.EFFECT_INCREASE_USER_TYPED_ADS_CLOSED, true)) * Effect(constants.EFFECT_MULTIPLY_USER_TYPED_ADS_CLOSED, false);
    for (let i = 0; i < keys.length; ++i) {
        for (let j = 0; j < uT; ++j) {
            CloseAd(keys[i], true, perUserClick);
        }
    }


    for (let i = 0; i < Math.max(0, visualToClose); ++i) {
        CloseAd(null, false, perGameClose);
    }

    moneyAccess.acquire();
    money += perGameClose * (adsClosed - Math.max(0, visualToClose));

    for (let i = 0; i < buyables.length; ++i) {
        if (Math.floor(buyables[i].cost * 0.5) <= Math.floor(money) && HasMetMins(i)) {
            buyables[i].available = true;
        }
    }
    moneyAccess.release();

    atomicWhoseJob.set(true);
    textGUI.getGUIThread().invokeLater({
        "run": function () {
            while (!atomicWhoseJob.get()) {}
            moneyAccess.acquire();
            mLabel.setText("Money - " + Shortenify(Math.floor(money)) + "W");
            ppsLabel.setText("PPS - " + Shortenify(pps));
            moneyAccess.release();

            let uI = uPanel.getSelectedIndex();
            let pI = pPanel.getSelectedIndex();
            uPanel.clearItems();
            pPanel.clearItems();
            objsAccess.acquire();
            for (let i = 0; i < buyables.length; ++i) {
                if (buyables[i].available && (buyables[i].upgrade && !buyables[i].owned || !buyables[i].upgrade)) {
                    let panel = buyables[i].upgrade ? uPanel : pPanel;
                    objs[i].c = panel.getItemCount();
                    let count = buyables[i].upgrade ? "" : (" (" + buyables[i].count + ")");
                    let cc = CalcCloseCost(i);
                    let ow = CalcOpenWindows(i);
                    panel.addItem(buyables[i].title + " - " + Shortenify(Math.floor(buyables[i].cost)) + "W" + count + " (" + Shortenify(cc.pts * mTime) + "/" + Shortenify(ow * mTime) + ")", objs[i]);
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
        nBuyWin.setHints([WHint.CENTERED]);

        let i;
        objsAccess.acquire();
        for (i = 0; i < objs.length && (objs[i].c != action.i || buyables[i].upgrade != action.u); ++i) {}

        objsAccess.release();
        activeAction = action;
        activeAction.i2 = i;

        let adText = buyables[i].id == 16 ? RandomAd() : "";
        let nBuyWinLabel = new Label(buyables[i].text + adText);

        nBuyWinLabel.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, true, 2, 1));
        winPanel.addComponent(nBuyWinLabel);

        let buttonClose = new Button("Close", {
            "run": function () {
                activeWindowAccess.acquire();
                activeWindow.close();
                activeWindow = shopWin;
                activeWindowAccess.release();
            }
        });
        buttonClose.setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
        winPanel.addComponent(buttonClose);

        activeActionBuy[1] = MakeBuyButton(1);
        activeActionBuy[1].setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
        winPanel.addComponent(activeActionBuy[1]);
        if (!action.u) {
            activeActionBuy[5] = MakeBuyButton(5);
            activeActionBuy[5].setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(activeActionBuy[5]);
            activeActionBuy[10] = MakeBuyButton(10);
            activeActionBuy[10].setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(activeActionBuy[10]);
            activeActionBuy[50] = MakeBuyButton(50);
            activeActionBuy[50].setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(activeActionBuy[50]);
            activeActionBuy[100] = MakeBuyButton(100);
            activeActionBuy[100].setLayoutData(GridLayout.createLayoutData(GridLayout.Alignment.FILL, GridLayout.Alignment.FILL, true, false, 1, 1));
            winPanel.addComponent(activeActionBuy[100]);
        }

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

            activeWindowAccess.acquire();
            if (activeWindow != shopWin) {
                moneyAccess.acquire();
                let is = activeAction.u ? [1] : [1, 5, 10, 50, 100];
                for (let i = 0; i < is.length; ++i) {
                    if (Math.floor(money) < CostOf(buyables[activeAction.i2].cost, is[i])) {
                        activeActionBuy[is[i]].setEnabled(false);
                        activeActionBuy[is[i]].setLabel("Buy " + is[i] + " (Can't afford)");
                    } else {
                        activeActionBuy[is[i]].setEnabled(true);
                        activeActionBuy[is[i]].setLabel("Buy " + is[i]);
                    }
                }
                moneyAccess.release();
            }
            atomicWhoseJob.set(false);
            activeWindowAccess.release();
        }
    });
    while (atomicWhoseJob.get()) {}
}

/*
 * Cleanup
 */
textGUI.getGUIThread().waitForStop();
screen.stopScreen();
