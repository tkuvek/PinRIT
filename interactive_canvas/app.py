from flask import Flask, render_template, make_response, request
import sys
from utils.generate import generate_svg
from utils.connect_web3 import connect_contract, get_data
from utils.db_conn import connect_db, Session

from models.user import get_user, create_user

app = Flask(__name__)

#CONTRACT CONNECTION
contract = connect_contract()

# DB CONNECTION
connect_db()
session = Session()
# create_user(session, 'ime', 'pass')
# get_user(session, 'ime')


# main page
@app.route('/')
@app.route('/index')
@app.route('/index/<size>')

def index(size=None):
    if size != None:
        svg = generate_svg(int(size))
    return render_template('index.html')


@app.route('/buy',  methods=["GET", "POST"])
def buy():
    # if request.method == "POST":
        return render_template('buy.html')

#enaaa
@app.route('/info',  methods=["GET", "POST"])
def info():
    # if request.method == "POST":
        return render_template('info.html')

@app.route('/login',  methods=["GET"])
def login():
    # if request.method == "POST":
        return render_template('login.html')

@app.route('/register',  methods=["GET"])
def register():
    # if request.method == "POST":
        return render_template('register.html')


# ORIGINALNI
# @app.route('/buy-pixel', methods=['GET', 'POST'])
# def buy_pixel():
#     m_id = request.form.get('metamask_id')
#     # todo: metamask id check

#     p_id = request.form.get('pixel')
#     p_color = request.form.get('color')

#     #trigger smart contract with id, pixel_id, color
#     print('METAMASK ID: {}, PIXEL ID: {}, PIXEL COLOR: {}'.format(m_id, p_id, p_color))
#     #if transaction.ok
#     #return success
#     return 'aa'

# TODO: kao dohvaca vise pixela (array) i color-a (array) iako se color uvik salje isti
@app.route('/buy-pixel', methods=['GET', 'POST'])
def buy_pixel():
    m_id = request.form.get('metamask_id')
    # todo: metamask id check

    pixels = request.form.getlist('pixels')
    color = request.form.getlist('color')

    #trigger smart contract with id, pixels, colors
    for i in range(len(pixels)):
        p_id = pixels[i]
        p_color = color[i]
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


@app.route('/get-mint-data/<id>', methods=['GET', 'POST'])
def get_mint_data(id):
    if contract:
        data = get_data(contract, id)
        return data


if __name__ == "__main__":
    app.run(debug=True)
