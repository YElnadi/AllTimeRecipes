import { useParams,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const SingleRecipeDetails = () => {
    const {recipeId} = useParams()
    //console.log('recipeId', recipeId)
    const dispatch = useDispatch();
    const history = useHistory();
  return (
    <div>
      <h1>Welcome in recipe</h1>
    </div>
  );
}

export default SingleRecipeDetails;
