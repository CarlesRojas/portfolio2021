import React, { useEffect, useRef, useState, useCallback } from "react";
import SVG from "react-inlinesvg";
import classnames from "classnames";

// Icons
import LogoIcon from "resources/logo.svg";

export default function Navbar() {
    // #######################################
    //      ACTIONS
    // #######################################

    // CUrrently selected button
    const [selectedButton, setSelectedButton] = useState("design");

    // Blur button timeout
    const blurTimeout = useRef(null);

    // On any navbar button clicked
    const onButtonClicked = (event, buttonName) => {
        // Persist the event to get the target later
        event.persist();

        // Select the button
        setSelectedButton(buttonName);

        // Unfocus the elemetn
        blurTimeout.current = setTimeout(() => {
            event.target.blur();
        }, 300);
        console.log(event.target);
    };

    // #######################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // #######################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        return () => {
            // Clear previous timeout
            if (blurTimeout.current) clearTimeout(blurTimeout.current);
        };
    }, []);

    // #######################################
    //      RENDER
    // #######################################

    return (
        <header className="navbar">
            <SVG className="icon" src={LogoIcon} />
            <p className="name">Carles Rojas</p>
            <div className="buttonsContainer">
                <button className={classnames("pageButton", "design", { selected: selectedButton === "design" })} onClick={(event) => onButtonClicked(event, "design")}>
                    Product Design
                </button>
                <button className={classnames("pageButton", "game", { selected: selectedButton === "game" })} onClick={(event) => onButtonClicked(event, "game")}>
                    Game Dev
                </button>
                <button className={classnames("pageButton", "web", { selected: selectedButton === "web" })} onClick={(event) => onButtonClicked(event, "web")}>
                    Web Dev
                </button>
            </div>
        </header>
    );
}
