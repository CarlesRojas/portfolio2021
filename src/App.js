import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Pages
import Landing from "pages/Landing";

// Components
import Cursor from "components/Cursor";

export default function App() {
    return (
        <div className="app">
            <Cursor />

            <Router>
                <Switch>
                    {/* ################################# */}
                    {/*   LANDING PAGE                    */}
                    {/* ################################# */}
                    <Route path="/" component={Landing} exact></Route>
                </Switch>
            </Router>
        </div>
    );
}
