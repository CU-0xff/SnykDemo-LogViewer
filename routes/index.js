var express = require('express');
var router = express.Router();
//var fs = require('fs');
var filesystem = require('fs');

var mysql = require('mysql');

/* BAD FUNCTION - USES HARDCODED CREDENTIALS */
var dbCon = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET LOG ENTRY FILE BASED ON FILE NAME */
/* BAD FUNCTION - TRIGGERS TAINT ANALYSIS */
router.get('/logFile', function(req, res) {
//  var logFileName = req.query.file || 'standard_log.log';
    var generalLogFileName = req.query.file || 'standard_log.log';
    
//  var logfile = fs.readFile(logFileName, "utf8", function(err, data) {
    var handleLogFile = filesystem.readFile(generalLogFileName, "utf8", function(err, data) {
    if (err) throw err;
    res.render('logEntries', data);
  });
});
 

/* GET LOG ENTRIES BASED ON SELECTED NODE */
/* BAD FUNCTION - TRIGGERS TAINT ANALYSIS */
router.get('/logEntries', function(req, res) {
  var node = req.query.node || "Node0";

  var db = req.db;

  var collection = db.get(node);

  collection.find({}).then(function(docs) {
    res.render('logEntries', {"nodeName" : node, "log" : docs});
  });
});


module.exports = router;
