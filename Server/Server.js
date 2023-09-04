
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import Graph1Route from './routes/graph1.js';
import Graph2Route from './routes/graph2.js';
import Graph3Route from './routes/graph3.js';
import Graph4Route from './routes/graph4.js';
import FilterRoute from './routes/filter.js';
import DropdownRoute from './routes/dropdown.js';
import SmallBoxesRoute from './routes/smallBoxes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

app.use('/graph1', Graph1Route);
app.use('/graph2', Graph2Route);
app.use('/graph3', Graph3Route);
app.use('/graph4', Graph4Route);
app.use('/filter', FilterRoute);
app.use('/dropdown', DropdownRoute);
app.use('/smallBoxes', SmallBoxesRoute);

const PORT = process.env.PORT || 1337;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () =>
			console.log(`MongoDB is running... Server is running on: http://localhost:${PORT}`)
		);
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
    


