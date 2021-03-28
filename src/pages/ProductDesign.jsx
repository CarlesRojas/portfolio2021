import React from "react";

// Project: SmartBike
import SmartBikeIcon from "resources/projects/SmartBike/icon.png";
import SmartBikeSplash from "resources/projects/SmartBike/splash.png";
import SmartBikeSplashMobile from "resources/projects/SmartBike/splashMobile.png";
import SmartBikeScreenshot1 from "resources/projects/SmartBike/screenshot1.png";
import SmartBikeScreenshot2 from "resources/projects/SmartBike/screenshot2.png";
import SmartBikeScreenshot3 from "resources/projects/SmartBike/screenshot3.png";
import SmartBikeScreenshot4 from "resources/projects/SmartBike/screenshot4.png";
import SmartBikeVideo from "resources/projects/SmartBike/video.mp4";

// Project: HoloLens
import HoloLensIcon from "resources/projects/HoloLens/icon.png";
import HoloLensSplash from "resources/projects/HoloLens/splash.png";
import HoloLensSplashMobile from "resources/projects/HoloLens/splashMobile.png";
import HoloLensScreenshot1 from "resources/projects/HoloLens/screenshot1.png";
import HoloLensScreenshot2 from "resources/projects/HoloLens/screenshot2.png";
import HoloLensVideo from "resources/projects/HoloLens/video.mp4";

// Project: Gwood
import GwoodIcon from "resources/projects/Gwood/icon.png";
import GwoodSplash from "resources/projects/Gwood/splash.png";
import GwoodSplashMobile from "resources/projects/Gwood/splashMobile.png";
import GwoodScreenshot1 from "resources/projects/Gwood/screenshot1.png";
import GwoodScreenshot2 from "resources/projects/Gwood/screenshot2.png";
import GwoodScreenshot3 from "resources/projects/Gwood/screenshot3.png";
import GwoodScreenshot4 from "resources/projects/Gwood/screenshot4.png";

// Project: Orbit
import OrbitIcon from "resources/projects/Orbit/icon.png";
import OrbitSplash from "resources/projects/Orbit/splash.png";
import OrbitSplashMobile from "resources/projects/Orbit/splashMobile.png";
import OrbitScreenshot1 from "resources/projects/Orbit/screenshot1.png";
import OrbitScreenshot2 from "resources/projects/Orbit/screenshot2.png";
import OrbitScreenshot3 from "resources/projects/Orbit/screenshot3.png";
import OrbitScreenshot4 from "resources/projects/Orbit/screenshot4.png";
import OrbitScreenshot5 from "resources/projects/Orbit/screenshot5.png";
import OrbitScreenshot6 from "resources/projects/Orbit/screenshot6.png";
import OrbitVideo from "resources/projects/Orbit/video.mp4";

// Project: ShowBattle
import ShowBattleIcon from "resources/projects/ShowBattle/icon.png";
import ShowBattleSplash from "resources/projects/ShowBattle/splash.png";
import ShowBattleSplashMobile from "resources/projects/ShowBattle/splashMobile.png";
import ShowBattleScreenshot1 from "resources/projects/ShowBattle/screenshot1.png";
import ShowBattleScreenshot2 from "resources/projects/ShowBattle/screenshot2.png";

// Project: SmartWatch
import SmartWatchIcon from "resources/projects/SmartWatch/icon.png";
import SmartWatchSplash from "resources/projects/SmartWatch/splash.png";
import SmartWatchSplashMobile from "resources/projects/SmartWatch/splashMobile.png";
import SmartWatchScreenshot1 from "resources/projects/SmartWatch/screenshot1.png";
import SmartWatchScreenshot2 from "resources/projects/SmartWatch/screenshot2.png";
import SmartWatchVideo from "resources/projects/SmartWatch/video.mp4";

// Components
import MobileApp from "components/MobileApp";

