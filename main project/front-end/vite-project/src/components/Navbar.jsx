import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="nav">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div className="brand">🍳 RecipeShare</div>
        <nav>
          <Link to="/">All Recipes</Link> {' | '}
          {user ? (
            <>
              <Link to="/recipes/my">My Recipes</Link> {' | '}
              <Link to="/recipes/new">Submit</Link> {' | '}
              <button onClick={onLogout} style={{marginLeft:8}}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> {' | '}
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
