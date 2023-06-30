import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick =() =>{
    logout()
  }
   return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Athlete Fit</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {!user &&(
            <li className="navbar-item">
              <Link to="/login-register" className="nav-link">LoginRegister</Link>
            </li>
          )}
          {user && (
            <div>
              <span>{user.email}</span>
              <button type="button" class="btn btn-dark" onClick={handleClick}>Log out</button>
            </div>
          )}


        </ul>
        </div>
      </nav>
    );
}
export default Navbar