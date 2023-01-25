import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadRecipesThunk } from "../store/recipes";
import "./CoverPhoto.css";

const CoverPhoto = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes.allRecipes);
  //const recipeImage = Object.values(allRecipes);
  //console.log('image', recipeImage[0].image_url)

  useEffect(() => {
    dispatch(loadRecipesThunk());
  }, [dispatch]);

  return (
    <>
    {Object.values(allRecipes).length >0 &&
      
          <div className="cover-image">
            <img src={allRecipes[1].image_url} />
          </div>
    }
    </>
  );
};

export default CoverPhoto;
