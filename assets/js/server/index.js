// mock browser specific globals when rendering server side
if (typeof window == 'undefined') {
    global.window = {};
    global.jQuery = { fn: {} };
    global.$ = { fn: {} };
}

// load all the server bundles for selection in handler
const path = require('path').join(__dirname, 'bundles');
require('fs').readdirSync(path).forEach(bundle => {
    bundle.endsWith('.js') && require(`./bundles/${bundle}`);
});

// aws lambda function 'renderReact'
exports.handler = function(event, context, callback) {
    const { app, props } = event;
    callback(null, global[`${app}ServerRender`](props));
};
