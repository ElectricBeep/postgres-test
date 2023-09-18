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

// const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const companyRoutes = require("./routes/companyRoutes");
// const businessUnitRoutes = require("./routes/businessUnitRoutes");
// const productRoutes = require("./routes/productRoutes");
// const suppliesRoutes = require("./routes/suppliesRoutes");
// const ratingBURoutes = require("./routes/ratingBURoutes");
// const ratingProductRoutes = require("./routes/ratingProductRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const versionRoutes = require("./routes/versionRoutes");
// const homeNotificationRoutes = require("./routes/homeNotificationRoutes.js");

// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/companies", companyRoutes);
// app.use("/api/businessUnit", businessUnitRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/supplies", suppliesRoutes);
// app.use("/api/ratingBU", ratingBURoutes);
// app.use("/api/ratingProduct", ratingProductRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/notification", notificationRoutes);
// app.use("/api/version", versionRoutes);
// app.use("/api/home-notification", homeNotificationRoutes);

module.exports = app;