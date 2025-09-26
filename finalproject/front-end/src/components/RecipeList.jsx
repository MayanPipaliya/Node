import React, { useEffect, useState } from 'react';
import { recipes } from '../api';
import { Link } from 'react-router-dom';

export default function RecipeList(){
  const [list,setList]=useState([]);
  useEffect(()=> {
    recipes.list().then(r => setList(r.recipes)).catch(e=>console.error(e));
  }, []);
  return (
    <div>
      <h1>All Recipes</h1>
      <div className="recipes-grid">
        {list.map(r => (
          <div key={r._id} className="card">
            <h3><Link to={`/recipes/${r._id}`}>{r.title}</Link></h3>
            <p style={{color:'#666'}}>by {r.author?.username || 'unknown'}</p>
            <p>{r.description?.slice(0,120)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
