const url = require("config").get("db.bimed.test.atlas");
const { connect } = require("./utils");

const db = async () => {
  await connect({ url, db: "'bimed test' atlas" });
};

module.exports = db;
