# Keyboard starter for the florence keyboard
import os
import time
import psutil


class OSKeyHandler:

    def __init__(self, mouse1):
        self.mouse_driver = mouse1

    def kill_pad(self):
        p = self.pad_exists()
        if p is not None:
            p.terminate()
            time.sleep(0.5)
            self.mouse_driver.press_btn_left()

    @staticmethod
    def pad_exists():
        p = None
        for proc in psutil.process_iter():
            if proc.as_dict(attrs=["name"])["name"] == "multipad":
                p = proc
                break
        return p

    def start_pad(self):
        if self.pad_exists() is None:
            os.system("multipad  atari5200 &")

    def toggle_pad(self):
        if self.pad_exists() is None:
            self.mouse_driver.press_btn_middle()
            self.start_pad()
        else:
            self.mouse_driver.press_btn_right()
            self.kill_pad()



#cfg = globals()["config"]
#drv = globals()["drivers"]
# middle mouse (EV_KEY), code 274 (BTN_MIDDLE)
# florence /usr/bin/florence
# btn-left: (EV_KEY), code 272 (BTN_LEFT)


drv = globals()["drivers"]
OSKeyHandler(drv["mouse1"]).toggle_pad()


