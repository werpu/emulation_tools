# emulation tools

This project is a set of smaller tools which ease the integrastion of emulators into
starter uis like emulation station

## uae_exporter

Allows to export fs-uae-starter data into a gamelist xml file which can be used by emulation station

### Usage

*uae_exporter [-h] --img_root IMAGE_ROOT --db_root DB_ROOT --out OUT_FILE*

* IMAGE_ROOT the root dir hosting all images of fs-uae-launcher
* DB_ROOT the sqlite3 db file
* OUT_FILE the output xml usually gamelist.xml

Following arguments are required: *--img_root/-i, --db_root/-d, --out/-o*

## vice_expander

A small utility which expands zipped c64 disk image sets into an expension directory
and allows to start the vice emulator with the appropriate starter image automatically

### Usage
*vice_expander [-h] --vice_exe EXE --expansion_path X_PATH --game_file GAME_FILE*

Following arguments are required: *--vice_exe/-e, --expansion_path/-p, --game_file/-f*

### steam_runner

A helper program for emustation to start and kill steam or other launcher based
programs and to return back to the emulation launcher after finishing
the game

## overlays

A set of useful input/output overlays for the 
input_pipe multiplexer

## multipad

This is an ongoing work into on screen displays which can be combined with the input_pipe multiplexer
to send arbitrary commands from the keyboard into the emulated devices.
The idea is to have specalized on screen keyboards which emulate the often abstruse
input controls of early consoles and homecomputers, which are often mapped
by emulators into special keys (and quite differently from emulator to emulator)

The idea is to have an Electron based ui for every keyboard which needs to have special treatment
and then send the keystrokes to input_pipes emulated devices where the emulator picks them up correctly.

### Usage 
*multipad <emulated device>
 
Following devices are possible atm

* coleco-1p a first player coleco input pad (which was hosted on the console on the controller, and having the digits 0-9 and asterisk and hash as special keys

Additional inputs will follow

### Installation

Given the Electron nature of this application, the build produces native installation binaries.
For now only a deb file is generated, whenever somone besides me wants to use it, we can talk abbout
additional builds for instance rpm, snap etc...

This is as well as input_pipe for the time being, linux only!

  




