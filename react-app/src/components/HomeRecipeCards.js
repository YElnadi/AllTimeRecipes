import { useHistory } from "react-router-dom";

const HomeRecipeCards = ({recipe}) => {
    console.log('recipe', recipe)
    //console.log('recipe id',recipe.id )
    //const user = useSelector(state=>state.session.user)
    const history = useHistory()
    const openRecipe = (e) =>{
        history.push(`/recipes/${recipe.id}`)
    }
  return (
    <>
    <img src={recipe.image_url} onClick={openRecipe}/>
    <p>{recipe.title}</p>
    <p>{recipe.user}</p>
    
      
    </>
  );
}

export default HomeRecipeCards;
