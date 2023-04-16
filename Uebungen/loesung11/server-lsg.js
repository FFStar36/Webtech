// Node-Module, die wir einbinden und benutzen
const http = require('http');
const url = require('url');
const qs = require('querystring');

// der Port, auf dem unser Server laufen soll
const port = 3000;

// unsere Daten, die vom Client durch HTTP-Requests manipuliert werden
let data = {
    0: {
        id: 0,
        modul: 'Webtechnologien',
        prof: 'Axel Küpper',
        ects: 6
    },
    1: {
        id: 1,
        modul: 'Spanish Cuisine',
        prof: 'Umberto del Casa',
        ects: 3
    }
};

console.log(data);

let idCounter = 2;

// mit http.createServer() wird ein neuer HTTP server instanziiert
// übergeben wird eine Callback-Funktion, die asynchron bei jedem empfangenen HTTP-Request aufgerufen wird
// diese Funktion hat als Parameter den empfangenen HTTP-Request und den zugehörigen Response
// der Response muss durch die Callback-Funktion gefüllt und abgeschickt werden
http.createServer(function(req, res) {
    let method = req.method;
    let query = url.parse(req.url, true).query;
    let body = '';
    
    console.log(method + ": " + JSON.stringify(query));
    
    // die entsprechenden HTTP-Methoden sollen natürlich unterschiedlich verarbeitet werden
    switch(method) {
        case 'OPTIONS':
            // mit writeHead() wird der Header des HTTP-Responses definiert
            res.writeHead(204, {'Allow': 'OPTIONS, GET, POST, PUT, DELETE'});
            // mit end() wird der HTTP-Response abgeschlossen und verschickt
            res.end();
            break;
        case 'GET':
            if(!query.id) {
                res.writeHead(200, {'Content-Type': 'text/json'});
                // mit write() werden Daten in den Response-Body geschrieben (kann mehrmals aufgerufen werden)
                res.write('{ids: ' + JSON.stringify(Object.keys(data)) + '}');
                res.end();
            } else if(data[query.id]) {
                res.writeHead(200, {'Content-Type': 'text/json'});
                // man kann auch direkt mit end() Daten in den Body schreiben
                res.end(JSON.stringify(data[query.id]));
            } else {
                res.writeHead(404);
                res.end();
            }
            break;
        case 'POST':
            body = '';
            // der Request-Body muss stückchenweise gelesen und zusammengesetzt werden (asynchron)
            req.on('data', chunk => {
                body += chunk.toString();
            });
            // 'end' signalisiert das Ende vom Request-Body, jetzt kann damit gearbeitet werden
            req.on('end', () => {
                if(body.length > 0) {
                    
                    console.log(body);
                    let newData = qs.parse(body);
                    console.log(newData);
                    
                    // sicherstellen, dass alle geforderten Daten vorhanden und korrekt formatiert sind
                    if(!newData.modul || !newData.prof || !newData.ects || isNaN(newData.ects)) {
                        res.writeHead(400);
                        res.end();
                    } else {
                        let newId = idCounter++;
                        data[newId] = {
                            id: newId,
                            modul: newData.modul,
                            prof: newData.prof,
                            ects: newData.ects
                        }                    
                        res.writeHead(201, {'Content-Type': 'text/json'});
                        res.end(JSON.stringify({id: newId}));
                    }          
                } else {
                    res.writeHead(400);
                    res.end();
                }
            });
            break;
        case 'PUT':
            body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                if(body.length > 0) {
                    
                    console.log(body);
                    let newData = qs.parse(body);
                    console.log(newData);
                    
                    // sicherstellen, dass alle geforderten Daten vorhanden und korrekt formatiert sind
                    if(!newData.id || isNan(newData.id)|| !newData.modul || !newData.prof || !newData.ects || isNaN(newData.ects)) {
                        res.writeHead(400);
                        res.end();
                    } else if(data[newData.id]) {
                        data[newData.id] = newData;
                        res.writeHead(200);
                        res.end();
                    } else {                      
                        res.writeHead(404);
                        res.end();
                    }
                } else {
                    res.writeHead(400);
                    res.end();
                }
            });
            break;
        case 'DELETE':
             if(!query.id) {
                res.writeHead(400);
                res.end();
            } else if(data[query.id]) {
                delete data[query.id];
                res.writeHead(200);
                res.end();
            } else {
                res.writeHead(404);
                res.end();
            }
            break;
        default:
            res.writeHead(405);
            break;
    }
}).listen(port); // der Server ist instanziiert, nun lassen wir ihn auf dem gegebenen Port lauschen

console.log('Server listening on port ' + port);