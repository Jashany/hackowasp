import express from 'express';
import ConnectDB from './DB/index.js';
import dotenv from 'dotenv';
import router from './router/user.router.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




ConnectDB().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
});
app.use('/api/users', router);