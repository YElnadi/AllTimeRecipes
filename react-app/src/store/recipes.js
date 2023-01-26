const LOAD_RECIPES = "recipes/LOAD_ALL_RECIPES";
const LOAD_SINGLE_RECIPE = "recipe/LOAD_SINGLE_RECIPE";
const CREATE_RECIPE = "recipe/CREATE_RECIPE";



//////////ACTIONS CREATORS /////////////
const loadRecipes = (recipes) =>({
    type:LOAD_RECIPES,
    recipes
});

const loadSingleRecipe = (recipe) =>({
    type: LOAD_SINGLE_RECIPE,
    recipe
})

const createRecipe = (recipe) =>({
    type:CREATE_RECIPE,
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


export const createRecipeThunk = (newRecipe) => async (dispatch) =>{
    for (const pair of newRecipe.entries()) {
        console.log(`+++++ ${pair[0]}, ${pair[1]}`);
      }
      console.log("+++++ ", JSON.stringify(Object.fromEntries(newRecipe)))
  
    const response = await fetch(`/api/recipes/new-recipe`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(newRecipe)),
    });
    if(response.ok){
        const newRecipe = await response.json();
        dispatch(createRecipe(newRecipe));
        return newRecipe
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
        case CREATE_RECIPE:{
            const newState ={
                ...state,
                allRecipes:{...state.allRecipes},
                singleRecipe:action.recipe,
            }
            newState.allRecipes[action.recipe.id]=action.recipe;
            newState.singleRecipe=action.recipe;
            return newState
        }
            
        default:
            return state;
    }
}