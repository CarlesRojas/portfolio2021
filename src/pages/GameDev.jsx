import React from "react";

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

// Project: InfinityGallery
import InfinityGalleryIcon from "resources/projects/InfinityGallery/icon.png";
import InfinityGallerySplash from "resources/projects/InfinityGallery/splash.png";
import InfinityGallerySplashMobile from "resources/projects/InfinityGallery/splashMobile.png";
import InfinityGalleryScreenshot1 from "resources/projects/InfinityGallery/screenshot1.png";
import InfinityGalleryScreenshot2 from "resources/projects/InfinityGallery/screenshot2.png";
import InfinityGalleryScreenshot3 from "resources/projects/InfinityGallery/screenshot3.png";
import InfinityGalleryScreenshot4 from "resources/projects/InfinityGallery/screenshot4.png";
import InfinityGalleryScreenshot5 from "resources/projects/InfinityGallery/screenshot5.png";

// Project: Escape
import EscapeIcon from "resources/projects/Escape/icon.png";
import EscapeSplash from "resources/projects/Escape/splash.png";
// import EscapeSplashMobile from "resources/projects/Escape/splashMobile.png"; // ROJAS
import EscapeSplashMobile from "resources/projects/Escape/splash.png";
import EscapeScreenshot1 from "resources/projects/Escape/screenshot1.jpg";
import EscapeScreenshot2 from "resources/projects/Escape/screenshot2.jpg";
import EscapeScreenshot3 from "resources/projects/Escape/screenshot3.jpg";
import EscapeScreenshot4 from "resources/projects/Escape/screenshot4.jpg";
import EscapeScreenshot5 from "resources/projects/Escape/screenshot5.jpg";
import EscapeScreenshot6 from "resources/projects/Escape/screenshot6.jpg";

// Components
import MobileApp from "components/MobileApp";

export default function GameDev() {
    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className="gameDev">
            <MobileApp
                image={{ desktop: Cubic3DSplash, mobile: Cubic3DSplashMobile }}
                icon={Cubic3DIcon}
                title="Cubic 3D"
                subtitle="Stack and puzzle the 3D tetrominos to avoid them getting to the top!"
                description={[
                    "Both the pieces and the board have three dimensions making this a lot more challenging! Clear whole planes by filling them and try to reach the highest score by clearing four at the same time!",
                    "Cubic 3D is currently published in the Google Play Store and it’s available on any mobile device.",
                ]}
                links={[
                    { url: "https://play.google.com/store/apps/details?id=com.PinyaGames.Tetris3D", icon: AndroidIcon },
                    // { url: "https://www.microsoft.com/en-us/store/p/cubic3d/9p58mqtkqzmt", icon: WindowsIcon },
                ]}
                // qr={}
                video={Cubic3DScreenshot5}
                screenshots={[Cubic3DScreenshot6, Cubic3DScreenshot5, Cubic3DScreenshot4, Cubic3DScreenshot3, Cubic3DScreenshot2, Cubic3DScreenshot1]}
                horizontal={false}
                color="cubic"
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
                color="trickshots"
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
                color="holochess"
            ></MobileApp>

            <MobileApp
                image={{ desktop: EscapeSplash, mobile: EscapeSplashMobile }}
                icon={EscapeIcon}
                title="Escape"
                subtitle="Escape through the maze using power ups and avoiding the red wall!"
                description={["Use the phones accelerometer to move around a dark maze and collect power ups to escape from the inevitable red wall"]}
                links={[{ url: "https://play.google.com/store/apps/details?id=com.PinyaGames.Escape", icon: AndroidIcon }]}
                // qr={}
                video={EscapeScreenshot5}
                screenshots={[EscapeScreenshot6, EscapeScreenshot5, EscapeScreenshot4, EscapeScreenshot3, EscapeScreenshot2, EscapeScreenshot1]}
                horizontal={true}
                color="escape"
            ></MobileApp>

            <MobileApp
                image={{ desktop: InfinityGallerySplash, mobile: InfinityGallerySplashMobile }}
                icon={InfinityGalleryIcon}
                title="Infinity Gallery"
                subtitle="The biggest collection of pictures in the world, for a very particular kind of pictures."
                description={[
                    "All the pictures in Infinity Gallery are 64 by 64 pixels and in grayscale, using 64 shades of grey. The reason the Infinity Gallery is so big is because it contains every combination possible of this finite number of pixels and gray tonalities. Exactly 224576 pictures. You’ve read this number quite fast, and you’re probably not grasping how enormously big that is.",
                    "So what are the implications of this? In this Gallery you can find every single picture (with those properties) that has been taken in the past and that will be taken in the future. It even contains all the pictures that will never be taken. There is a 64x64 grayscale version of every picture you have posted and will ever post on social media, of each planet in the Universe and each species that may or may not live on them. There is also a picture of those keys you lost a few years ago in the exact location they are now. The only hard task is finding them. Good luck!",
                    "Infinity Gallery is currently published in the Windows Store and Google Play Store and it’s available on any mobile device.",
                ]}
                links={[
                    { url: "https://play.google.com/store/apps/details?id=com.PinyaGames.InfinityGallery", icon: AndroidIcon },
                    // { url: "https://www.microsoft.com/en-us/store/p/infinity-gallery/9nblggh40k00", icon: WindowsIcon },
                ]}
                // qr={}
                video={InfinityGalleryScreenshot5}
                screenshots={[InfinityGalleryScreenshot5, InfinityGalleryScreenshot4, InfinityGalleryScreenshot3, InfinityGalleryScreenshot2, InfinityGalleryScreenshot1]}
                horizontal={false}
                color="infinityGallery"
            ></MobileApp>
        </div>
    );
}
