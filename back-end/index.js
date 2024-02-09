const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const database = require('./src/conn_mysql.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

app.get("/", (req,res) =>{
    database.ping((error) => {
        if (error) {
            res.send("Server is down !!! : ", error);
        } else {
            res.send("Server is connected")
        }
    }
    )
})

const userRouter = require('./src/routes/userRoutes.js');
app.use("/api" , userRouter);

const busRouter = require("./src/routes/busRoutes.js");
app.use("/api", busRouter);

const bookingRouter = require ("./src/routes/bookingRoutes.js");
app.use("/api", bookingRouter);

const busRouteRouter = require("./src/routes/busRouteRouter.js");
app.use("/api", busRouteRouter)
