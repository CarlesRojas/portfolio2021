import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

// Project: MatchEat
import MatchEatIcon from "resources/projects/MatchEat/icon.png";
import MatchEatSplash from "resources/projects/MatchEat/splash.jpg";
import MatchEatSplashMobile from "resources/projects/MatchEat/splashMobile.jpg";
import MatchEatScreenshot1 from "resources/projects/MatchEat/screenshot1.jpg";
import MatchEatScreenshot2 from "resources/projects/MatchEat/screenshot2.jpg";
import MatchEatScreenshot3 from "resources/projects/MatchEat/screenshot3.jpg";
import MatchEatScreenshot4 from "resources/projects/MatchEat/screenshot4.jpg";
import MatchEatScreenshot5 from "resources/projects/MatchEat/screenshot5.jpg";
import MatchEatScreenshot6 from "resources/projects/MatchEat/screenshot6.jpg";
import MatchEatScreenshot7 from "resources/projects/MatchEat/screenshot7.jpg";
import MatchEatVideo from "resources/projects/MatchEat/video.mp4";
import MatchEatQR from "resources/projects/MatchEat/qr.png";

// Project: g-stocks
import GstocksIcon from "resources/projects/Gstocks/icon.png";
import GstocksSplash from "resources/projects/Gstocks/splash.jpg";
import GstocksSplashMobile from "resources/projects/Gstocks/splashMobile.jpg";
import GstocksScreenshot1 from "resources/projects/Gstocks/screenshot1.jpg";
import GstocksScreenshot2 from "resources/projects/Gstocks/screenshot2.jpg";
import GstocksScreenshot3 from "resources/projects/Gstocks/screenshot3.jpg";
import GstocksScreenshot4 from "resources/projects/Gstocks/screenshot4.jpg";
import GstocksScreenshot5 from "resources/projects/Gstocks/screenshot5.jpg";
import GstocksScreenshot6 from "resources/projects/Gstocks/screenshot6.jpg";

// Project: Spot
import SpotIcon from "resources/projects/Spot/icon.png";
import SpotSplash from "resources/projects/Spot/splash.jpg";
import SpotSplashMobile from "resources/projects/Spot/splashMobile.jpg";
import SpotScreenshot1 from "resources/projects/Spot/screenshot1.jpg";
import SpotScreenshot2 from "resources/projects/Spot/screenshot2.jpg";
import SpotScreenshot3 from "resources/projects/Spot/screenshot3.jpg";
import SpotScreenshot4 from "resources/projects/Spot/screenshot4.jpg";
import SpotScreenshot5 from "resources/projects/Spot/screenshot5.jpg";
import SpotScreenshot6 from "resources/projects/Spot/screenshot6.jpg";
import SpotVideo from "resources/projects/Spot/video.mp4";

// Project: Reddon
import ReddonIcon from "resources/projects/Reddon/icon.png";
import ReddonSplash from "resources/projects/Reddon/splash.jpg";
import ReddonSplashMobile from "resources/projects/Reddon/splashMobile.jpg";
import ReddonScreenshot1 from "resources/projects/Reddon/screenshot1.jpg";
import ReddonScreenshot2 from "resources/projects/Reddon/screenshot2.jpg";
import ReddonScreenshot3 from "resources/projects/Reddon/screenshot3.jpg";
import ReddonScreenshot4 from "resources/projects/Reddon/screenshot4.jpg";

// Project: Portfolio
import PortfolioIcon from "resources/projects/Portfolio/icon.png";
import PortfolioSplash from "resources/projects/Portfolio/splash.jpg";
import PortfolioSplashMobile from "resources/projects/Portfolio/splashMobile.jpg";

// Components
import Project from "components/Project";

