const LOAD_RECIPES = "recipes/LOAD_ALL_RECIPES";
const LOAD_SINGLE_RECIPE = "recipe/LOAD_SINGLE_RECIPE";
const CREATE_RECIPE = "recipe/CREATE_RECIPE";
const DELETE_RECIPE = "recipe/DELETE_RECIPE";
const EDIT_RECIPE = "recipe/EDIT_RECIPE"
const ADD_INGREDIENTS_TO_RECIPE = "recipe/ADD_INGREDIENTS"



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

const deleteRecipe = (recipeId) =>({
    type:DELETE_RECIPE,
    recipeId
})

const editRecipe = (data) =>({
    type:EDIT_RECIPE,
    data
})


const addIngredientToRecipe = (recipe) =>({
    type:ADD_INGREDIENTS_TO_RECIPE,
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
    const response = await fetch(`/api/recipes`, {
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


export const createNewRecipeThunk = (formData) => async (dispatch) => {
    const res = await fetch(`/api/recipes`, {
        method:"POST",
        body: formData,
    });
    if (res.ok){
        const data = await res.json();
        await dispatch(createRecipe(data))
    }
    return res
}

export const deleteRecipeThunk = (recipeId) => async (dispatch) =>{
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method:"DELETE",
    });
    if(response.ok){
        dispatch(deleteRecipe(recipeId));
        return response;
    }
};

export const editRecipeThunk = (recipe) => async(dispatch) =>{
    const response = await fetch(`/api/recipes/${recipe.id}`, {
        method:"PUT",
        headers:{
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(recipe),
    })
    if (response.ok) {
        const updatedRecipe = await response.json()
        dispatch(editRecipe( updatedRecipe ));
        return updatedRecipe;
      }
}

export const addIngredientToRecipeThunk = (newIngredient, recipeId) =>async(dispatch) =>{
    const response = await fetch(`/api/recipes/${recipeId}/add-ingredients`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(newIngredient),
    })
    if (response.ok){
        const recipe = await response.json()
        dispatch(addIngredientToRecipe(recipe))
        return null
    } else if(response.status<500){
        const data = await response.json();
        if(data.errors){
            return data.errors;
        }
        else{
            return ['An error occurred. Please try again.']
        }
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
        case DELETE_RECIPE:{
            const newState={
                allRecipes:{...state.allRecipes},
                singleRecipe:{},
            };
            delete newState.allRecipes[action.recipeId];
            return newState
        }
        case EDIT_RECIPE:{
            const newState = {
                allRecipes:{...state.allRecipes},
                singleRecipe:{...state.singleRecipe}
            };
            newState.allRecipes[action.data.id] = action.data;
            newState.singleRecipe=action.data;
            return newState;
        }
        case ADD_INGREDIENTS_TO_RECIPE:{
            const newState = {
                allRecipes:{...state.allRecipes},
                singleRecipe:action.recipe,
            }
            newState.allRecipes[action.recipe.id]=action.recipe
            return newState
            
        }
            
        default:
            return state;
    }
}