import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPlayer from "react-player/lazy";
import classNames from "classnames";
import Deck from "./Deck";

// Contexts
import { Utils } from "contexts/Utils";

// Constants
const SMALL_SCREEN_WIDTH = 1100;

export default function Project({ image, icon, title, subtitle, description, links, qr, video, screenshots, horizontal, id }) {
    // Contexts
    const { useForceUpdate } = useContext(Utils);

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
    const linksDOM = useRef(null);
    const qrDOM = useRef(null);
    const screenshotsDOM = useRef(null);

    // ###################################################
    //   VIDEO
    // ###################################################

    // Video state
    const [playing, setPlaying] = useState(false);
    const playingRef = useRef(false);

    // On video clicked
    const onVideoClicked = () => {
        // Inform that the video started playing
        window.PubSub.emit("onVideoPlay", { id });

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

    console.log(classNames("video", { playable: !playingRef.current }, { pausable: playingRef.current }, id));

    // Video
    var videoDOM = video ? (
        <ReactPlayer
            onClick={onVideoClicked}
            playing={playing}
            className={classNames("video", { playable: !playing }, { pausable: playing }, id)}
            url={video}
            width=""
            height=""
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
        /> /*<img src={video} alt="" className="video playable" />*/
    ) : null;

    var videoExists = video ? true : false;

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        // Subscribe to events
        window.addEventListener("resize", onResize);
        window.PubSub.sub("onVideoPlay", onVideoPlay);

        // Image
        imageDOM.current = image ? <div className="splashscreen" style={{ backgroundImage: `url(${windowWidth >= SMALL_SCREEN_WIDTH ? image.desktop : image.mobile})` }}></div> : null;

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
                      <div className={classNames("description", { first: i === 0 })} key={i}>
                          {paragraph}
                      </div>
                  );
              })
            : null;

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
        <div className={`project glass ${id}`}>
            {imageDOM.current}

            <div className="mainContainer">
                <div className={classNames("infoContainer", { horizontal }, { noVideo: !videoExists })}>
                    <div className="profileContainer">
                        {iconDOM.current}

                        <div className="titleContainer">
                            {titleDOM.current}
                            {subtitleDOM.current}
                        </div>
                    </div>

                    {descriptionDOM.current}

                    <div className="linksContainer">
                        {linksDOM.current}
                        {qrDOM.current}
                    </div>
                </div>

                <div className={classNames("mediaContainer", { horizontal }, { noVideo: !videoExists })}>
                    {videoDOM}
                    <div className={classNames("screenshotsContainer", { noVideo: !videoExists }, id)}>{screenshotsDOM.current}</div>
                </div>
            </div>
        </div>
    );
}
