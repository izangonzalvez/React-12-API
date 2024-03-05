import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  let navigate = useNavigate();
  let { authToken, setAuthToken } = useContext(UserContext);
  let userInfo = JSON.parse(localStorage.getItem("authToken"));

  return (
    <>
      <div>
        <ButtonGroup className="header-buttons">
          <Link to="/about" className="btn btn-outline-primary">About</Link>
          <Link to="/places" className="btn btn-outline-primary">Places</Link>
          <Link to="/" className="btn btn-outline-primary">Posts</Link>
          <Link to="/contact" className="btn btn-outline-primary">Contact</Link>
          <Link to="/mapAdria" className="btn btn-outline-primary">Mapa-Adrià</Link>
          <Link to="/mapIzan" className="btn btn-outline-primary">Mapa-IZAN</Link>
          <Button 
            onClick={() => {
              localStorage.removeItem("authToken");
              setAuthToken(null);
              navigate("/");
            }}
            variant="outline-danger"
            className="btn btn-outline-danger"
          >
            <FontAwesomeIcon icon={faUser} /> {userInfo.name}  <FontAwesomeIcon icon={faRightFromBracket} />
          </Button>
        </ButtonGroup>
        <div>
          Hola: <strong>{userInfo.name}</strong>
          <p>GEOMIR</p>
        </div>
      </div>
      <hr />
    </>
  );
}
