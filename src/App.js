import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import classnames from "classnames";

// Pages
import Landing from "pages/Landing";
import ProductDesign from "pages/ProductDesign";

// Components
import Cursor from "components/Cursor";
import Navbar from "components/Navbar";
import SplashScreen from "components/SplashScreen";

// Contexts
import { Data } from "contexts/Data";

export default function App() {
    // Contexts
    const { landingDone } = useContext(Data);

    // If landing not done, show the landing
    var landing = landingDone ? null : <Landing />;

    return (
        <div className={classnames("app", { landingDone })}>
            <Cursor />
            <SplashScreen />
            <Navbar />

            {landing}

            <Router>
                <Switch>
                    {/* ################################# */}
                    {/*   LANDING PAGE                    */}
                    {/* ################################# */}
                    <Route path="/" component={ProductDesign} exact></Route>
                </Switch>
            </Router>
        </div>
    );
}
