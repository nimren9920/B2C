import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";

const app = express();
app.use(express.json());
const url ="mongodb+srv://taruneluri2106:taruneluri2106@familyproject.cjppytp.mongodb.net/B2C?retryWrites=true&w=majority&appName=FamilyProject";
app.use("/user",router)

mongoose.connect(url)
  .then(() => {
    app.listen(5000);
  })
  .then(console.log("DataBase Connected and Connected to PORT 5000"))
  .catch((err) => console.log(err));
