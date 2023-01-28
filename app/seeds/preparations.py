from app.models import db, environment, SCHEMA, Preparation

def seed_preparations():
    step_1 = Preparation(
        recipe_id = 1,
        step = 1,
        instruction = "Bring a large pot of water to a boil. Season generously with salt and cook the pasta until al dente, then drain pasta." 
    )
    step_2 = Preparation(
        recipe_id = 1,
        step = 2,
        instruction="While the pasta is cooking, prep the chicken: Separate the skin from the meat and separate the meat from the bones; discard the bones and shred the meat into bite-size pieces. Season the chicken meat with 1½ teaspoons pepper and salt to taste. Gather the skin in a mound on a cutting board; slice it thinly then finely chop it and set aside."
    )
    step_3 = Preparation(
        recipe_id = 1,
        step = 3,
        instruction="Place a Dutch oven or large heavy pot over medium heat and add the butter. Once melted and bubbling, add onions, season with salt and pepper and cook, stirring and pressing often with a spatula or wooden spoon to help them cook down faster, until very soft, translucent and almost jammy with golden brown edges, about 10 minutes. Stir in the garlic and mustard and cook until very fragrant and softened, about 2 minutes."
    )
    step_4 = Preparation(
        recipe_id = 1,
        step=4,
        instruction="Turn the heat up to high, add ¾ cup stock and the heavy cream (if using) and scrape up any browned bits on the bottom of the pot. Bring to a simmer, then stir in the pasta, seasoned chicken and the skin. In small handfuls, add the greens, stirring until wilted and tender. Turn off the heat, add the lemon zest and juice the lemon halves over the top; stir again. Add the remaining ¼ cup stock if more sauciness is desired."
    )
    step_5 = Preparation(
        recipe_id=1,
        step = 5,
        instruction ="Sprinkle with grated Parmesan. Serve immediately, with more pepper and salt to taste."
    )

    db.session.add(step_1)
    db.session.add(step_2)
    db.session.add(step_3)
    db.session.add(step_4)
    db.session.add(step_5)

    db.session.commit()

    preparations = [step_1,step_2,step_3,step_4,step_5]
    return preparations

def undo_preparations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.preparations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM preparations")

    db.session.commit()

