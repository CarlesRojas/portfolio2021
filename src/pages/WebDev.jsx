import React from "react";

// Project: MatchEat
import MatchEatIcon from "resources/projects/MatchEat/icon.png";
import MatchEatSplash from "resources/projects/MatchEat/splash.png";
import MatchEatSplashMobile from "resources/projects/MatchEat/splashMobile.png";
import MatchEatScreenshot1 from "resources/projects/MatchEat/screenshot1.png";
import MatchEatScreenshot2 from "resources/projects/MatchEat/screenshot2.png";
import MatchEatScreenshot3 from "resources/projects/MatchEat/screenshot3.png";
import MatchEatScreenshot4 from "resources/projects/MatchEat/screenshot4.png";
import MatchEatScreenshot5 from "resources/projects/MatchEat/screenshot5.png";
import MatchEatScreenshot6 from "resources/projects/MatchEat/screenshot6.png";
import MatchEatScreenshot7 from "resources/projects/MatchEat/screenshot6.png";
import MatchEatVideo from "resources/projects/MatchEat/video.mp4";
import MatchEatQR from "resources/projects/MatchEat/qr.png";

// Project: g-stocks
import GstocksIcon from "resources/projects/Gstocks/icon.png";
import GstocksSplash from "resources/projects/Gstocks/splash.png";
import GstocksSplashMobile from "resources/projects/Gstocks/splashMobile.png";
import GstocksScreenshot1 from "resources/projects/Gstocks/screenshot1.png";
import GstocksScreenshot2 from "resources/projects/Gstocks/screenshot2.png";
import GstocksScreenshot3 from "resources/projects/Gstocks/screenshot3.png";
import GstocksScreenshot4 from "resources/projects/Gstocks/screenshot4.png";
import GstocksScreenshot5 from "resources/projects/Gstocks/screenshot5.png";
import GstocksScreenshot6 from "resources/projects/Gstocks/screenshot6.png";

// Project: Spot
import SpotIcon from "resources/projects/Spot/icon.png";
import SpotSplash from "resources/projects/Spot/splash.png";
import SpotSplashMobile from "resources/projects/Spot/splashMobile.png";
import SpotScreenshot1 from "resources/projects/Spot/screenshot1.png";
import SpotScreenshot2 from "resources/projects/Spot/screenshot2.png";
import SpotScreenshot3 from "resources/projects/Spot/screenshot3.png";
import SpotScreenshot4 from "resources/projects/Spot/screenshot4.png";
import SpotScreenshot5 from "resources/projects/Spot/screenshot5.png";
import SpotScreenshot6 from "resources/projects/Spot/screenshot6.png";
import SpotVideo from "resources/projects/Spot/video.mp4";

// Project: Reddon
import ReddonIcon from "resources/projects/Reddon/icon.png";
import ReddonSplash from "resources/projects/Reddon/splash.png";
import ReddonSplashMobile from "resources/projects/Reddon/splashMobile.png";
import ReddonScreenshot1 from "resources/projects/Reddon/screenshot1.png";
import ReddonScreenshot2 from "resources/projects/Reddon/screenshot2.png";
import ReddonScreenshot3 from "resources/projects/Reddon/screenshot3.png";
import ReddonScreenshot4 from "resources/projects/Reddon/screenshot4.png";

// Project: Portfolio
import PortfolioIcon from "resources/projects/Portfolio/icon.png";
import PortfolioSplash from "resources/projects/Portfolio/splash.png";
import PortfolioSplashMobile from "resources/projects/Portfolio/splashMobile.png";

// Components
import MobileApp from "components/MobileApp";

export default function WebDev() {
    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className="webDev">
            {/* ################################# */}
            {/*   MatchEat                        */}
            {/* ################################# */}

            <MobileApp
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
                color="matchEat"
                process="MatchEat is a Progressive Web App made with ReactJS targeting mobile devices. You can add it as an app to your Android or iPhone by scanning this QR and adding the page to your Home Screen."
            ></MobileApp>

            {/* ################################# */}
            {/*   G-Stocks                        */}
            {/* ################################# */}

            <MobileApp
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
                color="gstocks"
                process="g-stocks is a tool made with JavaScript targeting desktop devices. It is still in development and can’t be accessed yet."
            ></MobileApp>

            {/* ################################# */}
            {/*   Spot                            */}
            {/* ################################# */}

            <MobileApp
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
                color="spot"
                process="Spot is a Progressive Web App made with ReactJS targeting mobile devices. It is a work in progress that is not yet available for public use."
            ></MobileApp>

            {/* ################################# */}
            {/*   Reddon                          */}
            {/* ################################# */}

            <MobileApp
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
                color="reddon"
                process="Reddon is a Progressive Web App made with ReactJS targeting mobile devices. It is a work in progress that is not yet available for public use."
            ></MobileApp>

            {/* ################################# */}
            {/*   Portfolio                          */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: PortfolioSplash, mobile: PortfolioSplashMobile }}
                icon={PortfolioIcon}
                title="Potfolio"
                subtitle="A portfolio of all the projects I’ve made (The ones that are worth mentioning 😅)."
                description={[
                    "I’ve divided the projects in three sections, Web Development, Game Development & Product Design. Each card shows you a brief explanation of each project with some screenshots.",
                ]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[]}
                horizontal={true}
                color="portfolio"
                process="This portfolio is a webpage build using ReactJS."
            ></MobileApp>
        </div>
    );
}
