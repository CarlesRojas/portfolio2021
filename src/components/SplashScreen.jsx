import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

// Components
import Background from "components/Background";

// Icons
import WebDevTitle from "resources/titles/WebDev.svg";
import GameDevTitle from "resources/titles/GameDev.svg";
import ProductDesignTitle from "resources/titles/ProductDesign.svg";

export default function SplashScreen() {
    // Splash screen reference & state
    const splashScreenRef = useRef(null);
    const [splashScreenDiv, setSplashScreenDiv] = useState(null);

    // ###################################################
    //   TITLE LOGIC
    // ###################################################

    // Initial page
    const initialPage = window.location.pathname === "/web" || window.location.pathname === "/" ? "web" : window.location.pathname === "/game" ? "game" : "design";

    // Current section
    const section = useRef(initialPage);
    const newSectionScaleSet = useRef(false);

    // When the scale spring ends
    const onScaleSpringRest = () => {
        // Set the scale
        setScales({
            web: section.current === "web" ? 1 : 0,
            game: section.current === "game" ? 1 : 0,
            design: section.current === "design" ? 1 : 0,
        });
    };

    // Titles opacity springs
    const [scales, setScales] = useSpring(() => ({
        web: section.current === "web" ? 1 : 0,
        game: section.current === "game" ? 1 : 0,
        design: section.current === "design" ? 1 : 0,
    }));

    // Set te background gradient by one of its presets
    const onSectionChange = ({ sectionName }) => {
        if ((sectionName !== "web" && sectionName !== "game" && sectionName !== "design") || sectionName === section.current) return;

        newSectionScaleSet.current = false;
        section.current = sectionName;

        // Change pattern scales
        setScales({
            web: 0,
            game: 0,
            design: 0,
            onRest: onScaleSpringRest,
        });
    };

    // On splash screen ref change
    useEffect(() => {
        setSplashScreenDiv(splashScreenRef.current);
    }, [splashScreenRef]);

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Subscribe to events
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Unsubscribe from events and stop loop
        return () => {
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className="splashScreen" ref={splashScreenRef}>
            <div className="titleContainer">
                <animated.img src={WebDevTitle} alt="" className="title" style={{ scale: scales.web, opacity: scales.web }} />
            </div>
            <div className="titleContainer">
                <animated.img src={GameDevTitle} alt="" className="title" style={{ scale: scales.game, opacity: scales.game }} />
            </div>
            <div className="titleContainer">
                <animated.img src={ProductDesignTitle} alt="" className="title" style={{ scale: scales.design, opacity: scales.design }} />
            </div>

            <Background parent={splashScreenDiv} />
        </div>
    );
}
