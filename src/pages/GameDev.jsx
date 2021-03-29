import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

// General Icons
import HololensIcon from "resources/icons/hololens.png";
import AndroidIcon from "resources/icons/android.png";
import ItchIOIcon from "resources/icons/itchio.svg";

// Project: Cubic3D
import Cubic3DIcon from "resources/projects/Cubic3D/icon.png";
import Cubic3DSplash from "resources/projects/Cubic3D/splash.jpg";
import Cubic3DSplashMobile from "resources/projects/Cubic3D/splashMobile.jpg";
import Cubic3DScreenshot1 from "resources/projects/Cubic3D/screenshot1.jpg";
import Cubic3DScreenshot2 from "resources/projects/Cubic3D/screenshot2.jpg";
import Cubic3DScreenshot3 from "resources/projects/Cubic3D/screenshot3.jpg";
import Cubic3DScreenshot4 from "resources/projects/Cubic3D/screenshot4.jpg";
import Cubic3DScreenshot5 from "resources/projects/Cubic3D/screenshot5.jpg";
import Cubic3DScreenshot6 from "resources/projects/Cubic3D/screenshot6.jpg";
import Cubic3DVideo from "resources/projects/Cubic3D/video.mp4";

// Project: Let's Drive
import LetsDriveIcon from "resources/projects/LetsDrive/icon.png";
import LetsDriveSplash from "resources/projects/LetsDrive/splash.jpg";
import LetsDriveSplashMobile from "resources/projects/LetsDrive/splashMobile.jpg";
import LetsDriveScreenshot1 from "resources/projects/LetsDrive/screenshot1.jpg";
import LetsDriveScreenshot2 from "resources/projects/LetsDrive/screenshot2.jpg";
import LetsDriveScreenshot3 from "resources/projects/LetsDrive/screenshot3.jpg";
import LetsDriveScreenshot4 from "resources/projects/LetsDrive/screenshot4.jpg";
import LetsDriveScreenshot5 from "resources/projects/LetsDrive/screenshot5.jpg";
import LetsDriveScreenshot6 from "resources/projects/LetsDrive/screenshot6.jpg";
import LetsDriveVideo from "resources/projects/LetsDrive/video.mp4";

// Project: TrickShots
import TrickShotsIcon from "resources/projects/TrickShots/icon.png";
import TrickShotsSplash from "resources/projects/TrickShots/splash.jpg";
import TrickShotsSplashMobile from "resources/projects/TrickShots/splashMobile.jpg";
import TrickShotsScreenshot1 from "resources/projects/TrickShots/screenshot1.jpg";
import TrickShotsScreenshot2 from "resources/projects/TrickShots/screenshot2.jpg";
import TrickShotsScreenshot3 from "resources/projects/TrickShots/screenshot3.jpg";
import TrickShotsScreenshot4 from "resources/projects/TrickShots/screenshot4.jpg";

// Project: HoloChess
import HoloChessIcon from "resources/projects/HoloChess/icon.png";
import HoloChessSplash from "resources/projects/HoloChess/splash.jpg";
import HoloChessSplashMobile from "resources/projects/HoloChess/splashMobile.jpg";
import HoloChessScreenshot1 from "resources/projects/HoloChess/screenshot1.jpg";
import HoloChessScreenshot2 from "resources/projects/HoloChess/screenshot2.jpg";
import HoloChessScreenshot3 from "resources/projects/HoloChess/screenshot3.jpg";
import HoloChessScreenshot4 from "resources/projects/HoloChess/screenshot4.jpg";
import HoloChessScreenshot5 from "resources/projects/HoloChess/screenshot5.jpg";
import HoloChessScreenshot6 from "resources/projects/HoloChess/screenshot6.jpg";
import HoloChessScreenshot7 from "resources/projects/HoloChess/screenshot7.jpg";
import HoloChessScreenshot8 from "resources/projects/HoloChess/screenshot8.jpg";
import HoloChessScreenshot9 from "resources/projects/HoloChess/screenshot9.jpg";

