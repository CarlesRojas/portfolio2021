import React, { useContext, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import SVG from "react-inlinesvg";

// Icons
import ArrowIcon from "resources/icons/arrow.svg";
import LogoGradientIcon from "resources/logoGradient.svg";

// Web Icons
import MatchEatIcon from "resources/projects/MatchEat/icon.png";
import GstocksIcon from "resources/projects/Gstocks/icon.png";
import SpotIcon from "resources/projects/Spot/icon.png";
import ReddonIcon from "resources/projects/Reddon/icon.png";
import PortfolioIcon from "resources/projects/Portfolio/icon.png";

// Game Icons
import Cubic3DIcon from "resources/projects/Cubic3D/icon.png";
import LetsDriveIcon from "resources/projects/LetsDrive/icon.png";
import TrickShotsIcon from "resources/projects/TrickShots/icon.png";
import HoloChessIcon from "resources/projects/HoloChess/icon.png";
import NeoWarIcon from "resources/projects/NeoWar/icon.png";
import EscapeIcon from "resources/projects/Escape/icon.png";
import InfinityGalleryIcon from "resources/projects/InfinityGallery/icon.png";
import PortalIcon from "resources/projects/Portal/icon.png";

// Design Icons
import SmartBikeIcon from "resources/projects/SmartBike/icon.png";
import HoloLensIcon from "resources/projects/HoloLens/icon.png";
import GwoodIcon from "resources/projects/Gwood/icon.png";
import OrbitIcon from "resources/projects/Orbit/icon.png";
import ShowBattleIcon from "resources/projects/ShowBattle/icon.png";
import SmartWatchIcon from "resources/projects/SmartWatch/icon.png";

// About Icons
import AboutIcon from "resources/projects/About/icon.png";

// Contexts
import { Data } from "contexts/Data";
import { Utils } from "contexts/Utils";

// Constants
const COLLAPSE_NAVBAR_WIDTH = 1100;

export default function Footer() {
    // Contexts
    const { scrollContainer } = useContext(Data);
    const { copy } = useContext(Utils);

    // ###################################################
    //      ICONS
    // ###################################################

    const iconsWeb = useRef([MatchEatIcon, GstocksIcon, SpotIcon, ReddonIcon, PortfolioIcon]);
    const iconsGame = useRef([Cubic3DIcon, LetsDriveIcon, TrickShotsIcon, HoloChessIcon, NeoWarIcon, EscapeIcon, InfinityGalleryIcon, PortalIcon]);
    const iconsDesign = useRef([SmartBikeIcon, HoloLensIcon, GwoodIcon, OrbitIcon, ShowBattleIcon, SmartWatchIcon]);

    // On icon clicked
    const onIconClicked = (i) => {
        // Get project objects
        const projects = document.querySelectorAll(".project");
        if (i >= projects.length) return;

        var offset = projects[i].classList.contains("revealed") ? 150 : 250;
        offset = window.innerWidth < COLLAPSE_NAVBAR_WIDTH ? offset - 50 : offset;

        // Get project position
        const top = projects[i].getBoundingClientRect().top + scrollContainer.current.scrollTop - offset;

        // Scroll to show the icon
        scrollContainer.current.scrollTo({ top, behavior: "smooth" });
    };

    // On open about clicked
    const onOpenAbout = () => {
        window.PubSub.emit("onShowAbout");
    };

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
    //      SECTION CHANGE
    // ###################################################

    // Current section
    const initialPage = window.location.pathname === "/web" || window.location.pathname === "/" ? "web" : window.location.pathname === "/game" ? "game" : "design";
    const [currSection, setCurrSection] = useState(initialPage);

    // Apps hidden state
    const [appsHidden, setAppsHidden] = useState(false);
    const appsHiddenTimeout = useRef(null);

    // On section change -> Scroll to top
    const onSectionChange = ({ sectionName }) => {
        setAppsHidden(true);

        // After hidding the apps change icons
        appsHiddenTimeout.current = setTimeout(() => {
            setCurrSection(sectionName);

            // After changing icons, show apps
            appsHiddenTimeout.current = setTimeout(() => {
                setAppsHidden(false);
            }, 200);
        }, 400);
    };

    // ###################################################
    //      GO TO TOP
    // ###################################################

    // Is go to top visible
    const [goToTopVisible, setGoToTopVisible] = useState(false);
    const goToTopVisibleRef = useRef(false);

    // On window scroll
    const onScroll = () => {
        // Hide the icon when on the top of the page
        if (goToTopVisibleRef.current && scrollContainer.current.scrollTop < 200) {
            setGoToTopVisible(false);
            goToTopVisibleRef.current = false;
        }

        // Show the icon otherwise
        else if (!goToTopVisibleRef.current && scrollContainer.current.scrollTop >= 200) {
            setGoToTopVisible(true);
            goToTopVisibleRef.current = true;
        }
    };

    // On go to top clicked
    const onGoToTopClicked = () => {
        scrollContainer.current.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        // Scroll container ref
        const scrollContainerRef = scrollContainer.current;

        // Subscribe to events
        scrollContainerRef.addEventListener("scroll", onScroll);
        window.PubSub.sub("onSectionChange", onSectionChange);

        return () => {
            // Unsubscribe to events
            scrollContainerRef.removeEventListener("scroll", onScroll);
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //      RENDER
    // ###################################################

    const iconArray = currSection === "web" ? iconsWeb.current : currSection === "game" ? iconsGame.current : iconsDesign.current;

    return (
        <div className="footer">
            <div className={classnames("apps", "glass", { appsHidden })}>
                <div className="icons">
                    {iconArray.map((icon, i) => (
                        <img src={icon} alt="" className="icon hoverable" key={i} onClick={() => onIconClicked(i)} />
                    ))}
                    <div className="separator"></div>
                    <img src={AboutIcon} alt="" className="icon hoverable" onClick={onOpenAbout} />
                    <div className="spacing"></div>
                </div>
            </div>
            <div className={classnames("glass", "black", "goTopContainer", "hoverable", { visible: goToTopVisible })} onClick={onGoToTopClicked}>
                <SVG className="goTop" src={ArrowIcon} />
            </div>
            <div className="info">
                <div className="nameContainer hoverable" onClick={onOpenAbout}>
                    <SVG className={classnames("icon", currSection)} src={LogoGradientIcon} />
                    <p className="name">Carles Rojas</p>
                </div>
                <form autoComplete="off" noValidate spellCheck="false" onClick={onCopyEmail}>
                    <input id="email" className="email hoverable" type="email" autoComplete="new-password" defaultValue="carlesrojas@outlook.com" />
                </form>
                <div className="emailCopy" ref={emailCopiedRef}>
                    email copied
                </div>
            </div>
        </div>
    );
}
