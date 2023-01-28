import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadSingleRecipeThunk } from "../store/recipes";
import { useEffect, useState, useRef } from "react";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";
import Addingredients from "./Addingredients";
import "./SingleRecipeDetails.css";

const SingleRecipeDetails = () => {
  const { recipeId } = useParams();
  //console.log("recipeId", recipeId);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
  console.log("single recipe", singleRecipe);
  //console.log("session user", sessionUser);

  const getIngredents = (singleRecipe) => {
    const ingredents =
      singleRecipe.ingredients !== undefined ? singleRecipe.ingredients : [];
    return Object.values(ingredents);
  };

  const getPreparations = (singleRecipe) => {
    const preparations =
      singleRecipe.preparations !== undefined ? singleRecipe.preparations : [];
    return Object.values(preparations);
  };

  useEffect(async () => {
    await dispatch(loadSingleRecipeThunk(recipeId));
  }, [dispatch, recipeId]);

  return (
    <>
      <div className="page-container">
        <div>
          <div>
            <img src={singleRecipe.image_url} className="img-div" />
          </div>
          <div className="recipe-title-username">
            <div>
              <h1
                style={{
                  fontSize: "50px",
                  fontFamily: "nyt-cheltenham,Georgia,Times New Roman,serif",
                  fontWeight: 180,
                  inlineSize: 500,
                  overflowWrap: "break-word",
                  textAlign: "center",
                }}
              >
                {singleRecipe.title}
              </h1>
              <h2 className="user-name">By {singleRecipe.user}</h2>
            </div>
          </div>
        </div>
        <div style={{ inlineSize: 700 }} className="description">
          <p style={{ borderBottom: "5px solid black", padding: "10px" }}>
            {singleRecipe.description}
          </p>
        </div>
      </div>
      <h3 style={{paddingLeft:'610px', fontSize:'25px'}}>Preparation</h3>


      <div style={{ border: "1px solid black", display: "flex" }}>
        <div
          style={{ border: "1px solid black", inlineSize: 500 }}
          className="instructions"
        >
          {getIngredents(singleRecipe).map((ingredient) => (
            <p style={{fontFamily:'nyt-cheltenham,Georgia,Times New Roman,serif'}}>
              {ingredient.quantity} {ingredient.unit} {ingredient.item_name}
            </p>
          ))}
        </div>
        <div style={{ border: "1px solid black", inlineSize: 700  }}>
          {getPreparations(singleRecipe).map((preparation) => (
            <>
              <p style={{fontFamily:'nyt-cheltenham,Georgia,Times New Roman,serif', fontSize:'20px', fontWeight:'bold'}}> Step {preparation.step}</p>
              <p style={{fontFamily:'nyt-cheltenham,Georgia,Times New Roman,serif'}}>{preparation.instructions}</p>
            </>
          ))}
        </div>
      </div>
      {sessionUser && sessionUser.id === singleRecipe.user_id && (
        <>
          <DeleteRecipe recipeId={recipeId} />
          {/* <div>
            <button >
            <NavLink to={`/recipes/${recipeId}/Add`} style={{textDecoration:'none', color:'black', }}>
            <Addingredients/>Add Ingredients
            </NavLink>
            </button>
        </div> */}
        </>
      )}

      {sessionUser && sessionUser.id === singleRecipe.user_id && (
        // <OpenModalMenuItem
        //   itemText={<button>Edit your recipe</button>}
        //   onItemClick={closeMenu}
        //   modalComponent={<EditRecipe key={recipeId}/>}
        // />
        <>
          <EditRecipe buttonClicked={false} singleRecipe={singleRecipe} />
        </>
      )}

      {sessionUser && sessionUser.id === singleRecipe.user_id && (
        <Addingredients buttonClicked={false} singleRecipe={singleRecipe} />
      )}
    </>
  );
};

export default SingleRecipeDetails;