// Project: NeoWar
import NeoWarIcon from "resources/projects/NeoWar/icon.png";
import NeoWarSplash from "resources/projects/NeoWar/splash.jpg";
import NeoWarSplashMobile from "resources/projects/NeoWar/splashMobile.jpg";
import NeoWarScreenshot1 from "resources/projects/NeoWar/screenshot1.jpg";
import NeoWarScreenshot2 from "resources/projects/NeoWar/screenshot2.jpg";
import NeoWarScreenshot3 from "resources/projects/NeoWar/screenshot3.jpg";
import NeoWarScreenshot4 from "resources/projects/NeoWar/screenshot4.jpg";
import NeoWarScreenshot5 from "resources/projects/NeoWar/screenshot5.jpg";
import NeoWarScreenshot6 from "resources/projects/NeoWar/screenshot6.jpg";
import NeoWarVideo from "resources/projects/NeoWar/video.mp4";

// Project: Escape
import EscapeIcon from "resources/projects/Escape/icon.png";
import EscapeSplash from "resources/projects/Escape/splash.jpg";
import EscapeSplashMobile from "resources/projects/Escape/splashMobile.jpg";
import EscapeScreenshot1 from "resources/projects/Escape/screenshot1.jpg";
import EscapeScreenshot2 from "resources/projects/Escape/screenshot2.jpg";
import EscapeScreenshot3 from "resources/projects/Escape/screenshot3.jpg";
import EscapeScreenshot4 from "resources/projects/Escape/screenshot4.jpg";
import EscapeScreenshot5 from "resources/projects/Escape/screenshot5.jpg";
import EscapeScreenshot6 from "resources/projects/Escape/screenshot6.jpg";
import EscapeScreenshot7 from "resources/projects/Escape/screenshot7.jpg";
import EscapeVideo from "resources/projects/Escape/video.mp4";

// Project: InfinityGallery
import InfinityGalleryIcon from "resources/projects/InfinityGallery/icon.png";
import InfinityGallerySplash from "resources/projects/InfinityGallery/splash.jpg";
import InfinityGallerySplashMobile from "resources/projects/InfinityGallery/splashMobile.jpg";
import InfinityGalleryScreenshot1 from "resources/projects/InfinityGallery/screenshot1.jpg";
import InfinityGalleryScreenshot2 from "resources/projects/InfinityGallery/screenshot2.jpg";
import InfinityGalleryScreenshot3 from "resources/projects/InfinityGallery/screenshot3.jpg";
import InfinityGalleryScreenshot4 from "resources/projects/InfinityGallery/screenshot4.jpg";
import InfinityGalleryScreenshot5 from "resources/projects/InfinityGallery/screenshot5.jpg";
import InfinityGalleryScreenshot6 from "resources/projects/InfinityGallery/screenshot6.jpg";
import InfinityGalleryScreenshot7 from "resources/projects/InfinityGallery/screenshot7.jpg";
import InfinityGalleryScreenshot8 from "resources/projects/InfinityGallery/screenshot8.jpg";

// Project: Portal
import PortalIcon from "resources/projects/Portal/icon.png";
import PortalSplash from "resources/projects/Portal/splash.jpg";
import PortalSplashMobile from "resources/projects/Portal/splashMobile.jpg";
import PortalScreenshot1 from "resources/projects/Portal/screenshot1.jpg";
import PortalScreenshot2 from "resources/projects/Portal/screenshot2.jpg";
import PortalScreenshot3 from "resources/projects/Portal/screenshot3.jpg";
import PortalScreenshot4 from "resources/projects/Portal/screenshot4.jpg";

// Components
import Project from "components/Project";

