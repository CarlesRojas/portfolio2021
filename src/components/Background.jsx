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

// Constants
const COLLAPSE_NAVBAR_WIDTH = 1100;
const MAX_FPS = 120;
const FPS = 30;
const DECELERATION = 10;
const GRADIENTS = {
    web: ["#2192bf", "#02f8ab"],
    design: ["#1f6a1f", "#f8ff61"],
    game: ["#f4a658", "#f46b6b"],
};
const PATTERNS = {
    web: { svg: WebPattern, tileSize: 300, tileSizeMobile: 200 },
    game: { svg: GamePattern, tileSize: 200, tileSizeMobile: 150 },
    design: { svg: DesignPattern, tileSize: 300, tileSizeMobile: 200 },
};

const Background = memo(({ parent }) => {
    // Contexts
    const { useForceUpdate } = useContext(Utils);
    const { positionRef, speedRef, motion, prevMotion } = useContext(Data);

    // Force update
    const forceUpdate = useForceUpdate();

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

    // Set te background gradient by one of its presets
    const onGradientChange = ({ gradientName }) => {
        if (!(gradientName in GRADIENTS)) return;

        // Set the background gradient
        setGradient({ background: `linear-gradient(60deg, ${GRADIENTS[gradientName][0]} 0%, ${GRADIENTS[gradientName][1]} 100%)` });
        currGradient.current = gradientName;
    };

    // Set te background pattern to one of its presets
    const onPatternChange = ({ patternName }) => {
        if (!(patternName in PATTERNS)) return;

        // Set the background pattern
        setCurrPattern(patternName);
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
        window.addEventListener("devicemotion", onDeviceMotion, true);
        window.PubSub.sub("onGradientChange", onGradientChange);
        window.PubSub.sub("onPatternChange", onPatternChange);

        // Start loop
        loop();

        // Unsubscribe from events and stop loop
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("devicemotion", onDeviceMotion, true);
            window.PubSub.unsub("onGradientChange", onGradientChange);
            window.PubSub.unsub("onPatternChange", onPatternChange);

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
        var tiles = [];
    }

    // Tiles to cover only the parent
    else {
        // Constants
        const PARENT_DIMENSIONS = parent.getBoundingClientRect();
        const SCREEN_WIDTH = PARENT_DIMENSIONS.width;
        const SCREEN_HEIGHT = PARENT_DIMENSIONS.height;
        const TILE_SIZE = PATTERNS[currPattern].tileSizeMobile; //SCREEN_WIDTH / PATTERNS[currPattern].tilesPhone;
        const NUM_TILES = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE) + 2, y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE) + 2 };
        const TILE_SIZE_DESKTOP = PATTERNS[currPattern].tileSize; //SCREEN_WIDTH / PATTERNS[currPattern].tiles;
        const NUM_TILES_DESKTOP = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE_DESKTOP), y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE_DESKTOP) };
        const isMobile = window.innerWidth < COLLAPSE_NAVBAR_WIDTH;

        // Tile matrix
        var numTiles = isMobile ? NUM_TILES : NUM_TILES_DESKTOP;
        var tileSize = isMobile ? TILE_SIZE : TILE_SIZE_DESKTOP;

        tiles = [];
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

                tiles.push(
                    <SVG
                        key={`${i - 1}-${j - 1}`}
                        className={classnames("cell", currPattern)}
                        src={PATTERNS[currPattern].svg}
                        style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }}
                    />
                );
            }
        }
    }

    return (
        <div className="background" style={{ backgroundImage: background.get() }}>
            {tiles}
        </div>
    );
});

export default Background;
