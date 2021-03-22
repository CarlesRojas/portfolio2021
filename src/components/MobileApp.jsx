import classNames from "classnames";
import React from "react";
import Deck from "./Deck";

export default function MobileApp({ image, icon, title, subtitle, description, links, qr, video, screenshots, horizontal }) {
    // ###################################################
    //   CREATE ELEMENTS
    // ###################################################

    // Image
    var imageDOM = image ? <div className="splashscreen" style={{ backgroundImage: `url(${image.desktop})` }}></div> : null;

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
                  <a href={url} target="_blank" className="link glass hoverable" key={i} rel="noopener noreferrer">
                      <img src={icon} alt="" className="linkIcon" />
                  </a>
              );
          })
        : null;

    // QR
    var qrDOM = qr ? qr : null;

    // Video
    var videoDOM = video ? <img src={video} alt="" className="video playable" /> : null;

    // Screenshots
    var screenshotsDOM = screenshots ? <Deck images={screenshots}></Deck> : null;

    // ###################################################
    //   RENDER
    // ###################################################

    return (
        <div className="mobileApp glass blue">
            {imageDOM}

            <div className="mainContainer">
                <div className="infoContainer">
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

                <div className={classNames("mediaContainer", { horizontal })}>
                    {videoDOM}
                    <div className="screenshotsContainer">{screenshotsDOM}</div>
                </div>
            </div>
        </div>
    );
}
