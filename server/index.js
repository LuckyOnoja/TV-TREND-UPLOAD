const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const GestureModel = require("./models/gesture");

app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// app.get("/pageData", async (req, res) => {
//   try {
//     const traktResponse = await axios.get(
//       "https://api.trakt.tv/movies/popular",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "trakt-api-version": "2",
//           "trakt-api-key":
//             "e95b81a5d566ca3ed2b93295c37480071726d92eb8086bbd3888e572e7b392e5",
//         },
//       }
//     );

//     res.json(traktResponse.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.post("/gestures", async (req, res) => {
  const detailid = req.query.id;
  const present = GestureModel.find(detailid);
  if (present !== true) {
    const { _id, love, like, dislike } = req.body;

    GestureModel.findByIdAndUpdate(
      detailid,
      { _id, love, like, dislike },
      { upsert: true, new: true }
    )
      .then((gestures) => res.json(gestures))
      .catch((error) => res.json(error));
  } else {
    GestureModel.create(req.body)
      .then((gestures) => res.json(gestures))
      .catch((error) => res.json(error));
  }
});

app.get("/getGestures", async (req, res) => {
  try {
    const gestureId = req.query.id;
    const item = await GestureModel.findById(gestureId);
    if (!item) {
      return;
      res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

app.listen(3001, () => {
  console.log("server is on");
});
