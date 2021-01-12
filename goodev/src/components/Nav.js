import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {GrMenu} from 'react-icons/gr';

import {NavData} from './NavData'

import './Nav.css';


function Nav() {
  const [menuBarToggle, setMenuBarToggle] = useState(false);

  return (
    <>
      <Link to="/"  className="nav-logo">
        <span className="logo-name">
          <span className="logo-name-kr">김선관</span>
          <span className="logo-name-en">KIM SUNKWAN</span>
        </span>
      </Link>
      <nav>
        <ul className="nav-list">
          <li className="nav-menu-bar">
            <Link to="#" className="nav-menu-ico">
              <GrMenu />
            </Link>
          </li>
          {NavData.map((item, idx) => {
            return (
              <li>
                <Link to={item.path} className={item.cName}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  );
}

export default Nav;