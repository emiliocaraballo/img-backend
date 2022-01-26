import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import {createConnection} from 'typeorm'
const app = express();
// puerto que va correr
app.set("port",process.env.PORT);
createConnection();    
// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.disable("x-powered-by");

const swaggerDocument: any = require('../swagger.json');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
import ContactRoute from './modules/orders/router';
app.use('/api/order', ContactRoute);

import TechnicalRoute from './modules/technical/router';
app.use('/api/technical', TechnicalRoute);

import ServiceRoute from './modules/service/router';
app.use('/api/service', ServiceRoute);

import UserRoute from './modules/user/router';
app.use('/api/user', UserRoute);

export default app;