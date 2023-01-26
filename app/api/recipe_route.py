from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Recipe


recipe_routes = Blueprint('recipes', __name__)

## get all recipes
@recipe_routes.route('/')
def recipes():
    recipes = Recipe.query.all()
    return {"recipes":[recipe.to_dict()for recipe in recipes]}

##get single recipe
@recipe_routes.route('/<int:recipe_id>', methods=["GET"])
def get_single_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return {"error":"recipe not found"}, 404
    return recipe.to_dict()