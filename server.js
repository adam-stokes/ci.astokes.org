"use strict";

require("babel/polyfill");
import Hapi from "hapi";
import Good from "good";
import Yar from "yar";

let server = new Hapi.Server();
server.connection({
    port: 8080
});

let yarOpts = {
    cookieOptions: {
        password: "tehehehhohaheae",
        clearInvalid: true,
        isSecure: false
    }
};

server.register({
    register: Yar,
    options: yarOpts
}, err => {
    if (err) {
        throw err;
    }
});

server.views({
    engines: {
        jade: require("jade")
    },
    relativeTo: __dirname,
    path: "./templates",
    context: {}
});

server.register({
    register: Good,
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

    server.start(() => {
        server.log("info", "Server running at: " + server.info.uri);
    });
});
