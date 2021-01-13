import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {GrMenu} from 'react-icons/gr';
import {VscChromeClose} from 'react-icons/vsc';

import {NavData} from './NavData'

import './Nav.css';


function Nav() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      setSidebarToggle(false);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
            <Link to="#" className="nav-menu-ico" onClick={() => {setSidebarToggle(!sidebarToggle)}}>
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
      <div className={sidebarToggle ? 'sidebar active' : 'sidebar'}>
        <ul className="sidebar-list">
          <li className="sidebar-close">
            <Link to="#" className="sidebar-close-ico" onClick={() => {setSidebarToggle(!sidebarToggle)}}>
              <VscChromeClose />
            </Link>
          </li>
          {NavData.map((item, idx) => {
            return (
              <li className='sidebar-item'>
                <Link to={item.path} className='sidebar-text' onClick={() => setSidebarToggle(false)}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default Nav;