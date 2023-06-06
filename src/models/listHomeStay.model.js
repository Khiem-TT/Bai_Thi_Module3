const BaseModel = require("./base.model");
class ListHomeStayModel extends BaseModel {
    async getHomeStay() {
        let sql = `SELECT * FROM homestayInfo;`;
        return await this.querySql(sql);
    }
    async getHomestayDetail(id) {
        let sql = `SELECT * FROM homestayInfo WHERE id = ${id};`;
        return await this.querySql(sql);
    }
    async addHomestay(name, city, bedRoom, price, bathRoom, description) {
        let sql = `INSERT INTO homestayInfo(name, city, bedRoom, price, bathRoom, description) values('${name}', '${city}', ${bedRoom}, ${price}, ${bathRoom}, '${description}');`;
        await this.querySql(sql);
    }
    async deleteHomestay(id) {
        let sql = `DELETE FROM homestayInfo where id = ${+id};`;
        await this.querySql(sql);
    }
}

module.exports = new ListHomeStayModel();