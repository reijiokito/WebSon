import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//routers
import userRoute from './routes/userRoute';
import upload from './routes/upload';
import productRouter from './routes/productRouter';
import newRouter from './routes/newRouter';
import serviceRouter from './routes/serviceRouter';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();


app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin","*");
//     res.header(
//         "Access-Control-Allow-Heaers"
//     )
// });

app.use("/api/users", userRoute);
app.use("/api/file", upload);
app.use("/api/products", productRouter);
app.use("/api/news", newRouter);
app.use("/api/services", serviceRouter);



app.listen(6969, () => {
    console.log("Server start at port: localhost:6969");
});