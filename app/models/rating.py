from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Rating(db.Model):
    __tablename__='ratings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("recipes.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    ##Relationship
    # recipe = db.relationship("Recipe", back_populates='ratings')

    # user = db.relationships("User", back_populates='ratings' )
