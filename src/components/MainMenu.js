import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <>
    <div className="main-menu-container">
      <div className="buttons-box">
        <Link to="/SinglePlayerGame" className="main-menu-buttons">
          <div className="main-menu-icons">
            <FontAwesomeIcon icon={faUser} />
            {" "}
            <FontAwesomeIcon icon={faRobot} />
          </div>
          <div className="main-menu-text">
            PLAY <span className="text-vs">VS</span> BOT
          </div>
        </Link>
        <Link to="/MultiPlayerGame" className="main-menu-buttons">
          <div className="main-menu-icons">
            <FontAwesomeIcon icon={faUser} />
            {" "}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="main-menu-text">
            PLAY <span className="text-vs">VS</span> FRIEND
          </div>
        </Link>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    </>
    
  );
}

export default MainMenu;
