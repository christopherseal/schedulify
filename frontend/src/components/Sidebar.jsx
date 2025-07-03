import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Create this for styles

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>Schedulify</h2>
      <ul>
        <li className={location.pathname === "/index" ? "active" : ""}>
          <Link to="/index">🗓️ Schedule</Link>
        </li>
        <li className={location.pathname === "/trades" ? "active" : ""}>
          <Link to="/trades">🔁 Pending Trades</Link>
        </li>
        <li className={location.pathname === "/account" ? "active" : ""}>
          <Link to="/account">⚙️ Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
