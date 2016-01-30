#!/usr/bin/env node
'use strict';

module.exports.exec = function() {
    const depRep = require("dep-rep");
    const express = require('express');

    const app = express();

    var stringifyError = function (err) {
        var plainObject = {};
        Object.getOwnPropertyNames(err).forEach(function (key) {
            plainObject[key] = err[key];
        });
        return JSON.stringify(plainObject);
    };

    function getLocals() {
        return require('./locals');
    }

    app.get('/dep-rep', function (req, res) {
        if (req.query.remote && req.query.remote.indexOf('https://') == 0) {
            depRep.analyze({p: req.query.remote})
                .then(function (data) {
                    return res.json(data);
                });
        } else {
            res.json(stringifyError(new Error("Only https:// url's are supported for remote")));
        }
    });

    app.get('/dep-rep/locals', function (req, res) {
        try {
            res.json({locals: Object.keys(getLocals())});
        }
        catch (err) {
            res.json(stringifyError(err));
        }
    });

    app.get('/dep-rep/local/:local', function (req, res) {
        try {
            var pathToLocalJson = getLocals()[req.params.local];

            if (!pathToLocalJson) {
                return res.json(stringifyError(new Error("Requested local was not defined in locals.json.")));
            }

            depRep.analyze({p: pathToLocalJson})
                .then(function (data) {
                    return res.json(data);
                });
        }
        catch (err) {
            res.json(stringifyError(err));
        }
    });

    app.listen(3000);
    console.log("The druids are serving localhost:3000");
};