import random

# not used if going with d3.js version
def rand_color():
    color = "%06x" % random.randint(0, 0xFFFFFF)
    return color

def generate_svg(size):
    pixels = ''
    y = 0

    svg = """<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1314.5 750.1" version="1.1">"""

    for i in range(size*size):
        x = i%size
        if i%size == 0:
            y +=1

        pixels +="""\n\t<rect class="pixel" id="pixel-{}" width="1" height="1" fill="#{}" x="{}" y="{}"/>""".format(i, rand_color(), x, y)
    
    svg += pixels
    svg +=  """\n</svg>"""
    f = open("templates/pixel.svg", "w")
    f.write("""<svg xmlns="http://www.w3.org/2000/svg" width="{}" height="{}" version="1.1">{}\n</svg>""".format(size,size, pixels))
    f.close()
    return svg
