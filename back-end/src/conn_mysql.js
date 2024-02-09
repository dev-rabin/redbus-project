const mysql = require('mysql');

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "redbus"
});

//Database Connection 

database.connect((error)=> {
    if (error) {
        console.error("Database connection failed !!! :",error);
    } else {
        console.log("Connected to database successfully.");
    }
})

module.exports = database;