import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeThunk } from "../store/recipes";

const AddRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState("https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png");
  const [description, setDescription] = useState('');
  const [preperations, setPreparation] = useState('');
  const [cook_time, setCookTime] = useState('');
  const [servings, setServings]=useState('');
  const [imageLoading, setImageLoading] = useState(false);

  const recipe = useSelector(state=>state.recipes.singleRecipe)
  console.log("recipeid", recipe)

  const handelSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData()
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("preperations", preperations);
    formData.append("cook_time", cook_time);
    formData.append("servings", servings);


    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push(`/`);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
    console.log(formData);
    return dispatch(createRecipeThunk(formData))
    .then(recipe =>{
      const {id} = recipe;
      history.push(`/recipes/${id}`)
    })

  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
   };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
        className="create-recipe-form-inputs"
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder = "Title"
        required
        />
        <input type="file" accept="image/*" onChange={updateImage}/>
        <input
        className="create-recipe-form-inputs"
        type="textarea"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        placeholder = "Description"
        required
        />
        <input
        className="create-recipe-form-inputs"
        type="textarea"
        value={preperations}
        onChange={(e)=>setPreparation(e.target.value)}
        placeholder = "Preperations"
        required
        />
        <input
        className="create-recipe-form-inputs"
        type="integer"
        value={servings}
        onChange={(e)=>setServings(e.target.value)}
        placeholder = "Servings"
        required
        />
        <input
        className="create-recipe-form-inputs"
        type="integer"
        value={cook_time}
        onChange={(e)=>setCookTime(e.target.value)}
        placeholder = "Time"
        required
        />
        <button type="submit">Save</button>
        {imageLoading && <p>Loading...</p>}

      </form>
    </div>
  );
}

export default AddRecipe;
