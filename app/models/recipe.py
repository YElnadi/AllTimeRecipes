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
    title = db.Column(db.String(255))
    image_url = db.Column(db.Text)
    description = db.Column(db.Text)
    preparations = db.Column(db.Text)
    servings = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ##relationships
    user = db.relationship("User", back_populates ='recipes')

    # notes = db.relationship("Note", back_populates ='recipe', cascade="all, delete")

    # ratings = db.relationship("Rating", back_populates='recipe', cascade='all, delete')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image_url": self.image_url,
            "description": self.description,
            "preparations": self.preparations,
            "servings": self.servings,
            "cook_time": self.cook_time,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
