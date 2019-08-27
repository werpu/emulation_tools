# A small exporter from the uae-launcher database to the emulation station xml

This tool allows you to export fs-uae-launcher databases  into xml files expected by 
emulation station. This should simplify the integration of fs-uae into emustation.

# Usage

##

uae_exporter [-h] --img_root IMAGE_ROOT --db_root DB_ROOT --out OUT_FILE

* IMAGE_ROOT the root dir hosting all images of fs-uae-launcher
* DB_ROOT the sqlite3 db file
* OUT_FILE the output xml usually gamelist.xml

the following arguments are required: *--img_root/-i, --db_root/-d, --out/-o*