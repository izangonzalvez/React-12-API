import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";

export default function PostsMenu() {
  const location = useLocation();

  // Función para determinar si el enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <>
    <h1>Posts</h1>
    <ButtonGroup>
      <Link to="/posts/add" className={`btn ${isActive('/posts/add') ? 'btn-primary' : 'btn-outline-primary'}`}>Add Post</Link>
      <Link to="/posts/grid" className={`btn ${isActive('/posts/grid') ? 'btn-primary' : 'btn-outline-primary'}`}>Grid</Link>
      <Link to="/posts/list" className={`btn ${isActive('/posts/list') ? 'btn-primary' : 'btn-outline-primary'}`}>Llista</Link>
    </ButtonGroup>
    </>
  );
}
