import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

//https://stackoverflow.com/questions/69893108/react-router-dom-route-and-router-not-working-at-all
//A few changes to link have been made.

function MenuBar() {
    
    const [activeItem, setActiveItem] = useState("");

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu pointing secondary>
        <Menu.Item  
        name = "home"
        active = {activeItem === "home"}
        onClick = {handleItemClick}
        as={Link}
        to="/"
        />

    <Menu.Menu position="right">
        <Menu.Item
        name = "login"
        active = {activeItem === "login"}
        onClick={handleItemClick}
        as={Link}
        to="/login"
        />
        <Menu.Item
        name="register"
        active={activeItem === "register"}
        onClick={handleItemClick}
        as={Link}
        to="/register"
        />
    </Menu.Menu>
    </Menu>
)
}

export default MenuBar;