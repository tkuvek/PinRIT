from flask import Flask, render_template, make_response, request
from utils.generate import generate_svg

app = Flask(__name__)

# main page
@app.route('/')
@app.route('/index')
@app.route('/index/<size>')
def index(size=None):
    if size != None:
        svg = generate_svg(int(size))
    return render_template('index.html')


@app.route('/buy-pixel', methods=['GET', 'POST'])
def buy_pixel():
    m_id = request.form.get('metamask_id')
    # todo: metamask id check

    p_id = request.form.get('pixel')
    p_color = request.form.get('color')

    #trigger smart contract with id, pixel_id, color
    print('METAMASK ID: {}, PIXEL ID: {}, PIXEL COLOR: {}'.format(m_id, p_id, p_color))
    #if transaction.ok
    #return success
    return 'aa'


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
