const express = require('express');
const dbService = require('./database');
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const sideBar = fs.readFileSync(__dirname + "/public/side-bar/side-bar.html", "utf-8");
const mainPage = fs.readFileSync(__dirname + "/public/main-page/main-page.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create-modal/create-modal.html", "utf-8");
const deleteAccount = fs.readFileSync(__dirname + "/public/delete-modal/delete-modal.html", "utf-8");

// UI Calls
app.get('/', (req, res) => {
    res.send(header + sideBar + create + deleteAccount + mainPage + footer);
}); 


// API Calls
app.get('/getUsers', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getUsers();
    result.then(data => {
        res.json({users: data});
    });
});

app.get('/getAccounts', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getAccounts();
    result.then(data => {
        res.send({accounts: data});
    });
});

//create account
app.post('/createAccount', (req, res) => {
    console.log("account created");
    // console.log(req.body);
    let daytime = new Date();
    // console.log(daytime.getDate());
    const newAccount = {
        user_id: 1,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        details: req.body.details || '',
        logo_upload: '',
        logo_url: '',
    };

    const db = dbService.getDbServiceInstance();

    const result = db.createAccount(newAccount);
    result.then(data => {
        console.log(data);
    });
    
});


//delete account
app.delete('/deleteAccount/:id', (req, res) => {
    const id = req.params.id;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteAccount(id);
    result.then(data => {
        console.log(data);
    });
    // res.send(req.params.id);
    // console.log("Delete backend");
}); 




const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("App listening on localhost :", server.address().port);
});