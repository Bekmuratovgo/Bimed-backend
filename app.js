/**************************************************************
  This is the entry point to the 'bimed' app backend server.
**************************************************************/

(async function() {
  "use strict";
  const { server } = require("./server");
  const minio = require("config").get("minio");
  const integrate1C = require("./private/1c-integration");
  const port = require("config").get("port") || process.env.PORT;
  const bucketName = minio[minio.mode].bucket.buckets.bimed.name;
  const { cleanOTPCollection, winLogger, clearBucket } = require("./lib");

  try {
    class App {
      /**********************************************
        init(p: port<integer>) :: initialize the app
      ***********************************************/
      init(p) {
        winLogger.info(`initializing app ...`);
        server.init(p);
      }

      /*********************************
        workers() :: start app workers
      **********************************/
      workers() {
        winLogger.info(`starting app workers ...`);
        try {
          /*****************************************************************
            // TODO:
              1. worker that runs every 5 miutes to clean OTP collection
                 of expired codes and empty documents (to be completed)
          *****************************************************************/
          // cleanOTPCollection();
        } catch (error) {
          winLogger.error(`WORKERS ERROR: [ ${error.message} ]`);
          throw new Error(`WORKERS ERROR: [ ${error.message} ]`);
        }
      }

      /****************************************************
        connections() :: establish 3rd-party connections
      ****************************************************/
      connections() {
        winLogger.info(`establishing app 3rd-party connections ...`);
        try {
          /*****************************************************************
            // TODO:
              1. worker that runs every 5 miutes to clean OTP collection
                 of expired codes and empty documents (to be completed)
          *****************************************************************/
        } catch (error) {
          winLogger.error(`CONNECTIONS ERROR: [ ${error.message} ]`);
          throw new Error(`CONNECTIONS ERROR: [ ${error.message} ]`);
        }
      }
    }

    /****************************************************************
      - the App is using a class so that multiple instances can
        run symultaeously when needed.
      - the (port) is also passed to the server from the App for
        customization an debugging/testing/development purposes
    *****************************************************************/

    // ATTENTION: this creates a new instance of the app everytime it runs
    const app = new App();
    app.init(port);
    app.connections();
    app.workers();

    /****************************************************************
    // uncomment the following line to load data
       from one_C into the database and upload files
       to the bucket.

    // TODO:
        - cash and examine the new file to compare it with the
          previous integration to process and add the new items only
    *****************************************************************/

    // run for the first time only
    // await integrate1C();

    //run automatically every 24 hours
    const day = 1000 * 60 * 60 * 24;
    setInterval(async () => {
      const now = new Date().toLocaleString();
      winLogger.error(`1C:INTEGRATION:DIALY CYCLE: ${now}`);
      await integrate1C();
    }, day);

    // to clear the bucket uncomment the following line
    // await clearBucket({ bucketName });
  } catch (error) {
    winLogger.error(`APP ERROR: ${error.message}`);
    console.log("APP ERROR: ", error.message);
  }
})();
