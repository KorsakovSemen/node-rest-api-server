const express = require('express');
const cors = require('cors');
const app = express();

var whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://DESKTOP-B3C9TR9:3001']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  
  
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);