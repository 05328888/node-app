const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");

// DB config
const db = require("./config/keys").mongoURL;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extend:false}))
app.use(bodyParser.json());


// Connent to mongodb
mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("MongooDB Connected"))
        .catch(err => console.log(err))



// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// 使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

const port = process.env.POST || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})