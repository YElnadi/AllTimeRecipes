from app.models import db, User, environment, SCHEMA, Image


def seed_images():
    image_1 = Image(
        url = 'https://static01.nyt.com/images/2023/01/24/multimedia/nd-white-bean-rice-and-dill-soup-vqtb/nd-white-bean-rice-and-dill-soup-vqtb-master768.jpg?w=1280&q=75"'
    )

    db.session.add(image_1)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")
        
    db.session.commit()