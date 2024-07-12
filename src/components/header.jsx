import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import logo from '../assets/img/logo.png';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2a4e6d' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <img src={logo} style={{ width: '100px' }} alt="logo" />
          <button 
            className="btn"
            style={{
              color: '#ffffff',
              borderColor: '#ffffff',
              backgroundColor: 'transparent',
              transition: 'background-color 0.3s, color 0.3s',
            }} 
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.target.style.color = '#34b4b5';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#34b4b5';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#ffffff';
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
