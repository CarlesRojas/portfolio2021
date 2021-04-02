import React, { useContext, useEffect, useState, useRef } from "react";
import classnames from "classnames";

// Image
import ProfilePicture from "resources/projects/About/profile.jpg";

// Contexts
import { Utils } from "contexts/Utils";

// Studies
const studies = [
    {
        title: "Bachelor’s Degree in informatics Engineering",
        institution: "Facultat d’Informàtica de Barcelona",
        initialYear: 2015,
        finalYear: 2018,
    },
    {
        title: "Bachelor’s Degree in Product Design",
        institution: "EINA Centre Universitari de Disseny i Art de Barcelona",
        initialYear: 2011,
        finalYear: 2015,
    },
    {
        title: "High School",
        institution: "Institució Cultural del CIC",
        initialYear: 2009,
        finalYear: 2011,
    },
];

export default function About() {
    // Contexts
    const { copy } = useContext(Utils);

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
    //      RENDER
    // ###################################################

    return (
        <div className="about glass">
            <div className="aboutContainer glass">
                <div className="profile">
                    <img src={ProfilePicture} alt="" className="profilePicture" />
                    <div className="name">Carles Rojas</div>

                    <form autoComplete="off" noValidate spellCheck="false" onClick={onCopyEmail}>
                        <input id="email" className="email hoverable" type="email" autoComplete="new-password" defaultValue="carlesrojas@outlook.com" />
                    </form>

                    <div className="emailCopy" ref={emailCopiedRef}>
                        email copied
                    </div>
                </div>

                {studies.map(({ title, institution, initialYear, finalYear }, i) => {
                    return (
                        <div className="studies">
                            <p className="title">{title}</p>
                            <p className="institution">{institution}</p>
                            <p className="years">{`${initialYear} - ${finalYear}`}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
