from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length


class RegisterForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8)])
    # TODO: get metamask id from js
    # metamask_id = StringField('metamask_id', validators=[InputRequired()])


class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8)])
