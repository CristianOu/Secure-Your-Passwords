const express = require('express');
const dbService = require('./database');
const admin = require('firebase-admin');
const fs = require("fs");
const app = express();
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require('./crypto');

// CSRF Protection 
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfMiddleware = csrf({ cookie: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(csrfMiddleware);

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const sideBar = fs.readFileSync(__dirname + "/public/side-bar/side-bar.html", "utf-8");
const mainPage = fs.readFileSync(__dirname + "/public/main-page/main-page.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create-modal/create-modal.html", "utf-8");
const deleteAccount = fs.readFileSync(__dirname + "/public/delete-modal/delete-modal.html", "utf-8");
const edit = fs.readFileSync(__dirname + "/public/edit-modal/edit-modal.html", "utf-8");
const notification = fs.readFileSync(__dirname + "/public/notification-modal/notification-modal.html", "utf-8");
const login = fs.readFileSync(__dirname + "/public/login/login.html", "utf-8");

// Prerequisite for every http request (cookie setup to prevent CSRF)
app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
})

// Authentication
app.post('/login', (req, res) => {
    console.log(req.body);
    res.send({token: req.body});
}) 

// UI Calls
app.get('/', (req, res) => {
    res.send(header + sideBar + mainPage + create + deleteAccount + edit + notification + footer);
}); 

app.get('/login', (req, res) => {
    res.send(header + login + footer);
});

// API Calls
app.get('/getUsers', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getUsers();
    result.then(data => {
        res.json({users: data});
    })
    .catch(err => {
        console.log(err);
    });;
});

app.get('/getOneUser/:id', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAccount(req.params.id);
    result.then(data => {
        res.json({account: data});
    })
    .catch(err => {
        console.log(err);
    });;
});

app.get('/getAccounts', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getAccounts();
    result.then(data => {
        res.send({accounts: data});
    })
    .catch(err => {
        console.log(err);
    });;
});

//create account
app.post('/createAccount', async (req, res) => {
    const cryptoPassword = encrypt(req.body.password);
    console.log(cryptoPassword);
    const text = decrypt(cryptoPassword);
    console.log(text);

    const newAccount = {
        user_id: 1,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        details: req.body.details || '',
        logo_upload: '',
        logo_url: '',
    };
    console.log(newAccount);

    const db = dbService.getDbServiceInstance();

    const result = db.createAccount(newAccount);
    
    result.then(id => {
        res.send({id}); 
    })
    .catch(err => {
        console.log(err);
    });
});


app.patch('/editAccount', (req, res) => {
    if (req.body.updatedPassword) {
        updatedAccount.last_updated = new Date();
    }
    const updatedAccount = {
        id: req.body.id,
        user_id: 1,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        details: req.body.details || '',
        logo_upload: '',
        logo_url: '',
        last_updated: req.body.last_updated
    };

    // console.log(updatedAccount);

    const db = dbService.getDbServiceInstance();

    const result = db.updateAccount(updatedAccount);
    result.then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    });

});

//delete account
app.delete('/deleteAccount/:id', (req, res) => {
    const id = req.params.id;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteAccount(id);
    result.then(data => {
        res.json({data});
    });
}); 

// Firebase Admin
const serviceAccountKey = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://your-passwords-9900c-default-rtdb.europe-west1.firebasedatabase.app"
});

const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("App listening on localhost :", server.address().port);
});
