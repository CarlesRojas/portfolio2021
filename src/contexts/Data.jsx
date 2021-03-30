import React, { createContext, useState, useRef } from "react";

// Data Context
export const Data = createContext();

const DataProvider = (props) => {
    // LANDING CHECK
    const [landingDone, setLandingDone] = useState(true); // ROJAS change to false

    // CURRENT SECTION
    const initialPage = window.location.pathname === "/web" || window.location.pathname === "/" ? "web" : window.location.pathname === "/game" ? "game" : "design";
    const section = useRef(initialPage);

    // SCROLL CONTAINER
    const scrollContainer = useRef(null);

    return (
        <Data.Provider
            value={{
                // LANDING CHECK
                landingDone,
                setLandingDone,

                // CURRENT SECTION
                section,

                // SCROLL CONTAINER
                scrollContainer,
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
