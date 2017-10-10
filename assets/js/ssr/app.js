import React from 'react';
import { connect } from 'react-redux';

import { clickIt } from './actions';

const App = props => (
    <section className="app">
        <h2>have all the props given to react:</h2>
        <p>{JSON.stringify(props)}</p>
        <h2>action!</h2>
        <button onClick={props.clickIt}>click me!</button>
    </section>
);

export default connect(state => state, { clickIt })(App);
