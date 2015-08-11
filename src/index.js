
const pkg = require('../package.json');
const Vulcanizer = require('./vulcanizer');
const Vulcanproxy = require('./vulcanproxy');

exports.register = (server, options, ready) => {

    let vulcanizer = new Vulcanizer(process.env.BASE_DOMAIN, new Vulcanproxy());

    server.route({
        method: 'POST',
        path: '/event-bus',
        handler: (request, reply) => {

            let payload = request.payload;

            vulcanizer
                .process(payload)
                .then(() => {

                    reply()
                        .code(204);
                });
        }
    });

    ready();
};

module.exports.register.attributes = {pkg};
