const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('noogger').init(config.get('loggerParams'));
const router = require('./api/router');
const container = require('./di');
const applyMiddleware = require('./middlewares');
const errorMiddleware = require('./middlewares/error');

const apiRouter = router(container.resolve('controllersMap'), logger, container);
const authenticationManager = container.resolve('authenticationManager');
const app = express();
app.set('logger', logger);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(config.get('session')));
authenticationManager.configure(app);

applyMiddleware(app);
app.use('/api/v1', apiRouter);

app.use(errorMiddleware); // Don't add any middleware after this. (only if you know all implications)

app.listen(config.appSettings.port, async () => {
  const dbContext = container.resolve('dbContext');
  await dbContext.establishConnection();
logger.info(`Application is listening on port ${config.appSettings.port}`);
logger.info(`Environment: ${process.env.NODE_ENV}`);
});
