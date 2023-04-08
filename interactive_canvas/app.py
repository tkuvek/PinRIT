from flask import Flask, session
from flask import render_template, make_response, request, redirect, url_for

from werkzeug.security import generate_password_hash, check_password_hash

from utils.generate import generate_svg
from utils.connect_web3 import connect_contract, get_data
from utils.db_conn import connect_db, Session

from utils.forms import LoginForm, RegisterForm

from models.user import get_user, create_user, get, delete_user


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Skrtstrng'
# CONNECT CONTRACT
contract = connect_contract()


# DB CONNECTION
connect_db()
db_session = Session()
# get(db_session)

# main page
@app.route('/')
@app.route('/index', methods=["GET"])

def index():

    username=None
    if 'user' in session:
        username = session.get('user')
    print(username)

    return render_template('index.html', user=username)


@app.route('/buy', methods=["GET", "POST"])
def buy():
    # if request.method == "POST":
        username=None
        if 'user' in session:
            username = session.get('user')
        print(username)

        return render_template('buy.html', user=username)


@app.route('/info',  methods=["GET", "POST"])
def info():
    # if request.method == "POST":
        return render_template('info.html')


@app.route('/login',  methods=["GET", "POST"])
def login():
        form = LoginForm()

        if request.method == "POST":
            if form.validate_on_submit():
                user = get_user(db_session, form.username.data)
                if user:
                    if check_password_hash(user.password, form.password.data):
                        session['user'] = user.username
                        return redirect(url_for('index'))

                # return render_template('invalid_login.html')
        return render_template('login.html', form=form)


@app.route('/register',  methods=["GET", "POST"])
def register():
        form = RegisterForm()
        error=False

        if request.method == "POST":
            if form.validate_on_submit():
                user = get_user(db_session, form.username.data)
                if not user:
                    hash_pass = generate_password_hash(form.password.data, method='sha256')
                    user = create_user(db_session, form.username.data, hash_pass, form.metamask_id.data)
                    user = get_user(db_session, form.username.data)
                    if user:
                        session['user'] = user.username
                        return redirect(url_for('index'))
            error=True

        return render_template('register.html', form=form, error=error)


@app.route('/logout',  methods=["GET"])
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


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
