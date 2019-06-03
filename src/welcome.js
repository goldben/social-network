import React from "react";
import { Registration } from "./registration";

export function Welcome() {
    return (
        <div className="wrapper">
		<div>
            <h1 className="title">Welcome to BrainDead</h1>
            <img className="welcome-image" src="/img/logo.jpg" />
		</div>
            <Registration />
        </div>
    );
}
