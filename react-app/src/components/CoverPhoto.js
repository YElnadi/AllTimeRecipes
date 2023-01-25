import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadRecipesThunk } from "../store/recipes";
import "./CoverPhoto.css";
import { useHistory } from "react-router-dom";

const CoverPhoto = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allRecipes = useSelector((state) => state.recipes.allRecipes);

  //const recipeImage = Object.values(allRecipes);
  //console.log('image', recipeImage[0].image_url)

  useEffect(() => {
    dispatch(loadRecipesThunk());
  }, [dispatch]);

  const openRecipe = (e) =>{
    history.push(`/recipes/${allRecipes[1].id}`)
}

  return (
    <>
    {Object.values(allRecipes).length >0 &&
          <div className="cover-image">
            <img src={allRecipes[1].image_url} onClick={openRecipe}/>
          </div>
    }
    </>
  );
};

export default CoverPhoto;
