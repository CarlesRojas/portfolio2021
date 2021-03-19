import React, { useRef, useEffect, useState, useContext, memo } from "react";
import { useSpring } from "react-spring";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Icons
import DesignPattern from "resources/patterns/designPattern.svg";
import WebPattern from "resources/patterns/electronicPattern.svg";
import GamePattern from "resources/patterns/gamingPattern.svg";

// Contexts
import { Utils } from "contexts/Utils";
import { Data } from "contexts/Data";
import { isMobileOnly } from "react-device-detect";

// Constants
const COLLAPSE_NAVBAR_WIDTH = 1100;
const MAX_FPS = 120;
const FPS = 60;
const DECELERATION = 10;
const GRADIENTS = {
    web: ["#2192bf", "#02f8ab"],
    game: ["#f46b6b", "#f4a658"],
    design: ["#733FFF", "#FAB4D6"], //["#1f6a1f", "#f8ff61"],
};
const PATTERNS = {
    web: { svg: WebPattern, tileSize: 300, tileSizeMobile: 200 },
    game: { svg: GamePattern, tileSize: 300, tileSizeMobile: 200 },
    design: { svg: DesignPattern, tileSize: 300, tileSizeMobile: 200 },
};

const Background = memo(({ parent }) => {
    // Contexts
    const { useForceUpdate, invlerp } = useContext(Utils);
    const { positionRef, speedRef, motion, prevMotion } = useContext(Data);

    // Force update
    const forceUpdate = useForceUpdate();

    // Save parent in a ref
    const parentRef = useRef(parent);
    useEffect(() => {
        parentRef.current = parent;
    }, [parent]);

    // #################################################
    //   BACKGROUND LOGIC
    // #################################################

    // Current background & pattern
    const currGradient = useRef("web");
    const [currPattern, setCurrPattern] = useState("web");

    // Spring
    const [{ background }, setGradient] = useSpring(() => ({
        background: `linear-gradient(60deg, ${GRADIENTS[currGradient.current][0]} 0%, ${GRADIENTS[currGradient.current][1]} 100%)`,
        config: { friction: 40 },
    }));

    // Opacity springs
    const [opacities, setOpacities] = useSpring(() => ({
        opacityWeb: 1,
        opacityGame: 0,
        opacityDesign: 0,
    }));

    // Set te background gradient by one of its presets
    const onSectionChange = ({ sectionName }) => {
        if (!(sectionName in GRADIENTS) || !(sectionName in PATTERNS)) return;

        // Set the background gradient
        setGradient({ background: `linear-gradient(60deg, ${GRADIENTS[sectionName][0]} 0%, ${GRADIENTS[sectionName][1]} 100%)` });
        currGradient.current = sectionName;

        // Set the background pattern
        setCurrPattern(sectionName);

        // Change pattern opacities
        setOpacities({
            opacityWeb: sectionName === "web" ? 1 : 0,
            opacityGame: sectionName === "game" ? 1 : 0,
            opacityDesign: sectionName === "design" ? 1 : 0,
        });
    };

    // #################################################
    //   RESIZE LOGIC
    // #################################################

    // Resize timeout
    const resizeTimeout = useRef(null);

    const onResize = () => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

        resizeTimeout.current = setTimeout(forceUpdate, 500);
    };

    // #################################################
    //   ACCELEROMETER TILT
    // #################################################

    // Current position
    const [prevGradient, setPrevGradient] = useState(background.get());

    // Current position
    const [position, setPosition] = useState(positionRef.current);

    // Current speed
    const [{ speed }, setSpeed] = useSpring(() => ({ speed: speedRef.current }));

    // Handle device orientation change
    const onDeviceMotion = ({ rotationRate }) => {
        const { alpha, beta } = rotationRate;

        // New motion
        var newMotion = {
            alpha: motion.current.alpha,
            beta: motion.current.beta,
        };

        // Update alpha
        if (Math.abs(alpha) > 20) {
            newMotion.alpha =
                (Math.sign(motion.current.alpha) === Math.sign(alpha) || motion.current.alpha === 0) && Math.abs(motion.current.alpha) > Math.abs(alpha) ? motion.current.alpha : alpha;
        }

        if (Math.abs(beta) > 20) {
            newMotion.beta = (Math.sign(motion.current.beta) === Math.sign(beta) || motion.current.beta === 0) && Math.abs(motion.current.beta) > Math.abs(beta) ? motion.current.beta : beta;
        }

        motion.current = newMotion;
    };

    // Handle mouse move change
    const onMouseMove = (event) => {
        // Return while not in production
        //if (process.env.REACT_APP_DEBUGG === "true" && process.env.NODE_ENV !== "production") return;

        // Return if the parent is not defined
        if (!parentRef.current) return;

        // Clamp to parent dimensions
        const parentDimensions = parentRef.current.getBoundingClientRect();
        const parentWidth = parentDimensions.width + parentDimensions.x;
        const parentHeight = parentDimensions.height + parentDimensions.y;

        // Get mouse position
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Return if mose is outside the splashscreen div
        if (mouseX < 0 || mouseX > parentWidth || mouseY < 0 || mouseY > parentHeight) return;

        // Normalize position [-1, 1]
        const normX = invlerp(0, parentWidth, mouseX) * 2 - 1;
        const normY = invlerp(0, parentHeight, mouseY) * 2 - 1;

        // Set the motion
        motion.current = {
            alpha: normY * 100,
            beta: normX * 100,
        };
    };

    // #################################################
    //   LOOP
    // #################################################

    const frameID = useRef(0);
    const frameCount = useRef(0);
    const lastFrameTime = useRef(Date.now());

    // Update actions
    const update = (deltaTime) => {
        // Frame deceleration
        const frameDesceleration = DECELERATION * deltaTime;

        // New speed same as old
        var newSpeed = { x: speed.get().x, y: speed.get().y };

        // Update x speed
        if (prevMotion.current.beta !== motion.current.beta) newSpeed.x = motion.current.beta;
        else if (newSpeed.x !== 0) newSpeed.x = newSpeed.x > 0 ? Math.max(newSpeed.x - frameDesceleration, 0) : Math.min(newSpeed.x + frameDesceleration, 0);

        // Update y speed
        if (prevMotion.current.alpha !== motion.current.alpha) newSpeed.y = motion.current.alpha;
        else if (newSpeed.y !== 0) newSpeed.y = newSpeed.y > 0 ? Math.max(newSpeed.y - frameDesceleration, 0) : Math.min(newSpeed.y + frameDesceleration, 0);

        // Set speed and save current motion
        if (prevMotion.current.beta !== motion.current.beta || prevMotion.current.alpha !== motion.current.alpha) prevMotion.current = motion.current;

        // Update speed
        if (newSpeed.x !== speedRef.current.x || newSpeed.y !== speedRef.current.y) {
            setSpeed({ speed: newSpeed });
            speedRef.current = newSpeed;
        }

        // Get te new position
        var newPosition = {
            x: positionRef.current.x + speed.get().x * deltaTime,
            y: positionRef.current.y + speed.get().y * deltaTime,
        };

        // Update position
        if (newPosition.x !== positionRef.current.x || newPosition.y !== positionRef.current.y) {
            setPosition(newPosition);
            positionRef.current = newPosition;
        }

        // Update Gradient
        if (prevGradient !== background.get()) setPrevGradient(background.get());
    };

    // Called every frame
    const loop = () => {
        frameCount.current++;

        if (frameCount.current >= Math.round(MAX_FPS / FPS)) {
            // Get delta time
            var currentTime = Date.now();
            var deltaTime = (currentTime - lastFrameTime.current) / 1000;
            lastFrameTime.current = currentTime;

            // Update
            update(deltaTime);
            frameCount.current = 0;
        }
        frameID.current = window.requestAnimationFrame(loop);
    };

    // #######################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // #######################################

    // On componente mount
    useEffect(() => {
        // Subscribe to events
        window.addEventListener("resize", onResize);
        if (isMobileOnly) window.addEventListener("devicemotion", onDeviceMotion, true);
        else window.addEventListener("mousemove", onMouseMove, true);
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Start loop
        loop();

        // Unsubscribe from events and stop loop
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("devicemotion", onDeviceMotion, true);
            window.removeEventListener("mousemove", onMouseMove, true);
            window.PubSub.unsub("onSectionChange", onSectionChange);

            // Cancel animation
            if (frameID.current) window.cancelAnimationFrame(frameID.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // #################################################
    //   RENDER
    // #################################################

    // No tiles if the parent is null
    if (!parent) {
        var webTiles = [];
        var gameTiles = [];
        var designTiles = [];
    }

    // Tiles to cover only the parent
    else {
        // Constants
        const PARENT_DIMENSIONS = parent.getBoundingClientRect();
        const SCREEN_WIDTH = PARENT_DIMENSIONS.width;
        const SCREEN_HEIGHT = PARENT_DIMENSIONS.height;
        const TILE_SIZE = PATTERNS[currPattern].tileSizeMobile;
        const NUM_TILES = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE) + 2, y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE) + 2 };
        const TILE_SIZE_DESKTOP = PATTERNS[currPattern].tileSize;
        const NUM_TILES_DESKTOP = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE_DESKTOP) + 2, y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE_DESKTOP) + 2 };
        const isMobile = window.innerWidth < COLLAPSE_NAVBAR_WIDTH;

        // Tile matrix
        var numTiles = isMobile ? NUM_TILES : NUM_TILES_DESKTOP;
        var tileSize = isMobile ? TILE_SIZE : TILE_SIZE_DESKTOP;

        webTiles = [];
        gameTiles = [];
        designTiles = [];
        var xSize = numTiles.x * tileSize;
        var ySize = numTiles.y * tileSize;
        for (let i = 0; i < numTiles.x; i++) {
            for (let j = 0; j < numTiles.y; j++) {
                // Get X position
                var displX = position.x + i * tileSize;
                if (displX > 0) var xPos = (displX % xSize) - tileSize;
                else xPos = tileSize * (numTiles.x - 1) - (Math.abs(displX) % xSize);

                // Get Y position
                var displY = position.y + j * tileSize;
                if (displY > 0) var yPos = (displY % ySize) - tileSize;
                else yPos = tileSize * (numTiles.y - 1) - (Math.abs(displY) % ySize);

                webTiles.push(<SVG key={`${i - 1}-${j - 1}`} className="cell web" src={PATTERNS["web"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />);

                gameTiles.push(<SVG key={`${i - 1}-${j - 1}`} className="cell game" src={PATTERNS["game"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />);

                designTiles.push(
                    <SVG key={`${i - 1}-${j - 1}`} className="cell design" src={PATTERNS["design"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />
                );
            }
        }
    }

    return (
        <div className="background" style={{ backgroundImage: background.get() }}>
            <div className="patternContainer" style={{ display: currGradient.current === "web" ? "block" : "none", opacity: opacities.opacityWeb.get() }}>
                {webTiles}
            </div>
            <div className="patternContainer" style={{ display: currGradient.current === "game" ? "block" : "none", opacity: opacities.opacityGame.get() }}>
                {gameTiles}
            </div>
            <div className="patternContainer" style={{ display: currGradient.current === "design" ? "block" : "none", opacity: opacities.opacityDesign.get() }}>
                {designTiles}
            </div>
        </div>
    );
});

export default Background;
