import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser"
// import cors from 'cors'
import mongoose from 'mongoose'
import initWebRouters from './routers/web.js'

let app = express();
const port = process.env.PORT || 5000;

const uri = process.env.URI_DB
app.use(express.static('uploads'))
app.use(bodyParser.json({ limi: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
// app.use(cors());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

initWebRouters(app)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB successfully')
        app.listen(port, () => {
            console.log(('Server listening on the port : ', port))
        })
    }).catch(e => console.log('err', e))