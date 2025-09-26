import React, { useEffect, useState } from 'react';
import { recipes } from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function MyRecipes(){
  const [list,setList]=useState([]);
  const nav = useNavigate();
  useEffect(()=> {
    recipes.myList().then(r => setList(r.recipes)).catch(e => {
      console.error(e); if (e.error==='Unauthorized') nav('/login');
    });
  }, []);
  return (
    <div>
      <h2>My Recipes</h2>
      {list.length === 0 && <p>No recipes yet. <Link to="/recipes/new">Add one</Link></p>}
      <ul>
        {list.map(r => <li key={r._id}><Link to={`/recipes/${r._id}`}>{r.title}</Link></li>)}
      </ul>
    </div>
  );
}
