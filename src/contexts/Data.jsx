import React, { createContext, useState, useRef } from "react";

// Data Context
export const Data = createContext();

const DataProvider = (props) => {
    // LANDING CHECK
    const [landingDone, setLandingDone] = useState(true); // ROJAS change to false

    // BACKGROUND POSITION
    const positionRef = useRef({ x: 0, y: 0 });
    const speedRef = useRef({ x: 0, y: 0 });
    const motion = useRef({ alpha: 0, beta: 0 });
    const prevMotion = useRef({ alpha: 0, beta: 0 });

    return (
        <Data.Provider
            value={{
                // LANDING CHECK
                landingDone,
                setLandingDone,

                // BACKGROUND POSITION
                positionRef,
                speedRef,
                motion,
                prevMotion,
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
