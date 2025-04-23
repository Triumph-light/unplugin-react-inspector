
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Overlay/Overlay.tsx';

const CONTAINER_ID = 'react-inspector-container'

function createInpectorContainer() {
    if(document.getElementById(CONTAINER_ID) !== null) {
        throw new Error('react-inspector-container already exists')
    }
    const el = document.createElement('div');
    el.setAttribute('id', CONTAINER_ID)
    document.body.appendChild(el)
    return el
}

function loadContainer() {
    createInpectorContainer()
    createRoot(document.getElementById(CONTAINER_ID)).render(<App></App>)
}

loadContainer()