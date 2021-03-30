import React, { useContext, useEffect, useState, useRef } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Pages
import Landing from "pages/Landing";
import WebDev from "pages/WebDev";
import GameDev from "pages/GameDev";
import ProductDesign from "pages/ProductDesign";

// Components
import Cursor from "components/Cursor";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import SplashScreen from "components/SplashScreen";
import Background from "components/Background";

// Contexts
import { Data } from "contexts/Data";

// Icons
import LogoWhite from "resources/logoWhite.svg";

export default function App() {
    // Contexts
    const { landingDone, scrollContainer } = useContext(Data);

    // ###################################################
    //      ORIENTATION LOGIC
    // ###################################################

    // Orientation not supported screen reference & state
    const orientationNotSupportedRef = useRef(null);
    const [orientationNotSupportedDiv, setOrientationNotSupportedDiv] = useState(null);

    // On splash screen ref change
    useEffect(() => {
        setOrientationNotSupportedDiv(orientationNotSupportedRef.current);
    }, [orientationNotSupportedRef]);

    // Orientation state
    const [orientation, setOrientation] = useState("portrait");

    // On orientation change -> Show no landscape alowed
    const onOrientationChange = () => {
        if (!isMobileOnly) return;

        if (window.orientation === 0) setOrientation("portrait");
        else setOrientation("landscape");
    };

    // ###################################################
    //      SECTION CHANGE
    // ###################################################

    // On section change -> Scroll to top
    const onSectionChange = () => {
        scrollContainer.current.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Lock to portrait in mobile phones
        const lockOrientation = async () => {
            try {
                await window.screen.orientation.lock("portrait");
            } catch (error) {
                console.log(error);
            }
        };

        if (isMobileOnly) {
            lockOrientation();

            // Check orientation
            onOrientationChange();

            // Subscribe to events
            window.addEventListener("orientationchange", onOrientationChange);
        }

        // Subscribe to events
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Unsubscribe from events and stop loop
        return () => {
            window.removeEventListener("orientationchange", onOrientationChange);
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    // If landing not done, show the landing
    var landing = landingDone ? null : <Landing />;

    // If orientation show not supported screen
    const landscapeBlock =
        orientation !== "portrait" ? (
            <div className="orientationNotSupported" ref={orientationNotSupportedRef}>
                <Background parent={orientationNotSupportedDiv} />
                <div className="glass">
                    <SVG className="icon" src={LogoWhite} />
                    <p className="title">Landscape orientation is not supported</p>
                    <p className="subtitle">Turn your device to portrait to continue viewing the page.</p>
                </div>
            </div>
        ) : null;

    return (
        <div className={classnames("app", { scrollActive: landingDone && orientation === "portrait" })} ref={scrollContainer}>
            {landscapeBlock}
            <Cursor />
            <SplashScreen />
            <Navbar />

            {landing}

            <Router>
                <Switch>
                    {/* ################################# */}
                    {/*   PRODUCT DESIGN                  */}
                    {/* ################################# */}
                    <Route path="/design" component={ProductDesign} exact></Route>

                    {/* ################################# */}
                    {/*   GAME DAV                        */}
                    {/* ################################# */}
                    <Route path="/game" component={GameDev} exact></Route>

                    {/* ################################# */}
                    {/*   WEB DEV                         */}
                    {/* ################################# */}
                    <Route path="/" component={WebDev}></Route>
                </Switch>
            </Router>

            <Footer />
        </div>
    );
}
