const http = require('http');
const url = require('url');

const port = 3000;


http.createServer((req, res) => {
    let method = req.method;
    let params = url.parse(req.url, true).query;
    
    let airlines = [];
    let responseCounter = 0;
    let results = [];
    
    if(method == 'GET' && params.dep) {
        if(params.squeezyjet) {
            airlines.push('squeezyjet');
        }
        if(params.brianair) {
            airlines.push('brianair');
        }
        if(params.axelairways) {
            airlines.push('axelairways');
        }
        
        for(airline of airlines) {
            http.get('http://localhost:3001/' + airline + '/flights?dep=' + params.dep, (response) => {
                let data = '';
                
                response.on('data', (chunk) => {
                   data += chunk; 
                });
                
                response.on('end', (() => {
                    console.log(data);
                    results.push(JSON.parse(data));
                    responseCounter++;
                    
                    if(responseCounter == airlines.length) {
                        console.log('Responding');
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(results));
                        console.log('Response sent: ' + results);
                    }
                }));
            });
        }
    }
}).listen(port);