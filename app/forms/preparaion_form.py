from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class PreparationForm(FlaskForm):
    recipe_id = IntegerField("Recipe Id")
    step = IntegerField("Step", validators=[DataRequired()])
    instruction = TextField("Instruction",validators=[DataRequired()])
    submit = SubmitField("save")
