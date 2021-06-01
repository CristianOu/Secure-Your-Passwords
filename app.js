const express = require('express');
const http = require('http');
const app = express();

const fs = require("fs");
// const bcrypt = require("bcrypt");
let server = http.createServer(app);
const io = require('socket.io')(server);
// const escapeHtml = require("html-escaper").escape;

const dbService = require('./database');
const { encrypt, decrypt } = require('./crypto');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( "public"));

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const sideBar = fs.readFileSync(__dirname + "/public/side-bar/side-bar.html", "utf-8");
const mainPage = fs.readFileSync(__dirname + "/public/main-page/main-page.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create-modal/create-modal.html", "utf-8");
const deleteAccount = fs.readFileSync(__dirname + "/public/delete-modal/delete-modal.html", "utf-8");
const edit = fs.readFileSync(__dirname + "/public/edit-modal/edit-modal.html", "utf-8");
const notification = fs.readFileSync(__dirname + "/public/notification-modal/notification-modal.html", "utf-8");
const liveChat = fs.readFileSync(__dirname + "/public/live-chat/live-chat.html", "utf-8");

// UI Calls
app.get('/', (req, res) => {
    res.send(header + sideBar + mainPage + create + deleteAccount + edit + notification + liveChat + footer);
}); 


// API Calls
app.get('/users', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getUsers();
    result.then(data => {
        res.json({users: data});
    })
    .catch(err => {
        console.log(err);
    });;
});

app.get('/account/:id', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAccount(req.params.id);
    result.then(data => {
        data = data.map(account => {
            const encryptedPasword = {
                iv: account.password_iv,
                content: account.password_content
            };
            const decryptedPassword = decrypt(encryptedPasword);

            return {
                id: account.id,
                user_id: account.user_id,
                name: account.name,
                username: account.username,
                password: decryptedPassword,
                details: account.details,
                last_updated: account.last_updated,
                logo_upload: account.logo_upload,
                logo_url: account.logo_url
            };
        });
        res.send({account: data});
    })
    .catch(err => {
        console.log(err);
    });;

});

app.get('/accounts', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const response = db.getAccounts();
    response.then(data => {

        data = data.map(account => {
            const encryptedPasword = {
                iv: account.password_iv,
                content: account.password_content
            };
            const decryptedPassword = decrypt(encryptedPasword);

            return {
                id: account.id,
                user_id: account.user_id,
                name: account.name,
                username: account.username,
                password: decryptedPassword,
                details: account.details,
                last_updated: account.last_updated,
                logo_upload: account.logo_upload,
                logo_url: account.logo_url
            };
        });
        res.send({accounts: data});
    })
    .catch(err => {
        console.log(err);
    });;
});

//create account
app.post('/account', async (req, res) => {
    const cryptedPassword = encrypt(req.body.password);
    // console.log(decrypt(cryptoPassword));

    const newAccount = {
        user_id: 1,
        name: req.body.name,
        username: req.body.username,
        password_iv: cryptedPassword.iv,
        password_content: cryptedPassword.content,
        details: req.body.details || '',
        logo_upload: '',
        logo_url: '',
    };

    const db = dbService.getDbServiceInstance();

    const result = db.createAccount(newAccount);
    
    result.then(id => {
        res.send({id}); 
    })
    .catch(err => {
        console.log(err);
    });
});


app.patch('/account', (req, res) => {
    let encryptedPassword = '';
    if (req.body.isPasswordChanged) {
        encryptedPassword = encrypt(req.body.password)
    }
    
    const updatedAccount = {
        id: req.body.id,
        user_id: 1,
        name: req.body.name,
        username: req.body.username,
        password_iv: encryptedPassword.iv,
        password_content: encryptedPassword.content,
        details: req.body.details || '',
        logo_upload: '',
        logo_url: '',
        last_updated: req.body.last_updated,
        isPasswordChanged: req.body.isPasswordChanged
    };

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
app.delete('/account/:id', (req, res) => {
    const id = req.params.id;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteAccount(id);
    result.then(data => {
        res.json({data});
    });
}); 


//live chat

io.on('connection', socket => {
    console.log('socket-connected');

    socket.on('sendMessage', msg => {
        console.log(msg);
    });

    socket.on("disconnect", () => {
        console.log("socket disconnected")
    });
});



server.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("App listening on localhost :", process.env.PORT);
});