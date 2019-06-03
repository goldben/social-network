import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Registration } from './registration';
import { Login } from './login';

export function Site() {
    return (
        <div className="wrapper">
		<div>
            <h1 className="title">Discover BrainDead</h1>
		</div>
		<img className="welcome-image" src="/img/logo.jpg" />
		<img className="welcome-image" src="/img/logo.jpg" />
        </div>
    );
}
