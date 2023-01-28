from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Ingredient

ingredient_routes = Blueprint('ingredients', __name__)

##get all Ingredients
@ingredient_routes.route('')
def ingredients():
     ingredients = Ingredient.query.order_by(Ingredient.id.desc()).all()
     return {"Ingredeints": [ingredient.to_dict() for ingredient in ingredients]}

