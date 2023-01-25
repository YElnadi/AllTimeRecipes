const LOAD_RECIPES = "recipes/LOAD_ALL_RECIPES";



//////////ACTIONS CREATORS /////////////
const loadRecipes = (recipes) =>({
    type:LOAD_RECIPES,
    recipes
});






/////////THUNK ////////////
export const loadRecipesThunk = () => async (dispatch) =>{
    const response = await fetch ("/api/recipes/");
    if (response.ok){
        const data = await response.json();
        await dispatch (loadRecipes(data.recipes))
    }
};




/////////REDUCER/////////////
const intialState = {}