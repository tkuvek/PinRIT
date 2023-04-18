from flask import Flask, session
from flask import render_template, make_response, request, redirect, url_for

from werkzeug.security import generate_password_hash, check_password_hash

from utils.connect_web3 import connect_contract, get_data
from utils.db_conn import connect_db, Session

from utils.forms import LoginForm, RegisterForm

from models.user import get_user, create_user, get, delete_user, get_mid
from models.purchase import get_pixels, create_pixel


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Skrtstrng'
# CONNECT CONTRACT
contract = connect_contract()

# DB CONNECTION
connect_db()
db_session = Session()
# delete_user(db_session, '')
# get(db_session)

# main page
@app.route('/')
@app.route('/index', methods=["GET"])

def index():
    username = None
    if 'user' in session:
        username = session.get('user')
    print(username)

    return render_template('index.html', user=username)


@app.route('/buy', methods=["GET", "POST"])
def buy():
    username = None
    mid = None
    if 'user' in session:
        username = session.get('user')
        connect_db()
        db_session = Session()
        mid = get_mid(db_session, username)

    return render_template('buy.html', user=username, metamask_id=mid)


@app.route('/buy/get-mid', methods=["GET", "POST"])
def get_metamask():
    username = None
    mid = ''
    if 'user' in session:
        connect_db()
        db_session = Session()
        username = session.get('user')
        mid = get_mid(db_session, username)

    return mid


@app.route('/login',  methods=["GET", "POST"])
def login():
        error=False
        form = LoginForm()

        if request.method == "POST":
            if form.validate_on_submit():
                connect_db()
                db_session = Session()
                user = get_user(db_session, form.username.data)
                if user:
                    if check_password_hash(user.password, form.password.data):
                        session['user'] = user.username
                        return redirect(url_for('index'))
            error=True
        return render_template('login.html', form=form, error=error)


@app.route('/register',  methods=["GET", "POST"])
def register():
    error=False
    form = RegisterForm()

    if request.method == "POST":
        if form.validate_on_submit():
            connect_db()
            db_session = Session()
            user = get_user(db_session, form.username.data)
            if not user:
                hash_pass = generate_password_hash(form.password.data, method='sha256')
                create_user(db_session, form.username.data, hash_pass, form.metamask_id.data)
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


@app.route('/buy-pixel', methods=['GET', 'POST'])
def buy_pixel():
    if request.method == "POST":
        # d = request.json
        pixels = request.form.getlist('pixels[]')
        user = session['user']

        #add user and pixel_id to db, calculate purchased date
        connect_db()
        db_session = Session()
        for i in range(len(pixels)):
            p_id = pixels[i]
            create_pixel(db_session, user, p_id)
        db_session.commit()

        get_pixels(db_session, user)

    return 'purchase success: {}'.format(user)


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


@app.route('/user_profile',  methods=["GET", "POST"])
def userProfile():
    username = None
    if 'user' in session:
        username = session.get('user')
        user = session['user']
        connect_db()
        db_session = Session()
        userPixels = get_pixels(db_session, user)
    
        data = []
        values = []
        if contract:
            for i in userPixels:
                pixelId = i.pixel_id
                dataForPixel = get_data(contract, pixelId)
                data.append(dataForPixel)
            
            for j in data:
                for key, value in j.items():
                    values.append(value)

    return render_template('user_profile.html', user=username, pixels=userPixels, data=data, values=values)


if __name__ == "__main__":
    app.run(debug=True)
