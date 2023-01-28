from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Recipe, Ingredient
from ..forms.create_recipe_form import RecipeForm, IngredientForm
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
        return {"errors": "image of type pdf, png, jpg, jpeg, gif are the only allowed"}, 400

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
        servings = data['servings'],
        cook_time = data["cook_time"],
        # ingredients = data["ingredients"],
        # Ingredients = Ingredient(
        #     unit = data["unit"],
        #     quantity = data["quantity"],
        #     item_name = data["item_name"]
        # ),
        user_id = current_user.id,
    )
    db.session.add(new_recipe)
    db.session.commit()
    return new_recipe.to_dict()


##Delete a recipe
@recipe_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe:
        db.session.delete(recipe)
        db.session.commit()
        return {"message":"Recipe has been deleted successfully"}
    else:
        return{"message":f"No recipe found with id f {id}"}


##Edit Recipe
@recipe_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_recipe(id):
    recipe = Recipe.query.get(id)
    new_title = request.json["title"]
    new_description = request.json["description"]
    new_servings = request.json["servings"]
    new_cook_time = request.json["cook_time"]
    new_image_url = request.json['image_url']
    if recipe:
        recipe.title = new_title
        recipe.description = new_description
        recipe.servings = new_servings
        recipe.cook_time = new_cook_time
        recipe.image_url = new_image_url
        db.session.commit()
        return recipe.to_dict()   

##add ingredients to recipe
@recipe_routes.route("/<int:id>/add-ingredients", methods=["POST"]) 
#@login_required
def add_ingredients_to_recipe(id):
    # recipe = Recipe.query.get(id)
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_ingredient = Ingredient(
            quantity = form.data["quantity"],
            unit = form.data["unit"],
            item_name = form.data["item_name"],
            recipe_id = form.data["recipe_id"],
        )
        # recipe.append(new_ingredient)
        db.session.add(new_ingredient)
        db.session.commit()
        updated_recipe = Recipe.query.get(form.data['recipe_id'])
        return updated_recipe.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


        
            

