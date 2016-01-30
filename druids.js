#!/usr/bin/env node
'use strict';

const depRep = require("dep-rep");
const express = require('express');

const app = express();

var stringifyError = function(err) {
    var plainObject = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
        plainObject[key] = err[key];
    });
    return JSON.stringify(plainObject);
};

app.get('/dep-rep', function (req, res) {
    var options = {};

    var path = req.query.p;

    if (path && path.indexOf('https://') == 0) {
        options.p = path;
        depRep.analyze(options)
            .then(function (data) {
                res.json(data);
            });
    } else {
        res.json(stringifyError(new Error("herb")));
    }
});

app.listen(3000);