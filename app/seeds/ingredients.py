from app.models import db, environment, SCHEMA, Ingredient

def seed_ingredients():
    ingredient_1 = Ingredient(
        recipe_id = 1,
        quantity = 1,
        unit = 'cup',
        item_name = 'quinoq, rinsed'
    )
    ingredient_2 = Ingredient(
        recipe_id = 1,
        quantity = 1,
        unit = '',
        item_name = 'lemon'
    )
    ingredient_3 = Ingredient(
        recipe_id = 1,
        quantity = 3,
        unit = 'tablespoons',
        item_name = 'extra-virgin olive oil'
    )
    ingredient_4 = Ingredient(
        recipe_id = 1,
        quantity = 3,
        unit = 'tablespoons',
        item_name = 'Dijon mustard'
    )
    ingredient_5 = Ingredient(
        recipe_id = 1,
        quantity = 2,
        unit = 'tablespoons',
        item_name = 'honey'
    )
    ingredient_6 = Ingredient(
        recipe_id = 1,
        quantity = 2,
        unit = 'tablespoons',
        item_name = 'apple cider vinegar Freshly ground black pepper'
    )
    ingredient_7 = Ingredient(
        recipe_id = 1,
        quantity = 1,
        unit = 'large',
        item_name = 'bunch broccoli (about 1½ pounds)'
    )
    ingredient_8 = Ingredient(
        recipe_id = 1,
        quantity = 1,
        unit = 'mdeium',
        item_name = 'tart and crisp apple'
    )
    ingredient_9 = Ingredient(
        recipe_id = 1,
        quantity = 4,
        unit = 'ounces',
        item_name = 'sharp Cheddar'
    )
    ingredient_10 = Ingredient(
        recipe_id = 1,
        quantity = 3/4,
        unit = 'cup',
        item_name = 'toasted pecans, roughly chopped'
    )
    ingredient_11 = Ingredient(
        recipe_id = 1,
        quantity = 1/2,
        unit = 'cup',
        item_name = 'dried cranberries'
    )

    db.session.add(ingredient_1)
    db.session.add(ingredient_2)
    db.session.add(ingredient_3)
    db.session.add(ingredient_4)
    db.session.add(ingredient_4)
    db.session.add(ingredient_5)
    db.session.add(ingredient_6)
    db.session.add(ingredient_7)
    db.session.add(ingredient_8)
    db.session.add(ingredient_9)
    db.session.add(ingredient_10)
    db.session.add(ingredient_11)

    db.session.commit()

    ingredients = [ingredient_1,ingredient_2,ingredient_3,ingredient_4,ingredient_5,ingredient_6,ingredient_7,ingredient_8,ingredient_9,ingredient_10,ingredient_11]
    return ingredients


def undo_ingredients():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM ingredients")

    db.session.commit()






