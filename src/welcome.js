import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";

export function Welcome() {
    return (
        <div className="welcome-wrapper">
            <div>
                <h1 className="title">Welcome to BrainDead</h1>
                <img className="welcome-image" src="/img/logo.jpg" />
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
