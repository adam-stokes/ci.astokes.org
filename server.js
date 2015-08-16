"use strict";

import Hapi from "hapi";

let server = new Hapi.Server();
server.connection({port: process.env.PORT || 8082});

server.register({
    register: require("vision")
}, err => {
    if(err) {
        throw err;
    }
});

server.views({
    engines: {
        jade: require("jade")
    },
    relativeTo: __dirname,
    path: "./templates"
});


server.register({
    register: require("good"),
    options: {
        reporters: [{
            reporter: require("good-console"),
            events: {
                response: "*",
                log: "*"
            }
        }]
    }
}, err => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
});

export default server;
