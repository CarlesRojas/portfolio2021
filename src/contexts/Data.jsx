import React, { createContext, useState, useRef } from "react";

// Data Context
export const Data = createContext();

const DataProvider = (props) => {
    // LANDING CHECK
    const [landingDone, setLandingDone] = useState(true); // ROJAS change to false

    // CURRENT SECTION
    const section = useRef("web");

    return (
        <Data.Provider
            value={{
                // LANDING CHECK
                landingDone,
                setLandingDone,

                // CURRENT SECTION
                section,
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
