#!/bin/sh
/home/werpu/gamepadservice/input_pipe --server=N --port=9002 --command="overlay /home/werpu/gamepadservice/coleco-overlay.json5"
echo $1
/usr/games/mame -resolution 2560x1440 -window coleco -cart "$1"

