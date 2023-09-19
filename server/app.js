const express = require("express");
const helmet = require("helmet")
require("dotenv").config();
var cors = require("cors");

const db = require("./database/models/index.js");

db.sequelize.sync().then(async n => {
    await db.user.findOrCreate({
        where: {
            email: process.env.ADMIN_EMAIL,
        },
        defaults: {
            name: process.env.ADMIN_NAME,
            password: process.env.ADMIN_PASSWORD,
            role: process.env.ADMIN_ROLE,
        }
    });
    console.log("--------BAZA KREIRANA------------");
}).catch(
    (err) => {
        console.log(err);
    }
);

const app = express();
app.use(helmet());
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.get("/", async (req, res) => {
    res.send("App is Running");
});

module.exports = app;