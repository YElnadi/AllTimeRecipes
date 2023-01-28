from app.models import db, environment, SCHEMA, Recipe


def seed_recipes():
    recipe_1 = Recipe(        
        user_id=1,
        title="Rotisserie Chicken and Greens Pasta",
        image_url="https://static01.nyt.com/images/2023/01/25/multimedia/cr-rotisserie-chicken-and-greens-pasta-lvbp/cr-rotisserie-chicken-and-greens-pasta-lvbp-articleLarge.jpg?w=1280&q=75",
        description="This cozy, comforting pot of soup comes together quickly with a few pantry staples. Creamy canned navy beans and jasmine rice add body to a base of softened vegetables stained with turmeric. You may be tempted to add stock, but be assured that using water is enough here. The sum of the ingredients can stand on its own and doesnt need the added boost of stock. (If you do add stock, be mindful of the amount of salt you use.) The dill  which can be dried or fresh  and turmeric brighten up the soup and offer a bright reminder of spring any time of year.",
        servings=6,
        cook_time=30
        )
    db.session.add(recipe_1)
    db.session.commit()


def undo_recipes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes")

    db.session.commit()
