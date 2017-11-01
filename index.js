var express = require('express');
var config = require('./config');
var compression = require('compression');
var minify = require('express-minify');
var multiparty = require('connect-multiparty');
var port = process.env.PORT || config.PORT;
var app = express();

app.use(compression());
/**
 * Dont minify already minified files
 */
app.use(function(req, res, next) {
    if (/\.min\.(css|js)$/.test(req.url)) {
        res.minifyOptions = res.minifyOptions || {};
        res.minifyOptions.minify = false;
    }
    next();
});

app.use(minify());
app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});
app.listen(port);