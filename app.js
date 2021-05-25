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

// UI Calls
app.get('/', (req, res) => {
    res.send(header + sideBar + mainPage + footer);
}); 


// API Calls
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getAllData();
    result.then(data => {
        res.json({data: data});
    });
});



const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("App listening on localhost :", server.address().port);
});