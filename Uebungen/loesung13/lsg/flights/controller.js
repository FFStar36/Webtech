var db = require('./db');

module.exports = function(path, app) {

    // debug-PATCH, kein next() notwendig, da sofort geantwortet wird (Aufgabe 1.7)
    app.patch(path, (req, res) => {
        console.log("DEBUG PATCH")
        console.log(req.body.flightnumber);
        res.status(418).send();
    });

    // alle Flüge (Aufgabe 1.3)
    app.get(path, (req, res, next) => {
        res.locals.flights = db;
        next();
    });

    // Flug mit gegebener Flugnummer (Aufgabe 1.4)
    app.get(path + '/flightnumber/:flightnumber', (req, res, next) => {
        res.locals.flights = db.filter(x => x.flightnumber.toLowerCase() == req.params.flightnumber.toLowerCase());
        
        next();
    });


    // genauere Suche nach Start/Ziel/Datum (Aufgabe 1.5)
    app.get(path + '/:departure', (req, res, next) => {
        res.locals.flights = db.filter(x => x.departure.toLowerCase() == req.params.departure.toLowerCase());
        
        if(req.query.destination) {
            res.locals.flights = res.locals.flights.filter(x => x.destination.toLowerCase() == req.query.destination.toLowerCase());
        }
        
        next();
    });
    
    // Cookies! (Aufgabe 1.8)
    app.use(path + '*', (req, res, next) => {
        if(req.cookies.counter) {
            res.locals.flights = JSON.parse(JSON.stringify(res.locals.flights)); // object-array deep copy a la JS
            res.locals.flights.forEach(x => x.price += req.cookies.counter * 10);
            res.cookie('counter', parseInt(req.cookies.counter, 10) + 1);
        } else {
            res.cookie('counter', 1);
        }
        
        next();
    });

    // letzter Schritt (aka Wendepunkt im Middleware-Fluss): Abschicken
    app.use(path + '*', (req, res) => {
        if(res.locals.flights.length > 0) {
            res.send(JSON.stringify(res.locals.flights));
        } else {
            res.status(404).send();
        }
    });
}