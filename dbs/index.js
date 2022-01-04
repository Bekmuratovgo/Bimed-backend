/********************************

  Databases connections:
  -

  List of databases (total count: 2):
  - bimed:
    - local
    - atlas

********************************/

const bimed = Object.freeze({
  production: {
    local: require("./bimed.prod.local.db"),
    atlas: require("./bimed.prod.atlas.db")
  },
  test: {
    local: require("./bimed.test.local.db"),
    atlas: require("./bimed.test.atlas.db")
  }
});

module.exports = { bimed };
