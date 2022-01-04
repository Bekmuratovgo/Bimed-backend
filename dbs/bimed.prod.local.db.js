const url = require("config").get("db.bimed.production.local");
const { connect } = require("./utils");

const db = async () => {
  await connect({ url, db: "'bimed production' local" });
};

module.exports = db;
