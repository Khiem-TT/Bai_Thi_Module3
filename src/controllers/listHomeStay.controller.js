const BaseController = require('./base.controller');
const ListHomeStayModel = require('./../models/listHomeStay.model');
const qs = require('qs');
const url = require('url');

class ListHomeStayController extends BaseController{
    async getListHomeStay(req, res){
        let list = await ListHomeStayModel.getHomeStay();
        let newHtml = '';
        list.forEach((homestay,index) => {
            newHtml += "<tr>";
            newHtml += `<td>${index + 1}</td>`;
            newHtml += `<td><a href="/homestay/detail?id=${homestay.id}">${homestay.name}</a></td>`;
            newHtml += `<td>${homestay.city}</td>`;
            newHtml += `<td>${homestay.price.toLocaleString()} VNĐ</td>`;
            newHtml += `<td><button type="submit">Sửa</button></td>`;
            newHtml += `<td><button type="submit">Xoá</button></td>`;
            newHtml += "<tr>";
        })

        let html = await this.getTemplate('./src/views/ListHomeStay.html');
        html = html.replace('{list-homestay}', newHtml)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
    async getHomestayDetail(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        let homestay = await ListHomeStayModel.getHomestayDetail(id);
        let name = homestay[0].name;
        let city = homestay[0].city;
        let bedRoom = homestay[0].bedRoom;
        let bathRoom = homestay[0].bathRoom;
        let price = homestay[0].price;
        let description = homestay[0].description;
        let html = await this.getTemplate('./src/views/HomeStayDetail.html');
        html = html.replace('{Name1}', name);
        html = html.replace('{Name2}', name);
        html = html.replace('{City}', city);
        html = html.replace('{BedRoom}', bedRoom);
        html = html.replace('{BathRoom}', bathRoom);
        html = html.replace('{Price}', price);
        html = html.replace('{Description}', description);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
    async addHomestay(req, res) {
        if (req.method === 'GET') {
            let html = await this.getTemplate('./src/views/AddHomestay.html');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let html = await this.getTemplate('./src/views/AddHomestay.html');
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                data = qs.parse(data);
                let name = data.name;
                let city = data.city;
                let bedRoom = data.bedRoom;
                let bathRoom = data.bathRoom;
                let price = data.price;
                let description = data.description;
                ListHomeStayModel.addHomestay(name, city, bedRoom, bathRoom, price, description).catch(err => {
                    console.log(err);
                });
                res.writeHead(301, {location: '/'});
                res.end();
            });
            req.on('error', () => {
                console.log('error');
            });
        }
    }
}

module.exports = new ListHomeStayController();