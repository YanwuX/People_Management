var express = require('express');
var router = express.Router();
var empData = require('../models/empSchema');

/* GET employees listing. */
router.use(function(req, res, next) {
    // do logging
    console.log('Initiating...');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET employees listing. */
router
    .get("/emp/", function(request, response) {
        console.log("getting all employees");
        empData.find(function(err, empData) {
            if (err)
                response.send(err);

            response.json(empData);
        });
    })  
    .get('/emp/:id', function(request, response) {
        console.log("getting employee by id");
        console.log(request.params.id);
        empData.findById(request.params.id, function(err, empData) {
            if (err)
                response.send(err);

            response.json(empData);
        });
    })
    .get("/emp/:id/next/", function(request, response) {
        console.log("getting next 10 employees");
        console.log(request.url);
        var id = (request.params.id.length != 9) ? { "_id": { "$lt": request.params.id }} : "";
        console.log(id);
        empData.find(id)
            .sort({ "_id": -1 })
            .limit(10)
            .exec(function(err, empData) {
                response.json(empData);
        });
    }) 
    .get("/emp/:id/managers/", function(request, response) {
        console.log("getting available reassign managers");
        console.log(request.params.id);

        empData.find(function(err, empData) {
            if (err)
                response.send(err);
        var getAvailableManager = function (empData, target) {
            var count = 0;
            for(var i = 0; i < empData.length; i++) {
                if(empData[i].manager == target || empData[i]._id == target) empData.splice(i ,1);
                // if(!setTimeout(checkAvailablity(empData[i], target), 0)) empData.splice(i,1);
                if(!checkAvailablity(empData[i], target), 0) empData.splice(i,1);
            }
        };

        var checkAvailablity = function(emp, target) {
            if(emp == undefined) return true;
            if(emp.manager == target) return false;
            else checkAvailablity(emp.manager, target);
        };
        getAvailableManager(empData, request.params.id);
        // console.log(empData);
        response.json(empData);
        });
    })
    .get("/emp/:id/dirReports/", function(request, response) {
        console.log("getting direct reports");

        empData.find({manager : request.params.id}, function(err, empData) {
            if (err)
                response.send(err);
            response.json(empData);
        });
    })
    .put("/emp/:id", function(request, response) {
        console.log("input");
        console.log(request.body);
        console.log(request.body.manager);
        console.log(request.params.id);

        if(request.params.id.length == 9) {
            console.log("in creating new employee...");
                empData.create(request.body, function(err, res) {
                    if (err)
                        response.send(err);
                    response.json(res);
                });

        }
        else {
            console.log("in updating existing employee...");

            empData.findByIdAndUpdate(request.params.id, request.body, function(err, res) {
                if (err)
                    response.send(err);
                response.json(res);
            });
        }
    })
    .delete("/emp/:id", function(request, response) {
        console.log("in delete");
        console.log("request url" + request.url);
        console.log("request id" + request.params.id);

        empData.findByIdAndRemove(request.params.id, function(err, res) {
            if (err)
                response.send(err);
            response.json(res);
        });
    });

module.exports = router;
