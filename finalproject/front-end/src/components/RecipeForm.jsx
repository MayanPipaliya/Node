import React, { useState } from 'react';
import { recipes } from '../api';
import { useNavigate } from 'react-router-dom';

export default function RecipeForm({ user }) {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [ingredients,setIngredients]=useState('');
  const [instructions,setInstructions]=useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await recipes.create({ title, description, ingredients, instructions });
      nav('/recipes/my');
    } catch (e) {
      console.error(e);
      alert(e.error || 'Failed');
    }
  }

  return (
    <div className="card">
      <h2>Submit a Recipe</h2>
      <form onSubmit={submit}>
        <div className="form-row"><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/></div>
        <div className="form-row"><textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} /></div>
        <div className="form-row"><input placeholder="Ingredients (comma separated)" value={ingredients} onChange={e=>setIngredients(e.target.value)} /></div>
        <div className="form-row"><textarea placeholder="Instructions" value={instructions} onChange={e=>setInstructions(e.target.value)} /></div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
