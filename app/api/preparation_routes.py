from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Preparation

preparation_routes = Blueprint('preparations', __name__)

#get all preparations
@preparation_routes.route('')
def preparations():
    preparations = Preparation.query.order_by(Preparation.id.desc()).all()
    return{"Preparations":[preparation.to_dict() for preparation in preparations]}