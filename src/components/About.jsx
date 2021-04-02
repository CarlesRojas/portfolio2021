import React, { useContext, useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import classnames from "classnames";

// Image
import ProfilePicture from "resources/projects/About/profile.jpg";

// Contexts
import { Utils } from "contexts/Utils";

// Studies
const STUDIES = [
    {
        title: "Bachelor’s Degree in informatics Engineering",
        institution: "Facultat d’Informàtica de Barcelona",
        initialYear: 2015,
        finalYear: 2018,
    },
    {
        title: "Bachelor’s Degree in Product Design",
        institution: "EINA Centre Universitari de Disseny i Art de Barcelona",
        initialYear: 2011,
        finalYear: 2015,
    },
    {
        title: "High School",
        institution: "Institució Cultural del CIC",
        initialYear: 2009,
        finalYear: 2011,
    },
];

export default function About() {
    // Contexts
    const { copy } = useContext(Utils);

    // #################################################
    //   ANIMATIONS
    // #################################################

    // Current page: "welcome" "login" "signup" "loading" "camera"
    const [show, setShow] = useState(false);
    const showRef = useRef(false);

    // Page position spring
    const [springs, setSprings] = useSpring(() => ({ position: -window.innerHeight * 2, opacity: 0 }));

    // On show about
    const showAbout = () => {
        showRef.current = true;
        setShow(true);
        setSprings({ position: 0, opacity: 1 });
        window.PubSub.emit("setCursorIcon", { type: "close" });
    };

    // On show about
    const hideAbout = () => {
        showRef.current = false;
        setShow(false);
        setSprings({ position: -window.innerHeight * 2, opacity: 0 });
        window.PubSub.emit("setCursorIcon", { type: "none" });
    };

    // #################################################
    //   RESIZE
    // #################################################

    // Resize timeout
    const resizeTimeout = useRef(null);

    // On window resize
    const onResize = () => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

        resizeTimeout.current = setTimeout(() => {
            if (showRef.current) setSprings({ position: 0, opacity: 1 });
            else setSprings({ position: -window.innerHeight * 2, opacity: 0 });
        }, 500);
    };

    // #################################################
    //   BACK GESTURE
    // #################################################

    // Container Ref
    const containerRef = useRef(null);

    // Horizontal gesture
    const gestureBind = useDrag(
        ({ event, cancel, canceled, down, vxvy: [, vy], movement: [, my] }) => {
            // Stop event propagation
            event.persist();
            event.stopPropagation();

            // Return if canceled
            if (canceled) return;

            // Cancel gesture
            if (!showRef.current) return cancel();

            // Snap to the welcome screen or stay on te current page
            if (!down) {
                const containerHeight = containerRef.current.getBoundingClientRect().height;

                if (my < -containerHeight / 4 || vy < -1) hideAbout();
                else showAbout();
            }

            // Update the position while the gesture is active
            else {
                var displ = Math.min(my, 20);
                setSprings({ position: displ, opacity: 1 });
            }
        },
        { filterTaps: true, axis: "y" }
    );

    // ###################################################
    //      COPY EMAIL
    // ###################################################

    // Email div
    const emailCopiedRef = useRef(null);

    // On Email copied
    const onCopyEmail = () => {
        // Show the copied message for a second
        emailCopiedRef.current.classList.remove("fadeOut");
        void emailCopiedRef.current.offsetWidth;
        emailCopiedRef.current.classList.add("fadeOut");

        // Copy code to clipboard
        copy("email");
    };

    // ###################################################
    //      CURSOR
    // ###################################################

    // On mouse over about section -> Change cursor icon
    const onMouseOverAbout = () => {
        window.PubSub.emit("setCursorIcon", { type: "none" });
    };

    // On mouse exiting the about section -> Change cursor icon
    const onMouseOutAbout = () => {
        if (showRef.current) window.PubSub.emit("setCursorIcon", { type: "close" });
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Subscribe to events
        window.PubSub.sub("onShowAbout", showAbout);
        window.addEventListener("resize", onResize);

        return () => {
            // Unsubscribe from events and stop loop
            window.PubSub.unsub("onShowAbout", showAbout);
            window.removeEventListener("resize", onResize);

            // Clear timeouts
            if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //      RENDER
    // ###################################################

    return (
        <div className="about" {...gestureBind()}>
            <animated.div className={classnames("aboutbackground", "glass", { disabled: !show })} style={{ opacity: springs.opacity }} onClick={hideAbout}></animated.div>
            <animated.div
                className="aboutContainer glass"
                style={{ y: springs.position, opacity: springs.opacity }}
                ref={containerRef}
                onMouseOver={onMouseOverAbout}
                onMouseOut={onMouseOutAbout}
            >
                <div className="profile">
                    <img src={ProfilePicture} alt="" className="profilePicture" />
                    <div className="name">Carles Rojas</div>

                    <form autoComplete="off" noValidate spellCheck="false" onClick={onCopyEmail}>
                        <input id="email" className="email hoverable" type="email" autoComplete="new-password" defaultValue="carlesrojas@outlook.com" />
                    </form>

                    <div className="emailCopy" ref={emailCopiedRef}>
                        email copied
                    </div>
                </div>

                {STUDIES.map(({ title, institution, initialYear, finalYear }, i) => {
                    return (
                        <div className="studies" key={i}>
                            <p className="title">{title}</p>
                            <p className="institution">{institution}</p>
                            <p className="years">{`${initialYear} - ${finalYear}`}</p>
                        </div>
                    );
                })}
            </animated.div>
        </div>
    );
}
