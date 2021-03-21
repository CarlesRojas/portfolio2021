import React, { useEffect, useRef, useState, useContext } from "react";
import classnames from "classnames";
import SVG from "react-inlinesvg";
import gsap from "gsap";

// Contexts
import { Utils } from "contexts/Utils";

// Icons
import LogoGradientIcon from "resources/logoGradient.svg";
import CloseIcon from "resources/icons/close.svg";
import MenuIcon from "resources/icons/menu.svg";

// Constants
const COLLAPSE_NAVBAR_WIDTH = 1100;

export default function Navbar() {
    // Contexts
    const { useForceUpdate } = useContext(Utils);

    // Force update
    const forceUpdate = useForceUpdate();

    // ###################################################
    //      MENU
    // ###################################################

    const [menuOpen, setMenuOpen] = useState(false);

    // ###################################################
    //      ACTIONS
    // ###################################################

    // CUrrently selected button
    const [selectedButton, setSelectedButton] = useState("web");

    // Blur button timeout
    const blurTimeout = useRef(null);

    // On any navbar button clicked
    const onButtonClicked = (event, buttonName) => {
        // Persist the event to get the target later
        event.persist();

        // Select the button
        setSelectedButton(buttonName);

        // Change Section
        window.PubSub.emit("onSectionChange", { sectionName: buttonName });

        // Unfocus the elemetn
        blurTimeout.current = setTimeout(() => {
            event.target.blur();
            openCloseMenu(false);
        }, 300);
    };

    // On the menu or close button clicked
    const onMenuButtonClick = () => {
        // Open menu
        openCloseMenu(!menuOpen);
    };

    // Open Menu
    const openCloseMenu = (open) => {
        // If the menu exists
        if (window.innerWidth < COLLAPSE_NAVBAR_WIDTH) {
            // Animage buttons when closing the menu
            if (open) {
                const timeline = gsap.timeline();
                timeline.fromTo(".buttonsContainer", { height: "0rem" }, { height: "12rem", duration: 0.1 });
                timeline.fromTo(".pageButton", { opacity: 0 }, { opacity: 1, duration: 0.1 }, "+=0.1");
            }

            // Animage buttons when opening the menu
            else {
                const timeline = gsap.timeline();
                timeline.fromTo(".pageButton", { opacity: 1 }, { opacity: 0, duration: 0.1 });
                timeline.fromTo(".buttonsContainer", { height: "12rem" }, { height: "0rem", duration: 0.1 }, "+=0.1");
            }
        }

        // Open or close the menu
        setMenuOpen(open);
    };

    // On window resize -> Render navbar again
    const onResize = () => {
        forceUpdate();
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);

            // Clear previous timeout
            if (blurTimeout.current) clearTimeout(blurTimeout.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //      RENDER
    // ###################################################

    const menuIcon = menuOpen ? CloseIcon : MenuIcon;
    const bigScreen = window.innerWidth >= COLLAPSE_NAVBAR_WIDTH;

    return (
        <header className="navbar glass black">
            <div className="nameContainer">
                <SVG className={classnames("icon", selectedButton)} src={LogoGradientIcon} />
                <p className="name">Carles Rojas</p>
                <SVG className={classnames("menuIcon")} src={menuIcon} onClick={onMenuButtonClick} />
            </div>

            <div className={classnames("buttonsContainer", { bigScreen })}>
                <button className={classnames("pageButton", "web", { selected: selectedButton === "web" }, { bigScreen })} onClick={(event) => onButtonClicked(event, "web")}>
                    Web Dev
                </button>
                <button className={classnames("pageButton", "game", { selected: selectedButton === "game" }, { bigScreen })} onClick={(event) => onButtonClicked(event, "game")}>
                    Game Dev
                </button>
                <button className={classnames("pageButton", "design", { selected: selectedButton === "design" }, { bigScreen })} onClick={(event) => onButtonClicked(event, "design")}>
                    Product Design
                </button>
            </div>
        </header>
    );
}
