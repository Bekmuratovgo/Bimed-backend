/****************
  utils
****************/

const fs = require("fs");
const path = require("path");
const download = require("download");
const { v4: uuidv4 } = require("uuid");
const minio = require("config").get("minio");
const { winLogger, minioClient, errorHandler } = require("../../lib");

// change 'test' to 'production' for production mode
const bucket = minio[minio.mode].bucket.buckets.bimed.name;

/****************
  downloadFile
****************/

const serverDownloadFile = async data => {
  /****************************************************************

  // download the file from the server
  // rename the downloaded file and add timestamp
  // save the downloaded file locally
  // read and extract the info of the downloaded file
  // return the details/info of the downloaded file

  ****************************************************************/
  try {
    winLogger.info(
      `1C:INTEGRATION::SERVER:DOWNLOAD: 'downloading file...' url: ${data.url}`
    );
    const { url, id } = data;

    // download the file from the server
    const content = await download(url); // type: buffer

    // rename the downloaded file and add timestamp
    const oldFileName = path.basename(url);
    const extension = path.extname(oldFileName);
    const newFileName = `${Date.now()}-xid:${id}-${uuidv4()}${extension}`;
    const newFilePath = `downloads/${newFileName}`;
    const basePath = path.resolve(__dirname, "..", "..", "downloads");

    // create directory if it doesn't exist
    const basePathExists = await fs.existsSync(basePath);
    if (!basePathExists) await fs.mkdirSync(basePath);

    // save the downloaded file locally
    const savedFile = await fs.writeFileSync(newFilePath, content);

    // get detailed info of the downloaded file
    const stat = fs.statSync(path.resolve(__dirname, "..", "..", newFilePath));

    // return the details/info of the downloaded file

    winLogger.info(
      `1C:INTEGRATION::SERVER:DOWNLOAD: downloaded ${newFileName} successfully`
    );
    return {
      x_1C: { id, url, filename: oldFileName },
      bucket: {
        filename: newFileName,
        path: newFilePath,
        size: stat.size,
        blocks: stat.blocks,
        blksize: stat.blksize
      }
    };
  } catch (error) {
    winLogger.error(`1C:INTEGRATION::SERVER:DOWNLOAD:ERROR: ${error.message}`);
    throw new errorHandler(
      500,
      `1C:INTEGRATION::SERVER:DOWNLOAD:ERROR: ${error.message}`
    );
  }
};

/****************
  uploadFile
****************/

const bucketUploadFile = async data => {
  try {
    winLogger.info(
      `1C:INTEGRATION::MINIO:BUCKET:UPLOAD: 'uploading file...' filename: ${data.bucket.filename}`
    );
    const {
      bucket: { size, path: filePath, filename }
    } = data;
    // console.log("path ....", path);
    const filePathb = path.resolve(__dirname, "..", "..", filePath);
    const stream = fs.createReadStream(filePathb);
    const uploadedFile = await minioClient.putObject(
      bucket,
      filename,
      stream,
      size
    );
    if (!uploadedFile.etag || !uploadedFile.versionId) {
      winLogger.error(
        `1C:INTEGRATION::MINIO:BUCKET:UPLOAD: failed to upload file ${filename}`
      );
      throw new errorHandler(500, `failed to upload file ${filename}`);
    }
    winLogger.info(
      `1C:INTEGRATION::MINIO:BUCKET:UPLOAD: uploaded ${filename} successfully`
    );
    return { ...data, bucket: { ...data.bucket, ...uploadedFile } };
  } catch (error) {
    winLogger.error(
      `1C:INTEGRATION::MINIO:BUCKET:UPLOAD:ERROR: ${error.message}`
    );
    throw new errorHandler(
      500,
      `1C:INTEGRATION::MINIO:BUCKET:UPLOAD:ERROR: ${error.message}`
    );
  }
};

/****************
  deleteFile
****************/

const localDeleteFile = async data => {
  try {
    const {
      bucket: { filename, path: filePath }
    } = data;
    winLogger.info(
      `1C:INTEGRATION::LOCAL:DELETE: 'deleting file...' filepath: ${filePath}`
    );
    const src = path.resolve(__dirname, "..", "..", `${filePath}`);
    await fs.unlinkSync(src);
    winLogger.info(
      `1C:INTEGRATION::LOCAL:DELETE: deleted ${filename} successfully`
    );
    return;
  } catch (error) {
    winLogger.error(`1C:INTEGRATION::LOCAL:DELETE:ERROR: ${error.message}`);
    throw new errorHandler(
      500,
      `1C:INTEGRATION::LOCAL:DELETE:ERROR: ${error.message}`
    );
  }
};

const saveToFile = async ({ filename, data }) => {
  try {
    /************************************************************
      // TODO: read and compare data before saving to file

      now the old file gets overwritten by the new file data
    ************************************************************/
    winLogger.info(`1C:INTEGRATION: saving data to local file '${filename}'`);
    await fs.writeFileSync(
      path.resolve(__dirname, "..", "..", "..", "1C", filename),
      JSON.stringify(data)
    );
    winLogger.info(`1C:INTEGRATION: successfully saved '/1C/${filename}'`);
  } catch (e) {
    winLogger.error(
      `1C:INTEGRATION:ERROR: saving file '${filename}' : ${error.message}`
    );
    throw new errorHandler(
      500,
      `1C:INTEGRATION:ERROR: saving file '${filename}' : ${error.message}`
    );
  }
};

// naming is based on file's final destination
// { 'upload to' , 'download from', 'delete from' }

module.exports = {
  local: {
    delete: localDeleteFile
  },
  bucket: {
    upload: bucketUploadFile
  },
  server: {
    download: serverDownloadFile
  },
  saveToFile
};
