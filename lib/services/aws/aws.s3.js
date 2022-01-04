const fs = require("fs");
const Minio = require("minio");
const { Duplex, Readable } = require("stream");
const minio = require("config").get("minio");

const { errorHandler } = require("../../handlers");
const { winLogger } = require("../../loggers");

const {
  url,
  port,
  ssl,
  keys,
  buckets: { bimed }
} = minio[minio.mode].bucket;
// to use production config, change 'test' to 'production'

const conn = {
  endPoint: url,
  port: port,
  useSSL: ssl,
  accessKey: keys.access,
  secretKey: keys.secret
};
if (!port || port == null) delete conn.port;

const minioClient = new Minio.Client(conn);

const bucket = bimed.name;
// const bucket = "bimed-media";

/****************
  uploadFile
****************/

const uploadFile = async req => {
  try {
    winLogger.info("MINIO:BUCKET:UPLOAD: 'uploading file'");
    const {
      file: { size, path, filename }
    } = req;
    const stream = fs.createReadStream(path);
    const uploadedFile = await minioClient.putObject(
      bucket,
      filename,
      stream,
      size
    );
    if (!uploadedFile.etag || !uploadedFile.versionId) {
      winLogger.error(
        `MINIO:BUCKET:UPLOAD: failed to upload file ${req.file.filename}`
      );
      throw new errorHandler(500, `failed to upload file ${req.file.filename}`);
    }
    winLogger.info(
      `MINIO:BUCKET:UPLOAD: uploaded ${req.file.filename} successfully`
    );
    return uploadedFile;
  } catch (error) {
    winLogger.error(`MINIO:BUCKET:UPLOAD:ERROR: ${error.message}`);
    throw new errorHandler(500, `MINIO:BUCKET:UPLOAD:ERROR: ${error.message}`);
  }
};

/****************
  downloadFile
****************/

const downloadFile = async ({ req, res, filename }) => {
  try {
    winLogger.info("MINIO:BUCKET:DOWNLOAD: 'downloading file'");
    const stream = await minioClient.getObject(bucket, filename);
    stream.pipe(res);
    winLogger.info(
      `MINIO:BUCKET:DOWNLOAD: downloaded ${filename} successfully`
    );
  } catch (error) {
    winLogger.error(`MINIO:BUCKET:DOWNLOAD:ERROR: ${error.message}`);
    throw new errorHandler(
      500,
      `MINIO:BUCKET:DOWNLOAD:ERROR: ${error.message}`
    );
  }
};

/****************
  deleteFile
****************/

const deleteFile = async ({ req, filename }) => {
  try {
    winLogger.info("MINIO:BUCKET:DELETE: 'deleting file'");
    await minioClient.removeObject(bucket, filename);
    winLogger.info(`MINIO:BUCKET:DELETE: deleted ${filename} successfully`);
    return;
  } catch (error) {
    winLogger.error(`MINIO:BUCKET:DELETE:ERROR: ${error.message}`);
    throw new errorHandler(500, `MINIO:BUCKET:DELETE:ERROR: ${error.message}`);
  }
};

/****************
  clearBucket
****************/

const clearBucket = async ({ bucketName }) => {
  var objectsList = [];

  // List all object paths in bucket my-bucketname.
  var objectsStream = minioClient.listObjects(bucketName, "", true);

  objectsStream.on("data", function(obj) {
    objectsList.push(obj.name);
  });

  objectsStream.on("error", function(e) {
    console.log(e);
  });

  objectsStream.on("end", function() {
    minioClient.removeObjects(bucketName, objectsList, function(e) {
      if (e) {
        return console.log("Unable to remove Objects ", e);
      }
      console.log(
        `Removed the objects from bucket '${bucketName}' successfully`
      );
    });
  });
};

module.exports = {
  downloadFile,
  minioClient,
  clearBucket,
  deleteFile,
  uploadFile
};
