
exports.apiPostEvent = {
  "eventType": "api_post_event",
  "timestamp": "2014-03-01T23:29:30.158Z",
  "clientIp": "0:0:0:0:0:0:0:1",
  "uri": "/v2/apps/my-app",
  "appDefinition": {
    "args": [],
    "backoffFactor": 1.15,
    "backoffSeconds": 1,
    "cmd": "sleep 30",
    "constraints": [],
    "container": null,
    "cpus": 0.2,
    "dependencies": [],
    "disk": 0.0,
    "env": {},
    "executor": "",
    "healthChecks": [],
    "id": "/my-app",
    "instances": 2,
    "mem": 32.0,
    "ports": [10001],
    "requirePorts": false,
    "storeUrls": [],
    "labels": {
        "envrionment": "dev"
    },
    "upgradeStrategy": {
        "minimumHealthCapacity": 1.0
    },
    "uris": [],
    "user": null,
    "version": "2014-09-09T05:57:50.866Z"
  }
};
