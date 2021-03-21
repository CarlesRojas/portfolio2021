import React, { useState, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Icons
import PlayIcon from "resources/icons/play.svg";

export default function Cursor() {
    // Mouse state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [play, setPlay] = useState(false);

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
    //      INTERACTIVE ITEMS
    // ###################################################

    // Update all interactive items
    const updateInteractiveItems = () => {
        // When the cursor hovers over certain elems -> Hover animation
        document.querySelectorAll(".hoverable").forEach((elem) => {
            elem.addEventListener("mouseover", () => setHovered(true));
            elem.addEventListener("mouseout", () => setHovered(false));
        });

        // When the cursor hovers over certain elems -> Play animation
        document.querySelectorAll(".playable").forEach((elem) => {
            elem.addEventListener("mouseover", () => setPlay(true));
            elem.addEventListener("mouseout", () => setPlay(false));
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
        };
    }, []);

    // ###################################################
    //      RENDER
    // ###################################################

    // When on mobile -> Do not use custom mouse
    if (isMobileOnly) return null;

    // Add classes to the cursor
    const cursorClasses = classnames("cursor", {
        clicked: clicked && !play,
        hidden: hidden,
        hovered: hovered && !play,
        iconActive: play,
    });

    return (
        <div className={cursorClasses} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <SVG className={classnames("icon", { playIcon: play })} src={PlayIcon} />
        </div>
    );
}
