import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadRecipesThunk } from "../store/recipes";
import HomeRecipeCards from "./HomeRecipeCards";
import CoverPhoto from "./CoverPhoto";



const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state=>state.recipes.allRecipes)
    //console.log("all recipes",allRecipes)
    //const recipesList = Object.values(allRecipes)
    //console.log("recipesList",recipesList)

    useEffect(()=>{
        dispatch(loadRecipesThunk())
    },[dispatch])


    return (
        <>
        <CoverPhoto/>
        <h1 style={{fontWeight:500}}>What to cook this week</h1>
        <div className='recipe-cards-container'>
            {Object.values(allRecipes).length>0 &&
            <>
            {Object.values(allRecipes).map(recipe=>(
                <HomeRecipeCards key={recipe.id} recipe={recipe}/>
            ))}
            </>
            }
            
        </div>
        
        </>
    );
}

export default Home;