export default function ProductDesign() {
    return (
        <div className="productDesign">
            {/* ################################# */}
            {/*   SmartBike                       */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: SmartBikeSplash, mobile: SmartBikeSplashMobile }}
                icon={SmartBikeIcon}
                title="SmartBike"
                subtitle="Electric and foldable, the perfect city bike."
                description={[
                    "SmartBike is a design concept aimed at improving individual mobility at cities. It uses airless tires without spokes that revolve around the static rim. The back wheel has an electric motor with batteries allocated in the tube.",
                    "This bike is can fold to occupy the minimum amount of space. Both wheels retract, and the tube folds on its middle. Once folded the wheels align perfectly which allows users to pull the bike instead of carrying it.",
                ]}
                // links={[]}
                // qr={}
                video={SmartBikeVideo}
                screenshots={[SmartBikeScreenshot4, SmartBikeScreenshot3, SmartBikeScreenshot2, SmartBikeScreenshot1]}
                horizontal={true}
                color="smartBike"
                process="Smartbike was the final project for the 3D Modeling subject at EINA, University School of Design and Art. It was modeled with SolidWorks and animated using KeyShot. The final images were made using the KeyShot renders and Photoshop."
            ></MobileApp>

            {/* ################################# */}
            {/*   HoloLens                        */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: HoloLensSplash, mobile: HoloLensSplashMobile }}
                icon={HoloLensIcon}
                title="HoloLens 2"
                subtitle="All in one: holographic computer and over-ear headphones."
                description={[
                    "This is concept inspired by the HoloLens device by Microsoft. The holographic screen can be rotated until it disappears when not needed. The headset can be controlled with tactile controls on the right ear-cup as well as hand gestures.",
                    "When needed the screen can be pulled down, which resumes the last session. With this design, the device becomes, portable, multifunctional, and avoids the lack of familiarity that the current design iteration has.",
                ]}
                // links={[]}
                // qr={}
                video={HoloLensVideo}
                screenshots={[HoloLensScreenshot2, HoloLensScreenshot1]}
                horizontal={true}
                color="holoLens"
                process="HoloLens is a concept project modeled using SolidWorks and animated with KeyShot. It only represents a proof of concept and helps visualize how holographic computers could integrate with currently existing devices. "
            ></MobileApp>

            {/* ################################# */}
            {/*   Gwood                           */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: GwoodSplash, mobile: GwoodSplashMobile }}
                icon={GwoodIcon}
                title="Gwood"
                subtitle="Wood-based furniture showcased at 'Feria del Hábitat Valencia 2014'"
                description={[
                    "Gwood is a partnership formed by several students from the 3rd and 4th year from the product design degree from EINA, school about design and art, from Barcelona.",
                    "What was presented at Feria del Hábitat Valencia 2014 is a furniture family entirely made from beech and maroon details, designed for its placement in small rooms so to be able to better use the little space capacity they offer and the tiny useless nooks they often generate.",
                ]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[GwoodScreenshot4, GwoodScreenshot3, GwoodScreenshot2, GwoodScreenshot1]}
                horizontal={true}
                color="gwood"
                process="Gwood is a project made by students of EINA, University School of Design and Art for the Hábitat fair in Valencia 2014. Gwood was divided in five groups. The lounge chair was modeled with SolidWorks and made at EINA's workshop."
            ></MobileApp>

            {/* ################################# */}
            {/*   Orbit                           */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: OrbitSplash, mobile: OrbitSplashMobile }}
                icon={OrbitIcon}
                title="Orbit"
                subtitle="A concept for an all-in-one device. Tablet, Laptop & Desktop computer using a foldable screen."
                description={[
                    "Orbit is a computer screen with three configurations, and some variants. When opened flat it has a 21.2-inch screen that can be placed in a stand to work as a full desktop computer. When opened a quarter of the way, to be used like a laptop, the lower part of the screen will display a keyboard or application specific controls. And when completely folded backwards the device can be used as a tablet.",
                    "This concept uses a foldable screen and a 360 hinge to allow its rotation.",
                ]}
                // links={[]}
                // qr={}
                video={OrbitVideo}
                screenshots={[OrbitScreenshot6, OrbitScreenshot5, OrbitScreenshot4, OrbitScreenshot3, OrbitScreenshot2, OrbitScreenshot1]}
                horizontal={true}
                color="orbit"
                process="Orbit was the final career project at EINA, University School of Design and Art. It was modeled using SolidWorks, rendered, and animated with KeyShot and edited with Photoshop. It's a proof of concept for an All-In-One device."
            ></MobileApp>

            {/* ################################# */}
            {/*   ShowBattle                      */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: ShowBattleSplash, mobile: ShowBattleSplashMobile }}
                icon={ShowBattleIcon}
                title="ShowBattle"
                subtitle="A battle card game inspired by popular tv-shows."
                description={[
                    "Composed by more than two hundred cards ShowBattle features the characters, locations, and items from eight different tv-shows. Up to four players compete and fight using the strengths and weaknesses inspired in events of the shows with lot of 'fan-service' interactions between cards.",
                    "Each card can have attack power, defense, the number of locations required to use it, and its different effects. Also, each one has a quote from its show.",
                ]}
                // links={[]}
                // qr={}
                // video={}
                screenshots={[ShowBattleScreenshot2, ShowBattleScreenshot1]}
                horizontal={true}
                color="showBattle"
                process="ShowBattle is a personal project that was completely created using Photoshop. Al the images used are property of the original show producers. The cards were printed once for personal use."
            ></MobileApp>

            {/* ################################# */}
            {/*   SmartWatch                      */}
            {/* ################################# */}

            <MobileApp
                image={{ desktop: SmartWatchSplash, mobile: SmartWatchSplashMobile }}
                icon={SmartWatchIcon}
                title="SmartWatch"
                subtitle="A new intuitive way to check the time."
                description={[
                    "Apart from its appearance, the goal behind this project was finding out a new way to display the time. Analogic watches have been around for so long that the position of the needles has become something very intuitive for all of us. On the other hand, digital clocks can display the time in a faster and easier way.",
                    "This concept tries to use the best of both worlds by displaying the time digitally in the position the needles would be. Making it intuitive and fast to read.",
                ]}
                // links={[]}
                // qr={}
                video={SmartWatchVideo}
                screenshots={[SmartWatchScreenshot2, SmartWatchScreenshot1]}
                horizontal={true}
                color="smartWatch"
                process="SmartWatch is a project modeled and rendered using SolidWorks for an early project at EINA, University School of Design and Art. The time display method is an original idea animated using Flash Pro."
            ></MobileApp>
        </div>
    );
}
