#!/usr/bin/env bash
echo "$1"
/home/werpu/gamepadservice/input_pipe --server=N --port=9002 --command="overlay /home/werpu/gamepadservice/vice.json5"
/home/werpu/gamepadservice/vice_expander -e=/snap/bin/vice-jz.x64sc -p=/home/werpu/RetroPie/expanded/c64  -f=$1

