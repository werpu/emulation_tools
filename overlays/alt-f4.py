# vice toggle menu
from evdev import UInput, ecodes

cfg = globals()["config"]
drv = globals()["drivers"]["keybd1"]

drv.press_keys(ecodes.KEY_LEFT_ALT, ecodes.KEY_F4)

