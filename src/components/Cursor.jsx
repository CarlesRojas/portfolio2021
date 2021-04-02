import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Icons
import PlayIcon from "resources/icons/play.svg";
import PauseIcon from "resources/icons/pause.svg";
import CloseIcon from "resources/icons/close2.svg";

export default function Cursor() {
    // Mouse state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hidden, setHidden] = useState(false);

    // ###################################################
    //      ACTIONS
    // ###################################################

    // When the mouse moves -> Update its position
    const onMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };

    // When the mouse is clicked -> Set clicked to true
    const onMouseDown = () => {
        setClicked(true);
    };

    // When the mouse is released -> Set clicked to false
    const onMouseUp = () => {
        setClicked(false);
    };

    // When the mouse leaves the viewport -> Set hidden to true
    const onMouseLeave = () => {
        setHidden(true);
    };

    // When the mouse enters the viewport -> Set hidden to false
    const onMouseEnter = () => {
        setHidden(false);
    };

    // ###################################################
    //      SHOW ICON
    // ###################################################

    // State: "play", "pause", "close", "none"
    const [iconState, setIconState] = useState("none");

    // On set cursor icon
    const onSetCursorIcon = ({ type }) => {
        setIconState(type);
    };

    // ###################################################
    //      INTERACTIVE ITEMS
    // ###################################################

    // Update all interactive items
    const updateInteractiveItems = () => {
        // When the cursor hovers over certain elems -> Hover animation
        document.querySelectorAll(".hoverable").forEach((elem) => {
            elem.addEventListener("mouseover", () => setHovered(true));
            elem.addEventListener("mouseout", () => setHovered(false));
        });
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseenter", onMouseEnter);
        window.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Subscribe to update hoverable items
        window.PubSub.sub("updateInteractiveItems", updateInteractiveItems);
        window.PubSub.sub("setCursorIcon", onSetCursorIcon);

        // Update cursor interactible elements
        updateInteractiveItems();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseenter", onMouseEnter);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);

            // Subscribe to update all interactive items
            window.PubSub.unsub("updateInteractiveItems", updateInteractiveItems);
            window.PubSub.unsub("setCursorIcon", onSetCursorIcon);
        };
    }, []);

    // ###################################################
    //      RENDER
    // ###################################################

    // When on mobile -> Do not use custom mouse
    if (isMobile) return null;

    // Add classes to the cursor
    const cursorClasses = classnames("cursor", {
        clicked: clicked && iconState === "none",
        hidden: hidden,
        hovered: hovered && iconState === "none",
        iconActive: iconState !== "none",
    });

    // Get the icon
    const icon = iconState === "none" ? null : iconState === "play" ? PlayIcon : iconState === "pause" ? PauseIcon : CloseIcon;

    return (
        <div className={cursorClasses} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <SVG className={classnames("icon", iconState)} src={icon} />
        </div>
    );
}
