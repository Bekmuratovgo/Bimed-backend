const url = require("config").get("db.bimed.production.atlas");
const { connect } = require("./utils");

const db = async () => {
  await connect({ url, db: "'bimed production' atlas" });
};

module.exports = db;
