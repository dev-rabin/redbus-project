const database = require("../conn_mysql");
const busController = {
    createBus : (req, res) => {
        const {busName , origin, destination, totalSeats, scheduleTime} = req.body;
        const query = "insert into bus (busName, origin, destination, totalSeats, scheduleTime) values (?,?,?,?,?)"
        database.query(query, [busName, origin, destination, totalSeats, scheduleTime], (error , result) => {
            if (error) {
                res.json({success: false , message : "Bus not created :", error});
                console.error("create bus error :",error);
            } else {
                res.json({success:true, message : "Bus is ready for Tour",id: result.insertId });
                console.log(result);
            }
        });
    },
    getBuses : (req, res) => {
        const {origin , destination, scheduleTime } = req.query;
        const query = "select * from bus where origin = ? AND destination = ? AND scheduleTime = ?";
        database.query(query,[origin,destination,scheduleTime], (error, result) => {
            if (error) {
                res.json({success : false, message : error});
                console.error("get buses error :",error);
            }
            if (result.length ===0) {
                res.json({success : false , message : "No bus for this route Sorry!"});
            }
             else {
                const busData = result;
                res.json({success : true, message : "Your buses are here !", busdata: busData});
                console.log(busData);
            }
        });
    }
}

module.exports = busController;