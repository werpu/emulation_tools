#!/usr/bin/env bash

/home/werpu/gamepadservice/input_pipe --server=N --port=9002 --command="overlay /home/werpu/gamepadservice/a5200-overlay.json5"
echo $1
/opt/retropie/emulators/retroarch/bin/retroarch -L /opt/retropie/libretrocores/lr-atari800/atari800_libretro.so --config /opt/retropie/configs/atari5200/retroarch.cfg  "$1"
