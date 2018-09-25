#!/bin/sh
APPDIR=$(dirname "$0")
cd "$APPDIR"
#java -jar js.jar -f "myprogram.js" -opt -1
java -cp js.jar:lanterna-3.0.1.jar org.mozilla.javascript.tools.shell.Main -f "myprogram.js" -opt -1
$SHELL
