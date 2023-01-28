import { useParams, useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadSingleRecipeThunk } from "../store/recipes";
import { useEffect, useState, useRef } from "react";
import DeleteRecipe from "./DeleteRecipe";
import EditRecipe from "./EditRecipe";
import Addingredients from "./Addingredients";

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
      <h1>Welcome in recipe</h1>
      <img src={singleRecipe.image_url} />
      <p>{singleRecipe.title}</p>
      <p>{singleRecipe.user}</p>
      <p>{singleRecipe.description}</p>
      {getIngredents(singleRecipe).map((ingredient) => (
        <p>
          {ingredient.quantity} {ingredient.unit} {ingredient.item_name}
        </p>
      ))}
      {getPreparations(singleRecipe).map((preparation) => (
        <p>
          step {preparation.step} {preparation.instructions} 
        </p>
      ))}
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
