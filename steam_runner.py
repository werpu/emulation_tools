import argparse
import configparser
import os
import subprocess
import time


class SteamRunner:
    """
    A generic steamrunner wich takes a desktop file
    and uses the exec part to start the game via steam .... pid
    """

    def __init__(self):
        parser = argparse.ArgumentParser(description='Point to steeam file')

        parser.add_argument('--file', "-f",
                            dest='steam_file',
                            required=True,
                            help='steam desktop entry file')
        text_file = open("/home/werpu/Output.txt", "w")
        self.args = parser.parse_args()
        config = configparser.ConfigParser()
        file_name = self.args.steam_file
        config.read(file_name)
        os.system(config["Desktop Entry"]["Exec"] +"&")
        focus = "blarg"
        focus_window = "foobaz"
        time.sleep(10)
        while focus != focus_window or self.is_starter_window(focus_window):
            focus_window = subprocess.check_output(["xdotool", "getwindowfocus", "getwindowname"])
            time.sleep(5)
            focus = subprocess.check_output(["xdotool", "getwindowfocus", "getwindowname"])
            text_file.writelines(focus_window.decode("utf-8"))

        while focus == focus_window:
            focus_window = subprocess.check_output(["xdotool", "getwindowfocus", "getwindowname"])
            time.sleep(1)
            text_file.writelines(focus.decode("utf-8"))
            text_file.writelines(focus_window.decode("utf-8"))

        os.system("pgrep steam | while read pid; do kill $pid; done")
        text_file.writelines("done")
        text_file.flush()
        text_file.close()

    @staticmethod
    def is_starter_window(focus_window):
        decoded_str = focus_window.decode("utf-8").lower()
        return "steam" in decoded_str or "wine64" in decoded_str or "uae_exporter" in decoded_str


runner = SteamRunner()


