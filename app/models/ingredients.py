from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Ingredient(db.Model):
    __tablename__='ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")))
    quantity = db.Column(db.Float)
    item_name = db.Column(db.String(255), nullable=False)
    unit = db.Column(db.String(25))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    recipe = db.relationship("Recipe", back_populates ='ingredients')

    def to_dict(self):
        return{
            "id":self.id,
            "recipe_id":self.recipe_id,
            "quantity":self.quantity,
            "item_name":self.item_name,
            "unit":self.unit
        }






