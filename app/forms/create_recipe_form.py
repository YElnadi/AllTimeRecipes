from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def check_image_type(form, field):
  image_url = field.data
  if not image_url.endswith(".jpeg") or not image_url.endswith(".jpg"):
    raise ValidationError("Image type not supported")


class RecipeForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  image_url = TextField('Recipe Image URL', validators=[DataRequired(), check_image_type])
  description = TextField('Description', validators=[DataRequired()] )
  servings = IntegerField('Servings',  validators=[DataRequired()])
  cook_time = IntegerField('Time', validators=[DataRequired()])
  ingredients = TextField('Ingredients', validators=[DataRequired()])
  user_id = IntegerField('User Id')
  submit = SubmitField('Save')

class IngredientForm(FlaskForm):
  recipe_id = IntegerField("Recipe Id")
  quantity = IntegerField("Quantity", validators=[DataRequired()])
  item_name = StringField("Item Name", validators=[DataRequired()])
  unit = StringField("Unit")
  submit = SubmitField("save")