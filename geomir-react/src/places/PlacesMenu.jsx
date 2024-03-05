import { Link } from "react-router-dom";
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function PlacesMenu() {
    return (
    <ButtonGroup>
        <Link to="/places/add" className="btn btn-outline-primary">Afegir Place</Link>
        <Link to="/places/grid" className="btn btn-outline-primary">Grid</Link>
        <Link to="/places/list" className="btn btn-outline-primary">Lista</Link>
    </ButtonGroup>
  );}