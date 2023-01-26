import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadSingleRecipeThunk } from "../store/recipes";
import { useEffect } from "react";

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
    const ingredents = singleRecipe.ingredients !== undefined ? singleRecipe.ingredients : [];
    return Object.values(ingredents);
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
      <p>{singleRecipe.preparations}</p>
      {getIngredents(singleRecipe).map(ingredient=>
        <p>{ingredient.quantatiy} {ingredient.unit} {ingredient.item_name}</p>
      )}      
    </>
  );
};

export default SingleRecipeDetails;
