import React, { useEffect } from "react";

// General Icons
import HololensIcon from "resources/icons/hololens.png";
import AndroidIcon from "resources/icons/android.png";
// import WindowsIcon from "resources/icons/windows.png";

// Project: Cubic3D
import Cubic3DIcon from "resources/projects/Cubic3D/icon.png";
import Cubic3DSplash from "resources/projects/Cubic3D/splash.png";
import Cubic3DSplashMobile from "resources/projects/Cubic3D/splashMobile.png";
import Cubic3DScreenshot1 from "resources/projects/Cubic3D/screenshot1.png";
import Cubic3DScreenshot2 from "resources/projects/Cubic3D/screenshot2.png";
import Cubic3DScreenshot3 from "resources/projects/Cubic3D/screenshot3.png";
import Cubic3DScreenshot4 from "resources/projects/Cubic3D/screenshot4.png";
import Cubic3DScreenshot5 from "resources/projects/Cubic3D/screenshot5.png";
import Cubic3DScreenshot6 from "resources/projects/Cubic3D/screenshot6.png";

// Project: TrickShots
import TrickShotsIcon from "resources/projects/TrickShots/icon.png";
import TrickShotsSplash from "resources/projects/TrickShots/splash.png";
import TrickShotsSplashMobile from "resources/projects/TrickShots/splashMobile.png";
import TrickShotsScreenshot1 from "resources/projects/TrickShots/screenshot1.png";
import TrickShotsScreenshot2 from "resources/projects/TrickShots/screenshot2.png";
import TrickShotsScreenshot3 from "resources/projects/TrickShots/screenshot3.png";
import TrickShotsScreenshot4 from "resources/projects/TrickShots/screenshot4.png";

// Project: HoloChess
import HoloChessIcon from "resources/projects/HoloChess/icon.png";
import HoloChessSplash from "resources/projects/HoloChess/splash.png";
import HoloChessSplashMobile from "resources/projects/HoloChess/splashMobile.png";
import HoloChessScreenshot1 from "resources/projects/HoloChess/screenshot1.png";
import HoloChessScreenshot2 from "resources/projects/HoloChess/screenshot2.png";
import HoloChessScreenshot3 from "resources/projects/HoloChess/screenshot3.png";
import HoloChessScreenshot4 from "resources/projects/HoloChess/screenshot4.png";
import HoloChessScreenshot5 from "resources/projects/HoloChess/screenshot5.png";
import HoloChessScreenshot6 from "resources/projects/HoloChess/screenshot6.png";
import HoloChessScreenshot7 from "resources/projects/HoloChess/screenshot7.png";
import HoloChessScreenshot8 from "resources/projects/HoloChess/screenshot8.png";
import HoloChessScreenshot9 from "resources/projects/HoloChess/screenshot9.png";

// Components
import MobileApp from "components/MobileApp";

export default function WebDev() {
    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // On component mount
    useEffect(() => {
        // Subscribe to events

        // Unsubscribe from events and stop loop
        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className="webDev">
            <MobileApp
                image={{ desktop: Cubic3DSplash, mobile: Cubic3DSplashMobile }}
                icon={Cubic3DIcon}
                title="Cubic 3D"
                subtitle="Stack and puzzle the 3D tetrominos to avoid them getting to the top!"
                description={[
                    "Both the pieces and the board have three dimensions making this a lot more challenging! Clear whole planes by filling them and try to reach the highest score by clearing four at the same time!",
                    "Cubic 3D is currently published in the Windows Store and Google Play and it’s available on any mobile device.",
                ]}
                links={[
                    { url: "https://play.google.com/store/apps/details?id=com.PinyaGames.Tetris3D", icon: AndroidIcon },
                    // { url: "https://www.microsoft.com/en-us/store/p/cubic3d/9p58mqtkqzmt", icon: WindowsIcon },
                ]}
                // qr={}
                video={Cubic3DScreenshot5}
                screenshots={[Cubic3DScreenshot6, Cubic3DScreenshot5, Cubic3DScreenshot4, Cubic3DScreenshot3, Cubic3DScreenshot2, Cubic3DScreenshot1]}
                horizontal={false}
            ></MobileApp>

            <MobileApp
                image={{ desktop: TrickShotsSplash, mobile: TrickShotsSplashMobile }}
                icon={TrickShotsIcon}
                title="TrickShots"
                subtitle="Augmented reality trick-shots using your room and virtual props."
                description={[
                    "Perform limitless trick shots with a holographic tennis ball that will interact with your surroundings. Add an assortment of different holographic objects like a basketball hoop, a paper bin or a couple of teleporting portals. Challenge yourself and achieve bigger combos to get the higher scores.",
                    "TrickShots is currently published in the Windows Store and it’s only available via a HoloLens device by Microsoft.",
                ]}
                links={[{ url: "https://www.microsoft.com/en-us/store/p/trickshots/9nkmv03xqcng#", icon: HololensIcon }]}
                // qr={}
                // video={}
                screenshots={[TrickShotsScreenshot4, TrickShotsScreenshot3, TrickShotsScreenshot2, TrickShotsScreenshot1]}
                horizontal={true}
            ></MobileApp>

            <MobileApp
                image={{ desktop: HoloChessSplash, mobile: HoloChessSplashMobile }}
                icon={HoloChessIcon}
                title="HoloChess"
                subtitle="The first holographic chess game ever."
                description={[
                    "Play against as AI with three difficulty levels and enjoy the classic game of chess in the augmented world. Choose your favorite style, place the board on your table and enjoy!",
                    "HoloChess is currently published in the Windows Store and it’s only available via a HoloLens device by Microsoft.",
                ]}
                links={[{ url: "https://www.microsoft.com/en-us/store/p/holochess-beta/9nblggh40d7c#", icon: HololensIcon }]}
                // qr={}
                // video={}
                screenshots={[
                    HoloChessScreenshot9,
                    HoloChessScreenshot8,
                    HoloChessScreenshot7,
                    HoloChessScreenshot6,
                    HoloChessScreenshot5,
                    HoloChessScreenshot4,
                    HoloChessScreenshot3,
                    HoloChessScreenshot2,
                    HoloChessScreenshot1,
                ]}
                horizontal={true}
            ></MobileApp>
        </div>
    );
}
