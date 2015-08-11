
const Hapi = require('hapi');
const fixtures = require('./fixtures');
const {expect} = require('chai');

let server = new Hapi.Server();

server.connection();

server.register(require('../'), () => {});

describe('Vulcanizer', () => {

    it('should handle api_post_event events', () => {

        let req = {
            url: '/event-bus',
            method: 'POST',
            payload: fixtures.apiPostEvent
        };

        server
            .inject(req, (res) => {


                expect(res.statusCode).to.equal(204);
            });
    });

    it('should be able to respond to a stopped event');
});
