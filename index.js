const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('noogger').init(config.get('loggerParams'));
const router = require('./api/router');
const applyMiddleware = require('./middlewares');
const registerDependencies = require('./di');

const container = registerDependencies();
const apiRouter = router(container.resolve('controllersMap'), logger);
const app = express();
app.set('logger', logger);
applyMiddleware(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', apiRouter);

app.listen(config.appSettings.port, () => logger.info(`Application is listening on port ${config.appSettings.port}`));
