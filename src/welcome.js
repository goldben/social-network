import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";

export function Welcome() {
    return (
        <div className="welcome-wrapper">
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
