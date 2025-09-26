import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecipeList from './components/RecipeList';
import MyRecipes from './components/MyRecipes';
import RecipeForm from './components/RecipeForm';
import RecipeItem from './components/RecipeItem';
import { auth } from './api';

function App(){
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // try to get current user by hitting an endpoint that uses cookie (we didn't implement a 'me' endpoint,
  // but attachUser middleware sets req.user for each request. We'll rely on 401 checks for actions).
  // For simplicity, after login/register we set user in components.

  async function handleLogout(){
    try {
      await auth.logout();
      setUser(null);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<RecipeList user={user} />} />
          <Route path="/login" element={<Login onLogin={u => setUser(u)} />} />
          <Route path="/register" element={<Register onRegister={u => setUser(u)} />} />
          <Route path="/recipes/new" element={<RecipeForm user={user} />} />
          <Route path="/recipes/my" element={<MyRecipes user={user} />} />
          <Route path="/recipes/:id" element={<RecipeItem user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
