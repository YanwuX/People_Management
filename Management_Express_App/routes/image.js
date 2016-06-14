var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'public/images/')
    },
    filename: function(req, res, cb) {
        cb(null, req.params.id)
    }
});

var uploading = multer({
    storage: storage
});


router.route('/upload/:id')
    .post(uploading.single('file'), function(req, res) {
        console.log('image uploaded');
        // sharp(path.join(__dirname, 'public/uploads/', req.params.user_id + 'old')).resize(150, 200).crop(sharp.gravity.centre).toFile(path.join(__dirname, 'public/uploads/', req.params.user_id), function(err) {
        //     if (err) {
        //         throw err;
        //     }
        //     // output.jpg is a 300 pixels wide and 200 pixels high image
        //     // containing a scaled and cropped version of input.jpg

        // });
    });

router.route('/download/:id')
    .get(function(req, res) {
        console.log('image downloaded');
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + path.join(__dirname, '/public/images', req.params.id));
        res.sendFile(path.join(__dirname, '/public/images/', req.params.id));
    });

module.exports = router;
