import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from 'path' ;

dotenv.config();

const __dirname = path.resolve();

const app = Express();

app.use(Express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
});

app.use(Express.json());

app.use(cookieParser());  


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Could not connect to MongoDB");
  });

app.listen(80, () => {
  console.log("Server is running on port 80");
});



app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);



app.use ((err, req,res,next) => {
  const stateCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(stateCode).json({
    success : true,
    message,
    stateCode,
  })
})