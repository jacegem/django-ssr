const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// mock browser specific globals when rendering server side
if (typeof window == 'undefined') {
    global.window = {};
    global.jQuery = { fn: {} };
    global.$ = { fn: {} };
}

// load all the js server bundles for selection in handler
const stats = require('../../../webpack-stats.server.json');
if (stats && stats.chunks) {
    // ensure the stats have been written
    Object.keys(stats.chunks).forEach(chunk => {
        stats.chunks[chunk].forEach(({ name }) => {
            name.endsWith('.js') && require(`../../server/${name}`);
        });
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// locally serve back rendered react output for a given app and props
app.post('/', (req, res) => {
    const { app, props } = req.body;
    res.send(global[`${app}ServerRender`](props));
});

app.listen(8001);
