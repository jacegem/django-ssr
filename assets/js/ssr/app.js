import React from 'react';
import { connect } from 'react-redux';

import { clickIt } from './actions';

const App = props => (
    <section className="app">
        <h2>inside react:</h2>
        <p>props: {JSON.stringify(props)}</p>
        <button onClick={props.clickIt}>click me!</button>
    </section>
);

export default connect(state => state, { clickIt })(App);
