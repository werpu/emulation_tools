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
import unicodedata
import re
from builtins import Exception

DUMMY_DEFAULT = "__booga__"


# normalizes a string into a caseless one
def normalize_caseless(text):
    if text is None:
        return "____none____"
    return unicodedata.normalize("NFKD", text.casefold())


# equal ignore case equivalent
def caseless_equal(left, right):
    return normalize_caseless(left) == normalize_caseless(right)


# a caseless re match
def re_match(my_str, r_exp):
    if r_exp is None:
        return False
    return re.search(r_exp, my_str, re.RegexFlag.IGNORECASE) is not None


def save_fetch(first_order_func, default=None):
    try:
        return first_order_func()
    except Exception as e:
        return default


# from https://stackoverflow.com/questions/19053707/converting-snake-case-to-lower-camel-case-lowercamelcase
def to_camel_case(snake_str):
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def build_tree(target, *args):

    curr_root = target
    for arg in args:
        curr_root[arg] = save_fetch(lambda: curr_root[arg], {})
        curr_root = curr_root[arg]

    return curr_root


# from https://stackoverflow.com/questions/38987/how-to-merge-two-dictionaries-in-a-single-expression
def merge_two_dicts(x, y):
    z = x.copy()   # start with x's keys and values
    z.update(y)    # modifies z with y's keys and values & returns None
    return z
