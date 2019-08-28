# MIT License
#
# Copyright (c) 2019 Werner Punz
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
import argparse
import zipfile
import os
import subprocess


class ViceExpander:
    def __init__(self):
        parser = argparse.ArgumentParser(description='Point to the image dir and db file')

        parser.add_argument('--vice_exe', "-e",
                            dest='exe',
                            required=True,
                            help='vice executable location')

        parser.add_argument('--expansion_path', "-p",
                            dest='x_path',
                            required=True,
                            help='expansion path for files')

        parser.add_argument('--game_file', "-f",
                            dest='game_file',
                            required=True,
                            help='targets a game file (either a zip or a prg or a d64 or a t64 file')

        self.args = parser.parse_args()
        self.expanded_files = []

        self.expand()
        self.exec()

    def expand(self):
        print("expanding")
        if zipfile.is_zipfile(self.args.game_file):
            splitted = os.path.split(self.args.game_file)
            dir_name = os.path.join(self.args.x_path, splitted[len(splitted) - 1])
            if not os.path.isdir(dir_name):
                os.makedirs(dir_name, exist_ok=True)
            zipped = zipfile.ZipFile(self.args.game_file)
            zipped.extractall(path=dir_name)
            os.chdir(dir_name)

            contents = []
            for root, dirs, files in os.walk(dir_name):
                for name in files:
                    item = dict()
                    item["root"] = root
                    item["name"] = name
                    item["full_path"] = os.path.join(root, name)
                    item["sort_key"] = ViceExpander._resolve_sort(name) + "__" + name.lower()
                    item["skip"] = ViceExpander._resolve_sort(name) == 3
                    contents.append(item)

            contents.sort(key=lambda sort_item: sort_item["sort_key"])

            self.expanded_files = [a for a in contents if a["skip"] is False]
            for file in self.expanded_files:
                print("expanded", file["full_path"])

        else:
            item = dict()
            item["full_path"] = self.args.game_file
            splitted = os.path.split(self.args.game_file)
            item["root"] = os.path.join(splitted[:-1])
            self.expanded_files[item]

    def exec(self):
        exec_cmd = [self.args.exe, "-fullscreen", "-autostart-warp", "+confirmonexit", self.expanded_files[0]["full_path"]]
        print("executing", " ".join(exec_cmd))
        p = subprocess.Popen(exec_cmd, stdout=subprocess.PIPE)
        for line in p.stdout:
            print(line)
        p.wait()

    @staticmethod
    def _resolve_sort(name):
        name_lower = name.lower()
        if name_lower.endswith(".prg"):
            return "1"
        elif name_lower.endswith(".d64") or name_lower.endswith(".t64"):
            return "2"
        else:
            return "3"


expander = ViceExpander()

