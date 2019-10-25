#!/usr/bin/env bash

echo "$1"
xdotool windowfocus "$1" |  xargs echo
