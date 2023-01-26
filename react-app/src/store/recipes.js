const LOAD_RECIPES = "recipes/LOAD_ALL_RECIPES";
const LOAD_SINGLE_RECIPE = "recipe/LOAD_SINGLE_RECIPE";



//////////ACTIONS CREATORS /////////////
const loadRecipes = (recipes) =>({
    type:LOAD_RECIPES,
    recipes
});

const loadSingleRecipe = (recipe) =>({
    type: LOAD_SINGLE_RECIPE,
    recipe
})






/////////THUNK ////////////
export const loadRecipesThunk = () => async (dispatch) =>{
    const response = await fetch ("/api/recipes/");
    if (response.ok){
        const data = await response.json();
        await dispatch (loadRecipes(data.recipes))
    }
};


export const loadSingleRecipeThunk = (recipeId) => async (dispatch) =>{
    const response = await fetch(`/api/recipes/${recipeId}`);
    if(response.ok){
        const data = await response.json();
        dispatch(loadSingleRecipe(data));
        return data
    }
}




/////////REDUCER/////////////
const initialState = {allRecipes:{}, singleRecipe:{}}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case LOAD_RECIPES:{
            const newState = {
                allRecipes:{},
                singleRecipe:{...state.singleRecipe}
            };
            action.recipes.forEach(recipe => {
                newState.allRecipes[recipe.id]=recipe
            });
            return newState
        }
        case LOAD_SINGLE_RECIPE:{
            const newState ={
                allRecipes:{...state.allRecipes},
                singleRecipe:action.recipe
            };
            return newState;
        }
            
        default:
            return state;
    }
}