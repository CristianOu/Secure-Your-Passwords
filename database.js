require('dotenv').config(); //loads environment variables from a .env file into process.env
const mysql = require("mysql");
let instance = null;


const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD
  });

connection.connect(error => {
    if(error) {
        return console.log('error' + error.message);
    }

    console.log(connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = DbService;