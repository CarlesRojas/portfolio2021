import React, { useRef, useEffect, useState } from "react";

// Components
import Background from "components/Background";

export default function SplashScreen() {
    // Splash screen reference & state
    const splashScreenRef = useRef(null);
    const [splashScreenDiv, setSplashScreenDiv] = useState(null);

    // #################################################
    //   COMPONENT MOUNT
    // #################################################

    // On componente mount
    useEffect(() => {
        setSplashScreenDiv(splashScreenRef.current);
    }, [splashScreenRef]);

    // #################################################
    //   RENDER
    // #################################################

    return (
        <div className="splashScreen" ref={splashScreenRef}>
            <Background parent={splashScreenDiv} />
        </div>
    );
}
