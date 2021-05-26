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

setInterval(keepAlive, 300000);
function keepAlive() {
    connection.query('SELECT 1');
    console.log("I will survive!");
    return;
}

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getUsers() {
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

    async getAccounts() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM accounts";

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

    async createAccount(newAccount) {
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO accounts (user_id, name, username, " 
                    + "password, details, last_updated, logo_upload, logo_url) "
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

                connection.query(query, [newAccount.user_id, newAccount.name, newAccount.username, 
                    newAccount.password, newAccount.details, dateAdded, 
                    newAccount.logo_upload, newAccount.logo_url] , (error, result) =>{
                    if(error) reject (new Error(error.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = DbService;