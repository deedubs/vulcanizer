
const camel = require('to-camel-case');

class Vulcanizer {

    constructor(domain, vulcan) {

        this.domain = domain;
        this.vulcan = vulcan;
    }

    process(payload) {

        let method = Vulcanizer.determineMethod(payload);

        return this[method](payload);
    }

    apiPost(payload) {

        let {hostname, env} = Vulcanizer.extractFqdnInfo(payload);
        let fqdn = [hostname, env, this.domain].join('.');

        return Promise.all([this.vulcan.addHost(fqdn, {}),
                            this.vulcan.addFrontend(fqdn, {})]);
    }

    statusUpdate(payload) {

        let status = camel(payload.taskStatus);
        let failedStatuses = new Set(['taskFinished',
                                      'taskFailed',
                                      'taskKilled',
                                      'taskLost']);

        if (status = 'taskRunning') {

            let {backend, serverId, url} = Vulcanizer.extractServerInfo(payload);

            return this
                .vulcan
                .addServer(backend, serverId, url);

        } else if (failedStatuses.has(status)) {

            let {backend, serverId} = Vulcanizer.extractServerInfo(payload);

            return this
                .vulcan
                .removeServer(backend, serverId);
        }
    }

    static determineMethod(payload) {
        let eventType = payload.eventType;

        return camel(eventType.substr(0, eventType.length - 6));
    }

    static extractFqdnInfo(payload) {

        let labels = payload.appDefinition.labels;
        let env = labels.envrionment || labels.env;
        let hostname = labels.hostname || payload.uri.split('/').pop();

        return {hostname, env};
    }

    static extractServerInfo(payload) {

        let backend = camel(payload.appId);
        let serverId = camel((payload.taskId || "").split('_').shift())
        let port = payload.ports && payload.ports[0] || 80;

        let url = ['http://',
                   payload.host,
                   ':',
                   port].join('');

        return {backend, serverId, url};
    }
}

module.exports = Vulcanizer;
