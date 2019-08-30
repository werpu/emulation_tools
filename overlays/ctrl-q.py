# vice toggle menu
from evdev import UInput, ecodes

cfg = globals()["config"]
drv = globals()["drivers"]["keybd1"]

drv.press_keys(ecodes.KEY_LEFTCTRL, ecodes.KEY_Q)


