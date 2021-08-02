import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//routers
import userRoute from './routes/userRoute';
import upload from './routes/upload';
import productRouter from './routes/productRouter';
import newRouter from './routes/newRouter';
import serviceRouter from './routes/serviceRouter';
import feedbackRouter from './routes/feedbackRouter';
import servicePackage from './routes/servicePackageRouter';

//DOT ENV
dotenv.config();
//Connect with Db
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

//Express
const app = express();



app.use((req, res, next) => {
    console.log(req.headers);
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  
    res.setHeader("Access-Control-Allow-Credentials", true);
    
  
    if (req.headers.origin) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
    // console.log("-----req.headers.origin----", req.headers.origin)
    // console.log("res._headers -----------" + JSON.stringify(res._headers));
    
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    console.log("abc");
    next();
});

app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use("/api/users", userRoute);
app.use("/api/file", upload);
app.use("/api/products", productRouter);
app.use("/api/news", newRouter);
app.use("/api/services", serviceRouter);
app.use("/api/feedbacks", feedbackRouter);
app.use("/api/servicePackages", servicePackage);



app.listen(6969, () => {
    console.log("Server start at port: localhost:6969");
});