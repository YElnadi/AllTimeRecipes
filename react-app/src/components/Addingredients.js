import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { addIngredientToRecipeThunk, loadSingleRecipeThunk } from "../store/recipes";


const Addingredients = ({singleRecipe,buttonClicked}) => {
  const [errors, setErrors] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [item_name, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const dispatch = useDispatch();
  const history = useHistory();


   //const singleRecipe = useSelector((state) => state.recipes.singleRecipe);
//   console.log("recipe", recipe);
//   const handelSubmit = (e) => {};
const handelSubmit = async (e) =>{
    e.preventDefault();
    const newIngredient = {
        quantity,
        unit,
        item_name,
        recipe_id: singleRecipe.id
    }
    const response = await dispatch(addIngredientToRecipeThunk(newIngredient,singleRecipe.id))
    if (response){
        setErrors(response)
    }else{
        setQuantity("");
        setUnit("")
        setItemName("")
    }
};

const renderForm = (e) => {
    e.preventDefault();
    setButtonOn(true);
  };

  const cancel = async (e) => {
    e.preventDefault();
    setButtonOn(false);
  };

if (!buttonOn) {
    return (
      <button
        onClick={renderForm}>
        Add Ingredients
      </button>
    );
  } else {


  return (
    <div>
      <form onSubmit={handelSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <div>
          <label>
            Quantity
            <input
              className="create-recipe-form-inputs"
              type="Text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Unit
            <input
              className="create-recipe-form-inputs"
              type="Text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit"
            />
          </label>
        </div>
        <div>
          <label>
            Item Name
            <input
              className="create-recipe-form-inputs"
              type="Text"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Item Name"
              required
            />
          </label>
        </div>
        <button type="submit">Save</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
};
}

export default Addingredients;
