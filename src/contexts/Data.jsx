import React, { createContext, useState } from "react";

// Data Context
export const Data = createContext();

const DataProvider = (props) => {
    // LANDING CHECK
    const [landingDone, setLandingDone] = useState(true); // ROJAS change to false

    return (
        <Data.Provider
            value={{
                // LANDING CHECK
                landingDone,
                setLandingDone,
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
