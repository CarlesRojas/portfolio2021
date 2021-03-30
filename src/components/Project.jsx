import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPlayer from "react-player/lazy";
import classnames from "classnames";
import SVG from "react-inlinesvg";
import Deck from "./Deck";

// Icons
import PlayIcon from "resources/icons/play.svg";

// Contexts
import { Utils } from "contexts/Utils";
import { Data } from "contexts/Data";

// Constants
const SMALL_SCREEN_WIDTH = 1100;

export default function Project({ image, icon, title, subtitle, description, links, qr, video, screenshots, horizontal, id, process, i }) {
    // Contexts
    const { useForceUpdate } = useContext(Utils);
    const { scrollContainer } = useContext(Data);

    // Force update
    const forceUpdate = useForceUpdate();

    // ###################################################
    //   RESIZE LOGIC
    // ###################################################

    // Window size
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Resize timeout
    const resizeTimeout = useRef(null);

    // On window resize
    const onResize = () => {
        if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

        resizeTimeout.current = setTimeout(() => {
            setWindowWidth(window.innerWidth);
        }, 500);
    };

    // ###################################################
    //   CREATE REF ELEMENTS
    // ###################################################

    const imageDOM = useRef(null);
    const iconDOM = useRef(null);
    const titleDOM = useRef(null);
    const subtitleDOM = useRef(null);
    const descriptionDOM = useRef(null);
    const processDOM = useRef(null);
    const linksDOM = useRef(null);
    const qrDOM = useRef(null);
    const screenshotsDOM = useRef(null);

    // ###################################################
    //   APPEAR ON SCROLL
    // ###################################################

    // Refs
    const splashScreenRef = useRef(null);
    const descriptionnRef = useRef(null);

    // State to check if this Project has revealed
    const [revealed, setRevealed] = useState(i === 0);

    // Screenshots revealed
    const [screenshotsRevealed, setScreenshotsRevealed] = useState(i !== 0);

    // Show project when splash is in view
    const revealProject = () => {
        // Return if it has already been revelaed
        if (revealed || !splashScreenRef.current) return;

        // Get bounding box of splash image
        const box = splashScreenRef.current.getBoundingClientRect();

        // Check if it is half in view
        const halfPoint = box.top + (box.bottom - box.top) / 3;

        // Reveal
        if (halfPoint < window.innerHeight) setRevealed(true);
    };

    // Show screenshots when in view
    const revealScreenshots = () => {
        // Return if they have already been revelaed
        if (screenshotsRevealed || !descriptionnRef.current) return;

        // Get bounding box of description
        const box = descriptionnRef.current.getBoundingClientRect();

        // Check if it is half in view
        const halfPoint = box.top + (box.bottom - box.top) / 2;

        // Reveal
        if (halfPoint < window.innerHeight) setScreenshotsRevealed(true);
    };

    // On window scroll
    const onScroll = () => {
        // Reveal Project
        revealProject();

        // Reveal Screenshots
        revealScreenshots();
    };

    // Show screenshots
    const screenshotsElem = screenshotsRevealed ? screenshotsDOM.current : null;

    // ###################################################
    //   VIDEO
    // ###################################################

    // Video state
    const [playing, setPlaying] = useState(false);
    const playingRef = useRef(false);

    // React Player Ref
    const player = useRef(null);

    // On video clicked
    const onVideoClicked = () => {
        // Inform that the video started playing
        window.PubSub.emit("onVideoPlay", { id });

        // Change cursor icon
        if (playingRef.current) window.PubSub.emit("setCursorIcon", { type: "play" });
        else window.PubSub.emit("setCursorIcon", { type: "pause" });

        // Change state
        setPlaying(!playingRef.current);
        playingRef.current = !playingRef.current;
    };

    // On any video in the page start playing
    const onVideoPlay = ({ id: playingID }) => {
        // Pause if this is not the video that just started playing
        if (playingID !== id) {
            setPlaying(false);
            playingRef.current = false;
        }
    };

    // On video ends
    const onVideoEnds = () => {
        // Pause video
        setPlaying(false);
        playingRef.current = false;
        window.PubSub.emit("setCursorIcon", { type: "play" });

        // Set to the start again
        player.current.seekTo(0);
    };

    // On mouse over video -> Change cursor icon
    const onMouseOverVideo = () => {
        if (playingRef.current) window.PubSub.emit("setCursorIcon", { type: "pause" });
        else window.PubSub.emit("setCursorIcon", { type: "play" });
    };

    // On mouse exiting the video -> Change cursor icon
    const onMouseOutVideo = () => {
        window.PubSub.emit("setCursorIcon", { type: "none" });
    };

    // Video
    var videoDOM = video ? (
        <div className={`videoContainer ${id}`} onMouseOver={onMouseOverVideo} onMouseOut={onMouseOutVideo}>
            <ReactPlayer
                ref={player}
                onClick={onVideoClicked}
                playing={playing}
                className="video"
                url={video}
                width=""
                height=""
                onEnded={onVideoEnds}
                config={{
                    file: {
                        attributes: {
                            muted: true,
                            controls: false,
                            disablePictureInPicture: true,
                            controlsList: "nodownload noremoteplayback",
                        },
                    },
                }}
            />
            <div className={classnames("videoIconContainer", { playing })}>
                <SVG className="videoPlayIcon" src={PlayIcon} />
            </div>
        </div>
    ) : null;
    var videoExists = video ? true : false;

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        // Scroll container ref
        const scrollContainerRef = scrollContainer.current;

        // Subscribe to events
        window.addEventListener("resize", onResize);
        scrollContainerRef.addEventListener("scroll", onScroll);
        window.PubSub.sub("onVideoPlay", onVideoPlay);

        // Image
        imageDOM.current = image ? (
            <div className="splashscreen" style={{ backgroundImage: `url(${windowWidth >= SMALL_SCREEN_WIDTH ? image.desktop : image.mobile})` }} ref={splashScreenRef}></div>
        ) : null;

        // Icon
        iconDOM.current = icon ? <img src={icon} alt="" className="icon" /> : null;

        // Title
        titleDOM.current = title ? <div className="title">{title}</div> : null;

        // Subtitle
        subtitleDOM.current = subtitle ? <div className="subtitle">{subtitle}</div> : null;

        // Description
        descriptionDOM.current = description
            ? description.map((paragraph, i) => {
                  return (
                      <div className={classnames("description", { first: i === 0 })} key={i} ref={descriptionnRef}>
                          {paragraph}
                      </div>
                  );
              })
            : null;

        // PROCESS
        processDOM.current = process ? <div className="process glass">{process}</div> : null;

        // Links
        linksDOM.current = links
            ? links.map(({ url, icon }, i) => {
                  return (
                      <a href={url} target="_blank" className="link glass opaque hoverable" key={i} rel="noopener noreferrer">
                          <img src={icon} alt="" className="linkIcon" />
                      </a>
                  );
              })
            : null;

        // QR
        qrDOM.current = qr ? (
            <a href={qr.url} target="_blank" className="qr glass opaque hoverable" rel="noopener noreferrer">
                <img src={qr.qr} alt="" className="qrIcon" />
            </a>
        ) : null;

        // Screenshots
        screenshotsDOM.current = screenshots ? <Deck images={screenshots}></Deck> : null;

        forceUpdate();

        return () => {
            // Unsubscribe to events
            window.removeEventListener("resize", onResize);
            scrollContainerRef.removeEventListener("scroll", onScroll);
            window.PubSub.unsub("onVideoPlay", onVideoPlay);

            // Clear timeouts
            if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className={classnames("project", "glass", id, { revealed })}>
            {imageDOM.current}

            <div className="mainContainer">
                <div className={classnames("infoContainer", { horizontal }, { noVideo: !videoExists })}>
                    <div className="profileContainer">
                        {iconDOM.current}

                        <div className="titleContainer">
                            {titleDOM.current}
                            {subtitleDOM.current}
                        </div>
                    </div>

                    {descriptionDOM.current}
                    {processDOM.current}

                    <div className="linksContainer">
                        {linksDOM.current}
                        {qrDOM.current}
                    </div>
                </div>

                <div className={classnames("mediaContainer", { horizontal }, { noVideo: !videoExists })}>
                    {videoDOM}
                    <div className={classnames("screenshotsContainer", { noVideo: !videoExists }, id)}>{screenshotsElem}</div>
                </div>
            </div>
        </div>
    );
}
