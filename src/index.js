
const pkg = require('../package.json');
const handlers = require('./handlers');
const Processor = require('./processor');
const Vulcanproxy = require('./vulcanproxy');

exports.register = (server, options, ready) => {

    server.expose('processor', new Processor(process.env.BASE_DOMAIN, new Vulcanproxy()));

    server.route({
        method: 'POST',
        path: '/event-bus',
        config: handlers.create
    });

    ready();
};

module.exports.register.attributes = {pkg};
