# plugin which demonstrates
# how to toggle a state
# on a keypress, for simplicity reasons we just start vlc in hidden mode
import os

cfg = globals()["config"]
drv = globals()["drivers"]

AUTOFIRE_PRESS = "_a_autofire_press"

# plugin_data is a user reserved namespace which can be used by the plugins to store global data

if AUTOFIRE_PRESS in cfg.plugin_data:
    del cfg.plugin_data[AUTOFIRE_PRESS]
    print("Disabling autofire for button A")	
    os.system("/home/werpu/gamepadservice/a-autofire-remove.sh")
    pass
else:
    cfg.plugin_data[AUTOFIRE_PRESS] = True
    print("Enabling autifore for button A")	
    os.system("/home/werpu/gamepadservice/a-autofire.sh")
    print(cfg.plugin_data)	
    pass


