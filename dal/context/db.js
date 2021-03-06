const config = require('config');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

class DbContext {
  constructor({ logger }) {
    this.database = mongoose;
    this.logger = logger;
  }

  async establishConnection() {
    try {
      this._init();
      this._attachListeners();
      await this._connect();
    } catch (error) {
      this.logger.error(`Error while establishing db connection. ${error.message}`);
    }
  }

  disconnect() {
    try {
      this.database.disconnect();
      this.logger.info('MongoDB has been disconnected manually.');
    } catch (error) {
      this.logger.error(`Error while disconnecting. ${error.message}`);
    }
  }

  _init() {
    this.database.Promise = Promise;
    this.database.plugin(mongoosePaginate);
  }

  _attachListeners() {
    const { connection } = this.database;

    connection.on('connecting', () => {
      this.logger.info('Connecting to MongoDB...');
    });

    connection.on('error', (err) => {
      this.logger.error(`MongoDB connection error: ${err}`);
      mongoose.disconnect();
    });

    connection.on('connected', () => {
      this.logger.info('Connected to MongoDB!');
    });

    connection.once('open', () => {
      this.logger.info('MongoDB connection opened!');
    });

    connection.on('reconnected', () => {
      this.logger.info('MongoDB reconnected!');
    });
    const reconnectTimeout = config.get('db.TIMEOUT');
    connection.on('disconnected', () => {
      this.logger.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
      setTimeout(() => this._connect(), reconnectTimeout);
    });
  }

  _connect() {
    const uri = this._getMongoDbUri();
    return this.database.connect(uri, { useNewUrlParser: true }).catch((error) => {
      this.logger.error(`MongoDB connection error: ${error.message}`);
    });
  }

  _getMongoDbUri() {
    const {
      PASSWORD: password, USER_NAME: userName, HOST: host, PORT: port, NAME: name,
    } = config.get('db');
    let uri = `mongodb://${userName}:${password}@${host}:${port}/${name}`;
    if (!password && !userName) {
      uri = `mongodb://${host}:${port}/${name}`;
    }
    return uri;
  }
}

module.exports = DbContext;
