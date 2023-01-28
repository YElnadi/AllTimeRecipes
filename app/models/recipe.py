from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.Text)
    description = db.Column(db.Text, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    cook_time = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ##relationships
    user = db.relationship("User", back_populates ='recipes')

    ingredients = db.relationship("Ingredient", back_populates ='recipe', cascade="all, delete")

    preparations = db.relationship("Preparation", back_populates='recipe', cascade="all, delete")

    # notes = db.relationship("Note", back_populates ='recipe', cascade="all, delete")

    # ratings = db.relationship("Rating", back_populates='recipe', cascade='all, delete')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "title": self.title,
            "image_url": self.image_url,
            "description": self.description,
            "servings": self.servings,
            "cook_time": self.cook_time,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user":self.user.username,
            "ingredients":[ingredient.to_dict()for ingredient in self.ingredients],
            "preparations":[preparation.to_dict()for preparation in self.preparations]
        }
