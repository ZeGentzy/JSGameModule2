#!/bin/sh
APPDIR=$(dirname "$0")
cd "$APPDIR"
java  -Djava.library.path="$APPDIR" -cp "$APPDIR/js.jar:$APPDIR/lanterna-3.0.1.jar" org.mozilla.javascript.tools.shell.Main -f "$APPDIR/myprogram.js" -opt -1
$SHELL
