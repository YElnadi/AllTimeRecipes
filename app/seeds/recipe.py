from app.models import db, environment, SCHEMA, Recipe


def seed_recipes(ingredients):
    recipe_1 = Recipe(        
        user_id=1,
        title="White Bean, Rice and Dill Soup",
        image_url="https://static01.nyt.com/images/2023/01/24/multimedia/nd-white-bean-rice-and-dill-soup-vqtb/nd-white-bean-rice-and-dill-soup-vqtb-master768.jpg?w=1280&q=75",
        description="This cozy, comforting pot of soup comes together quickly with a few pantry staples. Creamy canned navy beans and jasmine rice add body to a base of softened vegetables stained with turmeric. You may be tempted to add stock, but be assured that using water is enough here. The sum of the ingredients can stand on its own and doesnt need the added boost of stock. (If you do add stock, be mindful of the amount of salt you use.) The dill  which can be dried or fresh  and turmeric brighten up the soup and offer a bright reminder of spring any time of year.",
        preparations=
        "Step 1 In a large pot, heat the oil over medium. Add the garlic, carrots, celery and onion; season with a good pinch of salt and cook, stirring occasionally, until the vegetables have softened, about 10 minutes.Step 2 Add the turmeric and red-pepper flakes (if using) and cook until fragrant, about 1 minute. Add the rice, stir and cook for 1 minute. Add the beans and dill; season everything well with salt (about 1½ tablespoons) and black pepper to taste. Stir and cook for 1 minute. Step 3 Add 6 cups of water, stir, partially cover, raise the heat to high and bring to a boil. Cover completely, reduce heat to low and simmer, stirring occasionally, until the rice is completely soft and has released its starchy goodness, and the beans are creamy on the inside, about 30 minutes. Taste for seasoning as the soup simmers. Serve with lemon, if you like.",
        servings=6,
        cook_time=45,
        ingredients = ingredients
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