export default function GameDev() {
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
        }, 100);

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
        <div className={classnames("gameDev", { visible })}>
            {/* ################################# */}
            {/*   Cubic 3D                        */}
            {/* ################################# */}

            <Project
                image={{ desktop: Cubic3DSplash, mobile: Cubic3DSplashMobile }}
                icon={Cubic3DIcon}
                title="Cubic 3D"
                subtitle="Stack and puzzle the 3D tetrominos to avoid them getting to the top!"
                description={[
                    "Both the pieces and the board have three dimensions making this a lot more challenging! Clear whole planes by filling them and try to reach the highest score by clearing four at the same time!",
                ]}
                links={[{ url: "https://play.google.com/store/apps/details?id=com.PinyaGames.Tetris3D", icon: AndroidIcon }]}
                // qr={}
                video={Cubic3DVideo}
                screenshots={[Cubic3DScreenshot6, Cubic3DScreenshot5, Cubic3DScreenshot4, Cubic3DScreenshot3, Cubic3DScreenshot2, Cubic3DScreenshot1]}
                horizontal={false}
                id="cubic"
                process="Cubic 3D is a game made with Unity targeting the mobile devices. The tridimensional tetrominos have been modeled using the default shapes available in Unity. The game is coded in C# is currently published on the Google Play Store."
            ></Project>

            {/* ################################# */}
            {/*   Let's Drive                     */}
            {/* ################################# */}

            <Project
                image={{ desktop: LetsDriveSplash, mobile: LetsDriveSplashMobile }}
                icon={LetsDriveIcon}
                title="Let’s Drive"
                subtitle="Deliver all cars to their destination but avoid your past self!"
                description={[
                    "You drive a single vehicle with a destination, and you decide the way, but beware! In each round you will cross with all your previous vehicles and their routes.",
                    "Win seconds with the time bonus and restore your vehicle with the repair bonus. Will you deliver all cars to their destinations without accidents?",
                    "Let's drive!",
                ]}
                links={[{ url: "https://play.google.com/store/apps/details?id=com.PinyaGames.LetsDrive", icon: AndroidIcon }]}
                // qr={}
                video={LetsDriveVideo}
                screenshots={[LetsDriveScreenshot6, LetsDriveScreenshot5, LetsDriveScreenshot4, LetsDriveScreenshot3, LetsDriveScreenshot2, LetsDriveScreenshot1]}
                horizontal={true}
                id="letsDrive"
                process="Let’s Drive is a game made with Unity targeting the mobile devices. It was made by Alejandra Jiménez & me (Carles Rojas). The game is coded in C# is currently published on the Google Play Store."
            ></Project>

            {/* ################################# */}
            {/*   TrickShots                      */}
            {/* ################################# */}

            <Project
                image={{ desktop: TrickShotsSplash, mobile: TrickShotsSplashMobile }}
                icon={TrickShotsIcon}
                title="TrickShots"
                subtitle="Augmented reality trick-shots using your room and virtual props."
                description={[
                    "Perform limitless trick shots with a holographic tennis ball that will interact with your surroundings. Add an assortment of different holographic objects like a basketball hoop, a paper bin or a couple of teleporting portals. Challenge yourself and achieve bigger combos to get the higher scores.",
                ]}
                links={[{ url: "https://www.microsoft.com/en-us/store/p/trickshots/9nkmv03xqcng#", icon: HololensIcon }]}
                // qr={}
                // video={}
                screenshots={[TrickShotsScreenshot4, TrickShotsScreenshot3, TrickShotsScreenshot2, TrickShotsScreenshot1]}
                horizontal={true}
                id="trickshots"
                process="TrickShots is a game made with Unity targeting the HoloLens device by Microsoft. The 3D holograms that can be placed into the world have been modeled using SolidWorks and Maya and textured with Photoshop. The game is coded in C# and build with Visual Studio and is currently published on the Windows Store, available only for the HoloLens device by Microsoft."
            ></Project>

            {/* ################################# */}
            {/*   HoloChess                       */}
            {/* ################################# */}

            <Project
                image={{ desktop: HoloChessSplash, mobile: HoloChessSplashMobile }}
                icon={HoloChessIcon}
                title="HoloChess"
                subtitle="The first holographic chess game ever."
                description={[
                    "Play against as AI with three difficulty levels and enjoy the classic game of chess in the augmented world. Choose your favorite style, place the board on your table and enjoy!",
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
                id="holochess"
                process="HoloChess is a game made with Unity targeting the HoloLens device by Microsoft. The distinctively styled chessboards and pieces have been modeled using SolidWorks and Maya and textured with Photoshop. The game is coded in C# and build with Visual Studio and is currently published on the Windows Store, available only for the HoloLens device by Microsoft."
            ></Project>

            {/* ################################# */}
            {/*   NeoWar                          */}
            {/* ################################# */}

            <Project
                image={{ desktop: NeoWarSplash, mobile: NeoWarSplashMobile }}
                icon={NeoWarIcon}
                title="NeoWar"
                subtitle="Avoid the endless stream of neon enemies coming at you!"
                description={[
                    "Control your neon spaceship and shoot down the opposition trying to bring you down. Grab powerups to help you get out of sticky situations and hang on as much as possible.",
                ]}
                links={[{ url: "https://pinyagames.itch.io/neowar", icon: ItchIOIcon }]}
                // qr={}
                video={NeoWarVideo}
                screenshots={[NeoWarScreenshot6, NeoWarScreenshot5, NeoWarScreenshot4, NeoWarScreenshot3, NeoWarScreenshot2, NeoWarScreenshot1]}
                horizontal={true}
                id="neoWar"
                process="NeoWar is a game made with Unity targeting Windows devices. It was made by Jaume Ballester, Santi Rubio & me (Carles Rojas). The game is coded in C# and can be played online."
            ></Project>

            {/* ################################# */}
            {/*   Escape                          */}
            {/* ################################# */}

            <Project
                image={{ desktop: EscapeSplash, mobile: EscapeSplashMobile }}
                icon={EscapeIcon}
                title="Escape"
                subtitle="Escape through the maze using power ups and avoiding the red wall!"
                description={["Use the phones accelerometer to move around a dark maze and collect power ups to escape from the inevitable red wall."]}
                links={[{ url: "https://play.google.com/store/apps/details?id=com.PinyaGames.Escape", icon: AndroidIcon }]}
                // qr={}
                video={EscapeVideo}
                screenshots={[EscapeScreenshot7, EscapeScreenshot6, EscapeScreenshot5, EscapeScreenshot4, EscapeScreenshot3, EscapeScreenshot2, EscapeScreenshot1]}
                horizontal={true}
                id="escape"
                process="Escape is a game made with Unity targeting the mobile devices. All 3D shapes were made using the default shapes available in Unity. The game is coded in C# is currently published on the Google Play Store."
            ></Project>

            {/* ################################# */}
            {/*   Infinity Gallery                */}
            {/* ################################# */}

            <Project
                image={{ desktop: InfinityGallerySplash, mobile: InfinityGallerySplashMobile }}
                icon={InfinityGalleryIcon}
                title="Infinity Gallery"
                subtitle="The biggest collection of pictures in the world, for a specific kind of pictures."
                description={[
                    "All the pictures in Infinity Gallery are 64 by 64 pixels and in grayscale, using 64 shades of grey. The reason the Infinity Gallery is so big is because it contains every combination possible of this finite number of pixels and gray tonalities. Exactly 1.29 x 107398 pictures. You’ve read this number quite fast, and you’re probably not grasping how enormously big that is.",
                    "So, what are the implications of this? In this Gallery you can find every single picture (with those properties) that has been taken in the past and that will be taken in the future. It even contains all the pictures that will never be taken. There is a 64x64 grayscale version of every picture you have posted and will ever post on social media, of each planet in the Universe and each species that may or may not live on them. There is also a picture of those keys you lost a few years ago in the exact location they are now. The only hard task is finding them. Good luck!",
                ]}
                links={[
                    { url: "https://play.google.com/store/apps/details?id=com.PinyaGames.InfinityGallery", icon: AndroidIcon },
                    // { url: "https://www.microsoft.com/en-us/store/p/infinity-gallery/9nblggh40k00", icon: WindowsIcon },
                ]}
                // qr={}
                // video={}
                screenshots={[
                    InfinityGalleryScreenshot8,
                    InfinityGalleryScreenshot7,
                    InfinityGalleryScreenshot6,
                    InfinityGalleryScreenshot5,
                    InfinityGalleryScreenshot4,
                    InfinityGalleryScreenshot3,
                    InfinityGalleryScreenshot2,
                    InfinityGalleryScreenshot1,
                ]}
                horizontal={false}
                id="infinityGallery"
                process="Infinity Gallery is an app made with Unity targeting the mobile devices. All images been made using Illustrator and Photoshop, and Wolfram Alpha was used to create the algorithm to encode the images. The app is coded in C# is currently published on Google Play Store."
            ></Project>

            {/* ################################# */}
            {/*   Portal                          */}
            {/* ################################# */}

            <Project
                image={{ desktop: PortalSplash, mobile: PortalSplashMobile }}
                icon={PortalIcon}
                title="Portal"
                subtitle="A Portal inspired game, but 2D and using pixel art."
                description={[
                    "Solve Portal-like puzzles in 2D. Create your own levels with an intuitive in-game tool and share them. You can play any level in the game as well as the ones created by the community.",
                ]}
                links={[]}
                // qr={}
                // video={}
                screenshots={[PortalScreenshot4, PortalScreenshot3, PortalScreenshot2, PortalScreenshot1]}
                horizontal={true}
                id="portal"
                process="Portal is a work in progress game made with Unity targeting Windows devices. The sprites were created using Photoshop and Illustrator. The game is coded in C# and is not yet available."
            ></Project>
        </div>
    );
}
