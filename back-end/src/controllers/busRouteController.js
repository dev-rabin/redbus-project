const database = require("../conn_mysql");

const busRouteController = {

    createRoute : (req, res) => {
        const {routeName , start, end} = req.body;
        const query = "insert into routes (routeName , start, end) values (?,?,?)";
        database.query(query,[routeName , start, end], (error, result) => {
            if (error) {
                res.json({success : false , message : error});
                console.error("create route error : ", error);
            }
            else {
                res.json({success:true, message : "Bus route created succesfully !", id: result.insertId});
                console.log("create route result :", result);
            }
        })
    }

}

module.exports = busRouteController;