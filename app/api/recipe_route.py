from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe
from ..forms.create_recipe_form import RecipeForm
from .auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
# @recipe_routes.route('/new-recipe', methods=["POST"])
# @login_required
# def create_recipe():
#     form = RecipeForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_recipe = Recipe(
#             title = form.data['title'],
#             description = form.data['description'],
#             preparations = form.data['preparations'],
#             servings = form.data['servings'],
#             cook_time = form.data['cook_time'],
#             image_url = form.data['image_url'],
#             user_id = current_user.id,
#         )
#         db.session.add(new_recipe)
#         db.session.commit()
#         return new_recipe.to_dict()
#     return {"errors":validation_errors_to_error_messages(form.errors)}, 401

##create a recipe 
@recipe_routes.route("/new",methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    print('request files:', request.files)

    image = request.files["image"]
    data = request.form.to_dict()

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)
    new_recipe = Recipe(
        image_url=url,
        title=data['title'],
        description = data['description'],
        preparations = data['preparations'],
        servings = data['servings'],
        cook_time = data["cook_time"],
        user_id = current_user.id,
    )
    db.session.add(new_recipe)
    db.session.commit()
    return new_recipe.to_dict()

    
        

        
            

