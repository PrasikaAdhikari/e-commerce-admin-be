import express from "express";
import cors from "cors";
import { mongooseConnect, mongoConnect } from "./src/config/mongoConfig.js";

import config from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";

import userRouter from "./src/routes/userRouter.js";

import categoryRouter from "./src/routes/categoryRouter.js";

import productRouter from "./src/routes/productRouter.js";

import orderRouter from "./src/routes/orderRouter.js";

import customerRouter from "./src/routes/customerRouter.js";

import reviewRouter from "./src/routes/reviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static("assets/productImages"));

app.get("/", (req, res) => {
  res.send("I am alive");
});

// auth router
app.use("/api/v1/auth", authRouter);

// category router
app.use("/api/v1/category", categoryRouter);

//product router
app.use("/api/v1/products", productRouter);

//user router
app.use("/api/v1/user", userRouter);

//order router
app.use("/api/v1/orders", orderRouter);

//customer router
app.use("/api/v1/customer", customerRouter);

// reviews router
app.use("/api/v1/reviews", reviewRouter);

mongooseConnect()
  .then(() => mongoConnect())
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log("SERVER COULD NOT START");
      } else {
        console.log("Server started at port", config.port);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });

// mongooseConnect()
//   .then(() => {
//     app.listen(config.port, () => {
//       console.log(`✅ Server started on port ${config.port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MONGO DB CONNECTION ERROR:", err.message);
//   });
