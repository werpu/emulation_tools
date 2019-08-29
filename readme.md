# A small exporter from the uae-launcher database to the emulation station xml

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


