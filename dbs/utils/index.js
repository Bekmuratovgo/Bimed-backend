const mongoose = require("mongoose");
const consola = require("consola");
const { winLogger } = require("../../lib");

module.exports = {
  connect: async ({ url, db }) => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        keepAlive: true
      });
      consola.ready({
        message: `successfully connected to ${db} mongodb`,
        badge: true
      });
      winLogger.info(`successfully connected to ${db} mongodb`);
    } catch (error) {
      consola.error({
        message: `${db} mongodb connection error: [ ${error} ]`,
        badge: true
      });
      winLogger.error(`${db} mongodb connection error: [ ${error} ]`);
    }
  }
};
