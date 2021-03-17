var express = require('express');
var router = express.Router();

function getRandomTimeStamp() {
    var day = Math.floor(Math.random() * 28);
    var month = Math.floor(Math.random() * 12);
    var year = Math.floor(Math.random() * 3) + 2016;
    var hours = Math.floor(Math.random() * 24);
    var minutes = Math.floor(Math.random() * 60);
    var seconds = Math.floor(Math.random() * 60);

    return new Date(year, month, day, hours, minutes, seconds, 0);
}

/* GET home page. */
router.get('/', function(req, res, next) {

    // Generate 20 Nodes with 50 Log Entries each 

    for(var i=0; i < 20; i++) {
        var collection = req.db.get('Node' + i);
        var data = [];
        for(var j=0; j < 50; j++) {
            var document = {
                timeStamp : getRandomTimeStamp().toTimeString(),
                reading : Math.floor(Math.random() * 100)
            };
            data.push(document);
        }

        collection.insert(data);

    }
  
  res.render('createDummyData', { title: 'Data Generation' });
  next();
});

module.exports = router;