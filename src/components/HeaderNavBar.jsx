import React from "react";
import "../css/headerNavBar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons";
function HeaderNavBar() {
  // for mobile devices
  const menu = (
    <Dropdown className="dropdown-container">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <IconContext.Provider value={{ size: "3rem", color: "black" }}>
          <div className="menuIcon">
            <AiOutlineMenu />
          </div>
        </IconContext.Provider>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/">All</Dropdown.Item>
        <Dropdown.Item href="/archived">Archived</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <nav className="nav">
        <a className="nav-a" href="/">
          All
        </a>
        <a className="nav-a" href="/archived">
          Archived
        </a>
        <div className="animation"></div>
      </nav>
      {menu}
    </>
  );
}

export default HeaderNavBar;
