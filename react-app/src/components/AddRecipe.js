import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewRecipeThunk } from "../store/recipes";
import Addingredients from "./Addingredients";

const AddRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "../static/images/recipe-defualt-photo.jpeg"
  );
  const [description, setDescription] = useState("");
  const [preparations, setPreparation] = useState("");
  const [cook_time, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const user = useSelector((state) => state.session.user);

  const recipe = useSelector((state) => state.recipes.singleRecipe);
  console.log("recipe", recipe);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("cook_time", cook_time);
    formData.append("servings", servings);

    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    // const res = await dispatch(createNewRecipeThunk(formData))
    //console.log('******res', res.body)
    const res = await fetch("/api/recipes/new", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const newRecipe = await res.json();
      //console.log("data", data)

      // if(data){
      //   setErrors(data)
      // }
      setImageLoading(false);
      //console.log('recipeId#####', newRecipe.id)
      history.push(`/recipes/${newRecipe.id}`);
    } else {
      const data = await res.json();
      //console.log("#####x", data)
      if(data){
           setErrors(data)
         }

      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
      return
    }
    
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const cancel = (e) =>{
    e.preventDefault()
    history.push(`/`)
  }

  return (
    <div>
      <form onSubmit={handelSubmit}>
      <div>
        {Object.values(errors).map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label> 
          Title
        <input
          className="create-recipe-form-inputs"
          type="Text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required

        />
        </label>
        </div>
        <div>
        <label> Add Image 
        <input type="file" accept="image/*" onChange={updateImage} required />
        </label>
        </div>
        <div>
        <label>
          Description
        <textarea
          className="create-recipe-form-inputs"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        </label>
        </div>
        <div>
        <label>
          Preparations
        <textarea
          className="create-recipe-form-inputs"
          type="text"
          value={preparations}
          onChange={(e) => setPreparation(e.target.value)}
          placeholder="Preperations"
          required
        />
        </label>
        </div>
        <div>
        <label>
          Servings
        <input
          className="create-recipe-form-inputs"
          type="number"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          placeholder="Servings"
          required
        />
        </label>
        </div>
        <div>
        <label>
          Time
        <input
          className="create-recipe-form-inputs"
          type="number"
          value={cook_time}
          onChange={(e) => setCookTime(e.target.value)}
          placeholder="Time"
          required
        />
        </label>
        </div>
        
        <div>
        <button type="submit">Save</button>
        <button onClick={cancel}>Cancel</button>
        </div>

        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default AddRecipe;
