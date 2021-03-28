import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Deck from "./Deck";

// Constants
const SMALL_SCREEN_WIDTH = 1100;

export default function MobileApp({ image, icon, title, subtitle, description, links, qr, video, screenshots, horizontal, color }) {
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
    //   CREATE ELEMENTS
    // ###################################################

    // Image
    var imageDOM = image ? <div className="splashscreen" style={{ backgroundImage: `url(${windowWidth >= SMALL_SCREEN_WIDTH ? image.desktop : image.mobile})` }}></div> : null;

    // Icon
    var iconDOM = icon ? <img src={icon} alt="" className="icon" /> : null;

    // Title
    var titleDOM = title ? <div className="title">{title}</div> : null;

    // Subtitle
    var subtitleDOM = subtitle ? <div className="subtitle">{subtitle}</div> : null;

    // Description
    var descriptionDOM = description
        ? description.map((paragraph, i) => {
              return (
                  <div className={classNames("description", { first: i === 0 })} key={i}>
                      {paragraph}
                  </div>
              );
          })
        : null;

    // Links
    var linksDOM = links
        ? links.map(({ url, icon }, i) => {
              return (
                  <a href={url} target="_blank" className="link glass opaque hoverable" key={i} rel="noopener noreferrer">
                      <img src={icon} alt="" className="linkIcon" />
                  </a>
              );
          })
        : null;

    // QR
    var qrDOM = qr ? (
        <a href={qr.url} target="_blank" className="qr glass opaque hoverable" rel="noopener noreferrer">
            <img src={qr.qr} alt="" className="qrIcon" />
        </a>
    ) : null;

    // Video
    var videoDOM = video ? <img src={video} alt="" className="video playable" /> : null;
    var videoExists = video ? true : false;

    // Screenshots
    var screenshotsDOM = screenshots ? <Deck images={screenshots}></Deck> : null;

    // ###################################################
    //      ON COMPONENT MOUNT & UNMOUNT
    // ###################################################

    // Subscribe and unsubscrive to events
    useEffect(() => {
        window.addEventListener("resize", onResize);

        return () => {
            // Unsubscribe to events
            window.removeEventListener("resize", onResize);

            // Clear timeouts
            if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className={`mobileApp glass ${color}`}>
            {imageDOM}

            <div className="mainContainer">
                <div className={classNames("infoContainer", { horizontal }, { noVideo: !videoExists })}>
                    <div className="profileContainer">
                        {iconDOM}

                        <div className="titleContainer">
                            {titleDOM}
                            {subtitleDOM}
                        </div>
                    </div>

                    {descriptionDOM}

                    <div className="linksContainer">
                        {linksDOM}
                        {qrDOM}
                    </div>
                </div>

                <div className={classNames("mediaContainer", { horizontal }, { noVideo: !videoExists })}>
                    {videoDOM}
                    <div className={classNames("screenshotsContainer", { noVideo: !videoExists })}>{screenshotsDOM}</div>
                </div>
            </div>
        </div>
    );
}
