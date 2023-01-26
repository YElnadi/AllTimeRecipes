from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe
from ..forms.create_recipe_form import RecipeForm
from .auth_routes import validation_errors_to_error_messages

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


##Create a Recipe
@recipe_routes.route('/new-recipe', methods=["POST"])
@login_required
def create_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_recipe = Recipe(
            title = form.data['title'],
            description = form.data['description'],
            preparations = form.data['preperations'],
            servings = form.data['servings'],
            cook_time = form.data['cook_time'],
            image_url = form.data['image_url'],
            user_id = current_user.id,
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return {"errors":validation_errors_to_error_messages(form.errors)}, 401
        

        
            

