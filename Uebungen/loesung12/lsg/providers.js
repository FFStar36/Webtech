const express = require('express');
const url = require('url');

const app = express();
const port = 3001;

var squeezy = [
    {airline: 'SqueezyJet', num: 'EZ1330', dep: 'BERLIN', dest: 'DUBLIN', date: '31-01-2020', time: '10:00'},
    {airline: 'SqueezyJet', num: 'EZ1334', dep: 'DUBLIN', dest: 'BERLIN', date: '31-01-2020', time: '11:00'},
    {airline: 'SqueezyJet', num: 'EZ1336', dep: 'LONDON', dest: 'BERLIN', date: '31-01-2020', time: '10:00'}
];

var brian = [
    {airline: 'BrianAir', num: 'BR1991', dep: 'BERLIN', dest: 'PARIS', date: '31-01-2020', time: '09:30'},
    {airline: 'BrianAir', num: 'BR1995', dep: 'DUBLIN', dest: 'LONDON', date: '31-01-2020', time: '11:00'},
    {airline: 'BrianAir', num: 'BR1997', dep: 'LONDON', dest: 'PARIS', date: '31-01-2020', time: '08:00'}
];

var axel = [
    {airline: 'AxelAirways', num: 'AX1230', dep: 'BERLIN', dest: 'LONDON', date: '31-01-2020', time: '10:00'},
    {airline: 'AxelAirways', num: 'AX1234', dep: 'DUBLIN', dest: 'PARIS', date: '31-01-2020', time: '11:00'},
    {airline: 'AxelAirways', num: 'AX1236', dep: 'LONDON', dest: 'BERLIN', date: '31-01-2020', time: '10:00'}
];

function processReq(flights, req, res) {
    var params = url.parse(req.url, true).query;
    var dep = params.dep;
    if(dep) {
        for(flight of flights) {
            if(flight.dep == dep.toUpperCase()) {
                console.log(flight);
                res.json(flight);
                return;
            }
        }
        console.log(`404: Departure airport not found (${dep})`);
        res.status(404).send('404: Departure airport not found');
    } else {
        console.log('400: Invalid request parameters');
        res.status(400).send('400: Invalid request parameters');
    }
}

app.get('/squeezyjet/flights', (req, res) => {
    processReq(squeezy, req, res);
});

app.get('/brianair/flights', (req, res) => {
    processReq(brian, req, res);
});

app.get('/axelairways/flights', (req, res) => {
    processReq(axel, req, res);
});

app.listen(port, () => console.log(`Express server listening on port ${port}...`));