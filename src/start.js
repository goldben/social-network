import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome';
import {Site} from './site';


let elem;

if (location.pathname == '/') {
    elem = <Welcome />
} else if (location.pathname == '/site') {
    elem = <Site />
} else {
    elem = <img src="img/logo.jpg" alt='jvjh' />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
