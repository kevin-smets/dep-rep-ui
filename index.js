#!/usr/bin/env node
'use strict';

const http = require('http');

const finalhandler = require('finalhandler');
const fs = require('fs-extra');
const depRep = require("dep-rep");
const open = require("open");
const serveStatic = require("serve-static");

depRep.analyze({})
    .then(function (data) {
        console.log(JSON.stringify(data, null, 2));

        fs.outputFile("./www/result.js",
            "function getReport(){return " +
            JSON.stringify(data) +
            "};"
            , function (err) {
                if (err) {
                    console.log(err);
                }

                // Serve www
                var serve = serveStatic('www', {'index': ['index.html']});

                // Create server
                var server = http.createServer(function (req, res) {
                    var done = finalhandler(req, res);
                    serve(req, res, done)
                });

                open("./www/index.html");

                // Listen
                server.listen(3000);
            });
    })
    .catch(function (err) {
        console.log(err);
    });