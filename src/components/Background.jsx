import React, { useRef, useEffect, useState, useContext, memo } from "react";
import { useSpring, animated } from "react-spring";
import SVG from "react-inlinesvg";

// Icons
import DesignPattern from "resources/patterns/designPattern.svg";
import WebPattern from "resources/patterns/electronicPattern.svg";
import GamePattern from "resources/patterns/gamingPattern.svg";

// Constants
const COLLAPSE_NAVBAR_WIDTH = 1100;
const GRADIENTS = {
    web: ["#2192bf", "#02f8ab"],
    game: ["#f46b6b", "#f4a658"],
    design: ["#733FFF", "#FAB4D6"],
};
const PATTERNS = {
    web: { svg: WebPattern, tileSize: 300, tileSizeMobile: 200 },
    game: { svg: GamePattern, tileSize: 300, tileSizeMobile: 200 },
    design: { svg: DesignPattern, tileSize: 300, tileSizeMobile: 200 },
};

const Background = memo(({ parent }) => {
    // #################################################
    //   BACKGROUND LOGIC
    // #################################################

    // Current background & pattern
    const currGradient = useRef("web");

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

        // Change pattern opacities
        setOpacities({
            opacityWeb: sectionName === "web" ? 1 : 0,
            opacityGame: sectionName === "game" ? 1 : 0,
            opacityDesign: sectionName === "design" ? 1 : 0,
        });
    };

    // #################################################
    //   TILES CREATION
    // #################################################

    // Tiles
    const [tiles, setTiles] = useState({ web: null, game: null, design: null });

    // Create tiles
    const createTiles = () => {
        console.log(parentRef.current);
        if (!parentRef.current) return;

        // Constants
        const PARENT_DIMENSIONS = parentRef.current.getBoundingClientRect();
        const SCREEN_WIDTH = PARENT_DIMENSIONS.width;
        const SCREEN_HEIGHT = PARENT_DIMENSIONS.height;
        const TILE_SIZE = PATTERNS[currGradient.current].tileSizeMobile;
        const NUM_TILES = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE) + 1, y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE) + 1 };
        const TILE_SIZE_DESKTOP = PATTERNS[currGradient.current].tileSize;
        const NUM_TILES_DESKTOP = { x: Math.ceil(SCREEN_WIDTH / TILE_SIZE_DESKTOP) + 1, y: Math.ceil(SCREEN_HEIGHT / TILE_SIZE_DESKTOP) + 1 };
        const isMobile = window.innerWidth < COLLAPSE_NAVBAR_WIDTH;

        // Tile matrix
        var numTiles = isMobile ? NUM_TILES : NUM_TILES_DESKTOP;
        var tileSize = isMobile ? TILE_SIZE : TILE_SIZE_DESKTOP;

        var webTiles = [];
        var gameTiles = [];
        var designTiles = [];
        var xSize = numTiles.x * tileSize;
        var ySize = numTiles.y * tileSize;
        for (let i = 0; i < numTiles.x; i++) {
            for (let j = 0; j < numTiles.y; j++) {
                // Get vertical displacement
                const displX = (xSize - PARENT_DIMENSIONS.width) / 2;
                const displY = (ySize - PARENT_DIMENSIONS.height) / 2;

                var xPos = i * tileSize - displX;
                var yPos = j * tileSize - displY;

                webTiles.push(<SVG key={`${i - 1}-${j - 1}`} className="cell web" src={PATTERNS["web"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />);

                gameTiles.push(<SVG key={`${i - 1}-${j - 1}`} className="cell game" src={PATTERNS["game"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />);

                designTiles.push(
                    <SVG key={`${i - 1}-${j - 1}`} className="cell design" src={PATTERNS["design"].svg} style={{ width: tileSize, transform: `translate(${xPos}px, ${yPos}px)` }} />
                );
            }
        }

        console.log("TILES");

        setTiles({ web: webTiles, game: gameTiles, design: designTiles });
    };

    // Save parent in a ref
    const parentRef = useRef(parent);

    // Create tiles when parent changes
    useEffect(() => {
        parentRef.current = parent;
        createTiles();
    }, [parent]);

    // #################################################
    //   RESIZE LOGIC
    // #################################################

    // Resize timeout
    const resizeTimeout = useRef(null);

    const onResize = () => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

        resizeTimeout.current = setTimeout(createTiles, 500);
    };

    // #######################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // #######################################

    // On componente mount
    useEffect(() => {
        // Subscribe to events
        window.addEventListener("resize", onResize);
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Unsubscribe from events and stop loop
        return () => {
            window.removeEventListener("resize", onResize);
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // #################################################
    //   RENDER
    // #################################################

    return (
        <animated.div className="background" style={{ backgroundImage: background }}>
            <animated.div className="patternContainer" style={{ opacity: opacities.opacityWeb }}>
                {tiles.web}
            </animated.div>
            <animated.div className="patternContainer" style={{ opacity: opacities.opacityGame }}>
                {tiles.game}
            </animated.div>
            <animated.div className="patternContainer" style={{ opacity: opacities.opacityDesign }}>
                {tiles.design}
            </animated.div>
        </animated.div>
    );
});

export default Background;
