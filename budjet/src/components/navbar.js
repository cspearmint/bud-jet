import React from 'react';
import './navbar.css';
import avatar from '../images/piggyBank.png';
import { signout } from './utils/Icons';
import { menuItems } from './utils/menuItems';

function Navigation({ active, setActive }) {
    return (
        <nav className="nav-container">
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Mike</h2>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
            <div className="bottom-nav">

            </div>
        </nav>
    );
}

export default Navigation;
