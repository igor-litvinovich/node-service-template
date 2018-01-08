const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('noogger').init(config.get('loggerParams'));
const router = require('./api/router');
const applyMiddlewares = require('./middlewares');

const SampleService = require('./services/sample');
const SampleController = require('./api/controllers/sample');

let app = express();
app.set('logger', logger);
applyMiddlewares(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const sampleService = new SampleService(logger);
const sampleController = new SampleController(sampleService);
const controllersMap = {sampleController};

app.use('/api/v1',  router(controllersMap, logger));


app.listen(config.appSettings.port, () => logger.info(`Application is listening on port ${config.appSettings.port}`));
