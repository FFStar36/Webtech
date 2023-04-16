var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flights = require('./flights/controller');

var app = express();

// übersetzt die Cookies in ein JSON-Objekt (req.cookies)
app.use(cookieParser());

// übersetzt den Request Body in ein JSON-Objekt (req.body)
app.use(bodyParser.urlencoded({extended: true}));

// Logger (Aufgabe 1.1)
app.use((req, res, next) => {
    // dient hauptsächlich dazu, die verschiedenen properties des request-Objekts zu demonstrieren
    console.log(
        `${req.method} 
        - Path: ${JSON.stringify(req.path)} 
        - Query: ${JSON.stringify(req.query)} 
        - Cookies: ${JSON.stringify(req.cookies)} 
        -  Body: ${JSON.stringify(req.body)}`);
    next();
});

// statischer Inhalt (Aufgabe 1.2)
app.use('/', express.static('html'));

// Beispiel für den Import eines Moduls, das mehrere MW-Funktionen enthält (Aufgaben 1.3 - 1.7)
flights('/flights', app);

app.listen(80);