export default function WebDev() {
    // Redirect state
    const [redirectTo, setRedirectTo] = useState(null);

    // ###################################################
    //      SECTION CHANGE
    // ###################################################

    // On section change
    const onSectionChange = ({ sectionName }) => {
        // Hide
        setVisible(false);

        // Change section
        fadeTimeout.current = setTimeout(() => {
            setRedirectTo(`/${sectionName}`);
        }, 400);
    };

    // Fade in or out timeout
    const fadeTimeout = useRef(null);

    // Fada state
    const [visible, setVisible] = useState(false);

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Subscribe to events
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Show section
        fadeTimeout.current = setTimeout(() => {
            setVisible(true);
        }, 400);

        // Unsubscribe from events and stop loop
        return () => {
            window.PubSub.unsub("onSectionChange", onSectionChange);

            // Clear timeout
            if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    // Redirect to new route
    if (redirectTo) return <Redirect to={redirectTo} push={true} />;

    return (
        <div className={classnames("webDev", { visible })}>
            {/* ################################# */}
            {/*   MatchEat                        */}
            {/* ################################# */}

            <Project
                image={{ desktop: MatchEatSplash, mobile: MatchEatSplashMobile }}
                icon={MatchEatIcon}
                title="MatchEat"
                subtitle="Find the restaurant around you that matches your group best."
                description={[
                    "Having trouble choosing a restaurant with your friends or your significant other? Use MatchEat to find the restaurant around you that the group likes the most.",
                    "Everyone joins a room at the same time from their phones. Each of you will see the same list of restaurants and will give each one a Like, Love or Nope. When everyone is finished, the restaurants will be ranked, and you can get directions to any of them.",
                ]}
                // links={[]}
                qr={{ url: "http://matcheat.netlify.app/", qr: MatchEatQR }}
                video={MatchEatVideo}
                screenshots={[MatchEatScreenshot7, MatchEatScreenshot6, MatchEatScreenshot5, MatchEatScreenshot4, MatchEatScreenshot3, MatchEatScreenshot2, MatchEatScreenshot1]}
                horizontal={false}
                id="matchEat"
                process="MatchEat is a Progressive Web App made with ReactJS targeting mobile devices. You can add it as an app to your Android or iPhone by scanning this QR and adding the page to your Home Screen."
                i={0}
            ></Project>

            {/* ################################# */}
            {/*   G-Stocks                        */}
            {/* ################################# */}

            <Project
                image={{ desktop: GstocksSplash, mobile: GstocksSplashMobile }}
                icon={GstocksIcon}
                title="g-stocks"
                subtitle="Make your own Valuations of Markets, ETFs, and Companies in seconds, to know if they are cheap or expensive today."
                description={[
                    "g-stocks empowers individual investors with the most advanced and intuitive tool to make valuations of markets and companies. Its unique design allows you to make optimal investment decisions fast.",
                ]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[GstocksScreenshot6, GstocksScreenshot5, GstocksScreenshot4, GstocksScreenshot3, GstocksScreenshot2, GstocksScreenshot1]}
                horizontal={true}
                id="gstocks"
                process="g-stocks is a tool made with JavaScript targeting desktop devices. It is still in development and can’t be accessed yet."
                i={1}
            ></Project>

            {/* ################################# */}
            {/*   Spot                            */}
            {/* ################################# */}

            <Project
                image={{ desktop: SpotSplash, mobile: SpotSplashMobile }}
                icon={SpotIcon}
                title="Spot"
                subtitle="A minimal and traditional client for Spotify."
                description={["Spot is an app that connects to your current Spotify account and lets you explore your music using a traditional library with a minimalistic design."]}
                // links={[]}
                // qr={}
                video={SpotVideo}
                screenshots={[SpotScreenshot6, SpotScreenshot5, SpotScreenshot4, SpotScreenshot3, SpotScreenshot2, SpotScreenshot1]}
                horizontal={false}
                id="spot"
                process="Spot is a Progressive Web App made with ReactJS targeting mobile devices. It is a work in progress that is not yet available for public use."
                i={2}
            ></Project>

            {/* ################################# */}
            {/*   Reddon                          */}
            {/* ################################# */}

            <Project
                image={{ desktop: ReddonSplash, mobile: ReddonSplashMobile }}
                icon={ReddonIcon}
                title="Reddon"
                subtitle="A client for Reddit that navigates posts horizontally."
                description={["Reddon is an app that connects to your current Reddit account and lets you navigate the most recent posts using horizontal scrolling."]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[ReddonScreenshot4, ReddonScreenshot3, ReddonScreenshot2, ReddonScreenshot1]}
                horizontal={false}
                id="reddon"
                process="Reddon is a Progressive Web App made with ReactJS targeting mobile devices. It is a work in progress that is not yet available for public use."
                i={3}
            ></Project>

            {/* ################################# */}
            {/*   Portfolio                          */}
            {/* ################################# */}

            <Project
                image={{ desktop: PortfolioSplash, mobile: PortfolioSplashMobile }}
                icon={PortfolioIcon}
                title="Portfolio"
                subtitle="A portfolio of all the projects I’ve made (The ones that are worth mentioning 😅)."
                description={[
                    "I’ve divided the projects in three sections, Web Development, Game Development & Product Design. Each card shows you a brief explanation of each project with some screenshots.",
                ]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[]}
                horizontal={true}
                id="portfolio"
                process="This portfolio is a webpage build using ReactJS."
                i={4}
            ></Project>
        </div>
    );
}
