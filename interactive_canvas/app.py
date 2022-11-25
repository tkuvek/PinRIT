import sys
from flask import Flask, render_template, Markup, Response, make_response
from flask_ngrok import run_with_ngrok
from generate import generate_svg

app = Flask(__name__)

# main page
@app.route('/')
@app.route('/index')
@app.route('/index/<size>')
def index(size=None):
    if size != None:
        svg = generate_svg(int(size))
    return render_template('index.html')

# pixel svg for js
# not used if going with d3.js version
@app.route('/get-svg/pixel.svg', methods=['GET', 'POST'])
def pixel():
    svg = render_template('/pixel.svg')
    response = make_response(svg)
    response.content_type = 'image/svg+xml'
    return response


if __name__ == "__main__":
    app.run(debug=True)
