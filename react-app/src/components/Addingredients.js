import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addIngredientToRecipeThunk,
  loadSingleRecipeThunk,
} from "../store/recipes";

const Addingredients = ({ singleRecipe, buttonClicked }) => {
  const [errors, setErrors] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [item_name, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [inputFields, setInputFields] = useState([
    { quantity: "", unit: "", item_name: "" },
  ]);
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const dispatch = useDispatch();
  const history = useHistory();

  //   console.log("recipe", recipe);
  //   const handelSubmit = (e) => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIngredient = {
      quantity,
      unit,
      item_name,
      recipe_id: singleRecipe.id,
    };
    const response = await dispatch(
      addIngredientToRecipeThunk(newIngredient, singleRecipe.id)
    );
    if (response) {
      setErrors(response);
    } else {
      setQuantity("");
      setUnit("");
      setItemName("");
    }
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newField = { quantity: "", unit: "", item_name: "" };
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
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
    return <button onClick={renderForm}>Add Ingredients</button>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <div>
                <label>
                  Quantity
                  <input
                    className="create-recipe-form-inputs"
                    name="quantity"
                    type="number"
                    value={input.quantity}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Quantity"
                    required={true}

                  />
                </label>
              </div>
              <div>
                <label>
                  Unit
                  <input
                    className="create-recipe-form-inputs"
                    name="unit"
                    type="Text"
                    value={input.unit}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Unit"
                    required={true}
                    />
                </label>
              </div>
              <div>
                <label>
                  Item Name
                  <input
                    className="create-recipe-form-inputs"
                    name="item_name"
                    type="Text"
                    value={input.item_name}
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Item Name"
                    required={true}

                  />
                </label>
              </div>
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
        <button onClick={addFields}>Add More..</button>
        <button type="submit" onClick={handleSubmit}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </form>
    );
  }
};

export default Addingredients;
