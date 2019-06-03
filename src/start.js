import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome';

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />
} else {
    elem = <img src="img/logo.jpg" alt='jvjh' />
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
