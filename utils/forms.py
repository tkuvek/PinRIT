from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, DataRequired, ValidationError


def validate_metamask(form, field):
    if field.data == "CONNECT METAMASK" or field.data.replace(' ','') == '':
        raise ValidationError('Please connect your Metamask wallet!')

class RegisterForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8)])
    metamask_id = StringField('metamask_id', validators=[DataRequired(message='Please connect youir Metamask wallet.'), validate_metamask])

class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8)])
