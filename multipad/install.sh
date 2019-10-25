#!/usr/bin/env bash

# get the latest file from the dist folder
# which is the latest built
latest=$(ls -tr ./dist/debian/ | tail -n 1)
# install it anew
sudo dpkg -i "./dist/debian/$latest"
