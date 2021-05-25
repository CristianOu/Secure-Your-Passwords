const express = require('express');
const dbService = require('./database');
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')));


const mainPage = fs.readFileSync(__dirname + "/public/main-page/main-page.html", "utf-8");
const sideBar = fs.readFileSync(__dirname + "/public/side-bar/side-bar.html", "utf-8");

app.get('/', (req, res) => {
    res.send(sideBar + mainPage);
}); 


// read
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