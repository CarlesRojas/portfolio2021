import React, { useState, useEffect, useRef } from "react";
import { isMobileOnly } from "react-device-detect";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Icons
import PlayIcon from "resources/icons/play.svg";
import ScrollDownIcon from "resources/icons/scrollDown.svg";

export default function Cursor() {
    // Mouse state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [play, setPlay] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);
    const scrollDownInterval = useRef(null);

    // #######################################
    //      ACTIONS
    // #######################################

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

    // On scroll -> Cancel the scroll icon
    const onWheel = () => {
        if (scrollDownInterval.current) clearInterval(scrollDownInterval.current);
    };

    // #######################################
    //      INTERACTIVE ITEMS
    // #######################################

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

    // #######################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // #######################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseenter", onMouseEnter);
        window.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("wheel", onWheel);

        // Subscribe to update hoverable items
        window.PubSub.sub("updateInteractiveItems", updateInteractiveItems);

        // Update cursor interactible elements
        updateInteractiveItems();

        // Show the scroll icon
        /*
        scrollDownInterval.current = setInterval(() => {
            setScrollDown(true);
            setTimeout(() => setScrollDown(false), 2000);
        }, 8000);
        */

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseenter", onMouseEnter);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("wheel", onWheel);

            // Subscribe to update all interactive items
            window.PubSub.unsub("updateInteractiveItems", updateInteractiveItems);

            // Clear previous timeout
            if (scrollDownInterval.current) clearTimeout(scrollDownInterval.current);
        };
    }, []);

    // #######################################
    //      RENDER
    // #######################################

    // When on mobile -> Do not use custom mouse
    if (isMobileOnly) return null;

    // Add classes to the cursor
    const cursorClasses = classnames("cursor", {
        clicked: clicked && !play && !scrollDown,
        hidden: hidden,
        hovered: hovered && !play && !scrollDown,
        iconActive: play || scrollDown,
    });

    const icon = play ? PlayIcon : ScrollDownIcon;

    return (
        <div className={cursorClasses} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <SVG className={classnames("icon", { playIcon: play })} src={icon} />
        </div>
    );
}
