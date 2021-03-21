import React, { useRef, useEffect, useContext, memo } from "react";
import { useSpring, animated } from "react-spring";

// Contexts
import { Utils } from "contexts/Utils";
import { isMobileOnly } from "react-device-detect";

// Constants
const GRADIENTS = {
    web: ["#2192bf", "#02f8ab"],
    game: ["#f46b6b", "#f4a658"],
    design: ["#733FFF", "#FAB4D6"], //["#1f6a1f", "#f8ff61"],
};
const OPACITIES = {
    web: 0.2,
    game: 0.25,
    design: 0.15,
};

const Background = memo(({ parent }) => {
    // Contexts
    const { invlerp } = useContext(Utils);
    // Save parent in a ref
    const parentRef = useRef(parent);
    useEffect(() => {
        parentRef.current = parent;
    }, [parent]);

    // ###################################################
    //   BACKGROUND LOGIC
    // ###################################################

    // Current section
    const section = useRef("web");

    // Background position spring
    const [{ backgroundPosition }, setPosition] = useSpring(() => ({
        backgroundPosition: "0px 0px",
        config: { friction: 600, mass: 500 },
    }));

    // Background gradient spring
    const [{ backgroundImage }, setGradient] = useSpring(() => ({
        backgroundImage: `linear-gradient(60deg, ${GRADIENTS[section.current][0]} 0%, ${GRADIENTS[section.current][1]} 100%)`,
        config: { friction: 40 },
    }));

    // Background opacity spring
    const [opacities, setOpacities] = useSpring(() => ({
        web: OPACITIES.web,
        game: 0,
        design: 0,
    }));

    // Set te background gradient by one of its presets
    const onSectionChange = ({ sectionName }) => {
        if (!(sectionName in GRADIENTS) || sectionName === section.current) return;

        // Set the background gradient
        setGradient({ backgroundImage: `linear-gradient(60deg, ${GRADIENTS[sectionName][0]} 0%, ${GRADIENTS[sectionName][1]} 100%)` });
        section.current = sectionName;

        // Change pattern opacities
        setOpacities({
            web: sectionName === "web" ? OPACITIES.web : 0,
            game: sectionName === "game" ? OPACITIES.game : 0,
            design: sectionName === "design" ? OPACITIES.design : 0,
        });
    };

    // ###################################################
    //   ACCELEROMETER TILT
    // ###################################################

    // Previous motion parameters
    const motion = useRef({ alpha: 0, beta: 0 });

    // Handle device orientation change
    const onDeviceMotion = ({ rotationRate }) => {
        const { alpha, beta } = rotationRate;

        // Return if alpha or beta are undefined
        if (!alpha || !beta) return;

        // New motion
        var newMotion = { alpha: motion.current.alpha, beta: motion.current.beta };

        // Update alpha
        if (Math.abs(alpha) > 40) {
            newMotion.alpha =
                (Math.sign(motion.current.alpha) === Math.sign(alpha) || motion.current.alpha === 0) && Math.abs(motion.current.alpha) > Math.abs(alpha) ? motion.current.alpha : alpha;
        }

        if (Math.abs(beta) > 40) {
            newMotion.beta = (Math.sign(motion.current.beta) === Math.sign(beta) || motion.current.beta === 0) && Math.abs(motion.current.beta) > Math.abs(beta) ? motion.current.beta : beta;
        }

        // Return if none of the rotation has changed
        if (newMotion.alpha === motion.current.alpha && newMotion.beta === motion.current.beta) return;
        motion.current = { alpha: newMotion.alpha, beta: newMotion.beta };

        // Normalize tilt [-1, 1]
        const normX = invlerp(-250, 250, newMotion.alpha) * 2 - 1;
        const normY = invlerp(-250, 250, newMotion.beta) * 2 - 1;

        // Current background position
        const backgroundPos = backgroundPosition.get().replace(" ", "").split("px");
        const backgroundCoords = { x: parseInt(backgroundPos[0]), y: parseInt(backgroundPos[1]) };

        setPosition({ backgroundPosition: `${backgroundCoords.x + normY * 1000}px ${backgroundCoords.y + normX * 1000}px` });
    };

    // Handle mouse move change
    const onMouseMove = (event) => {
        // Return while not in production
        if (process.env.REACT_APP_DEBUGG === "true" && process.env.NODE_ENV !== "production") return;

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

        // Current background position
        const backgroundPos = backgroundPosition.get().replace(" ", "").split("px");
        const backgroundCoords = { x: parseInt(backgroundPos[0]), y: parseInt(backgroundPos[1]) };

        setPosition({ backgroundPosition: `${backgroundCoords.x - normX * 500}px ${backgroundCoords.y - normY * 500}px` });
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Subscribe to events
        if (isMobileOnly) window.addEventListener("devicemotion", onDeviceMotion, true);
        else window.addEventListener("mousemove", onMouseMove, true);
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Unsubscribe from events and stop loop
        return () => {
            window.removeEventListener("devicemotion", onDeviceMotion, true);
            window.removeEventListener("mousemove", onMouseMove, true);
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <animated.div className="background" style={{ backgroundImage }}>
            <animated.div className="webPattern" style={{ backgroundPosition, opacity: opacities.web }}></animated.div>
            <animated.div className="gamePattern" style={{ backgroundPosition, opacity: opacities.game }}></animated.div>
            <animated.div className="designPattern" style={{ backgroundPosition, opacity: opacities.design }}></animated.div>
        </animated.div>
    );
});

export default Background;
