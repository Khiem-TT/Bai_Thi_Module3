const http = require('http');
const url = require('url');
const qs = require('qs');
const mysql = require('mysql');
const ListHomeStayController = require('./src/controllers/listHomeStay.controller');

const PORT = 8000;


const app = http.createServer((req, res) => {
    const pathUrl = url.parse(req.url).pathname;
    switch (pathUrl) {
        case '/':
            ListHomeStayController.getListHomeStay(req, res).catch(err => {
                console.log(err);
            })
            break;
        case '/homestay/detail':
            ListHomeStayController.getHomestayDetail(req, res).catch(err => {
                console.log(err);
            })
            break;
        case '/addhomestay':
            ListHomeStayController.addHomestay(req, res).catch(err => {
                console.log(err);
            })
            break;
    }
})

app.listen(PORT, () => {
    console.log('server running on http://localhost:' + PORT);
});