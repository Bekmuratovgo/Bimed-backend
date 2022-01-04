const url = require("config").get("db.bimed.test.local");
const { connect } = require("./utils");

const db = async () => {
  await connect({ url, db: "'bimed test' local" });
};

module.exports = db;
