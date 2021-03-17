import React, { useEffect } from "react";
import gsap from "gsap";

export default function Landing() {
    // #######################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // #######################################

    // Subscribe and unsubscrive to events and animate
    useEffect(() => {
        // Animate
        const timeline = gsap.timeline({ defaults: { ease: "power1.out" } });
        timeline.to(".loadingText", { y: "0%", duration: 1, stagger: 0.25 });
        timeline.to(".slider", { y: "-100%", duration: 0.8, delay: 0.75 });
        timeline.to(".textContainer", { y: "-100%", duration: 0.4 }, "-=0.6");

        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // #######################################
    //      RENDER
    // #######################################

    return (
        <div className="landing">
            <div className="textContainer">
                <h1 className="hideMask">
                    <span className="loadingText">Welcome to</span>
                </h1>
                <h1 className="hideMask">
                    <span className="loadingText">my portfolio.</span>
                </h1>
            </div>

            <div className="slider"></div>
        </div>
    );
}
