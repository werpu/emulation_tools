#!/bin/sh
/home/werpu/gamepadservice/input_pipe -c /home/werpu/gamepadservice/devices.json5 --server=N --port=9002 --command="overlay /home/werpu/gamepadservice/scummvm-overlay.json5"
bash /home/werpu/RetroPie/roms/scummvm/+Start\ ScummVM.sh $1

