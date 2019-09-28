# a small signal translator which should ease the handling of star wars
import math

event = globals()["event"]


def calc(x_val):

    translate_factor = x_val / 138

    if x_val < 128:
        return x_val * translate_factor
    else:
        return 128 + (x_val - 120) * (translate_factor / 2)


event.value = math.floor(calc(event.value))





