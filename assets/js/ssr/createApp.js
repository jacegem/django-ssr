import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const createApp = (name, Component, reducer, parseInitial=() => {}) => {
    if (typeof document == 'undefined') {
        // on server rendering to embed in html response
        global[`${name}ServerRender`] = data => {
            const store = createStore(reducer, parseInitial(data), applyMiddleware(thunk));
            return {
                html: renderToString(<Provider store={store}><Component /></Provider>),
                initialState: store.getState(),
            };
        };
    } else {
        // on client bootstrapping from embedded initial state
        const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const initialState = JSON.parse(window.__INITIAL_STATE__);
        const store = createStore(reducer, initialState, enhancers(applyMiddleware(thunk)));
        render(
            <Provider store={store}><Component /></Provider>,
            document.getElementById(name)
        );
    }
};

export default createApp;
