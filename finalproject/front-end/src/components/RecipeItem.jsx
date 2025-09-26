import React, { useEffect, useState } from 'react';
import { recipes } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecipeItem({ user }){
  const { id } = useParams();
  const [recipe,setRecipe]=useState(null);
  const [comment,setComment]=useState('');
  const nav = useNavigate();

  useEffect(()=> {
    recipes.get(id).then(r => setRecipe(r.recipe)).catch(e => console.error(e));
  }, [id]);

  async function submitComment(e){
    e.preventDefault();
    try {
      await recipes.comment(id, { text: comment });
      const r = await recipes.get(id);
      setRecipe(r.recipe);
      setComment('');
    } catch (e) {
      console.error(e);
      if (e.error === 'Unauthorized') nav('/login');
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this recipe?')) return;
    try {
      await recipes.remove(id);
      nav('/');
    } catch (e) {
      console.error(e);
      alert(e.error || 'Could not delete');
    }
  }

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p style={{color:'#666'}}>by {recipe.author?.username} • {new Date(recipe.createdAt).toDateString()}</p>
      <div className="card">
        <h4>Ingredients</h4>
        <ul>{recipe.ingredients.map((it,i)=><li key={i}>{it}</li>)}</ul>
        <h4>Instructions</h4>
        <p>{recipe.instructions}</p>
      </div>

      <section style={{marginTop:12}}>
        <h4>Comments</h4>
        {recipe.comments.map(c => (
          <div key={c._id} style={{padding:'8px 0', borderBottom:'1px dashed #eee'}}>
            <strong>{c.author?.username}</strong> — {c.text}
          </div>
        ))}

        {user ? (
          <form onSubmit={submitComment}>
            <textarea required value={comment} onChange={e=>setComment(e.target.value)} />
            <button type="submit">Add comment</button>
          </form>
        ) : <p><a href="/login">Login</a> to comment.</p>}
      </section>

      {user && user.role === 'admin' || (user && user.username === recipe.author?.username) ? (
        <div style={{marginTop:12}}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}
