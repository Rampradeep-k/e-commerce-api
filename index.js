import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';

import corsFactory from './src/middlewares/cors-middleware.js';
import bodyParsing from './src/middlewares/parsing-middleware.js';
import routeHandler from './src/routes/index.js';
import { globalErrorHandler } from './src/middlewares/error.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';


const app = express();
const port = 3001;

app.use(corsFactory());
app.use(helmet());
app.use(bodyParsing());

app.use('/', routeHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});``