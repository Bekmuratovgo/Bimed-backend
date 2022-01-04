/********************************
  uploaders
********************************/
const { winLogger } = require("../../../loggers");

const uploaders = {
  user: {
    photo: require("./user.photo.uploader"),
    license: require("./user.license.uploader")
  }
};

module.exports = path => {
  try {
    const props = path.split(".");
    let selectedUploader = uploaders;
    props.forEach((prop, i) => {
      selectedUploader = selectedUploader[prop];
    });
    return selectedUploader;
  } catch (error) {
    winLogger.error(
      `UPLOADER:ERROR: error in selecting the correct uploader:  ${error.message}`
    );
    throw new Error(`uploader error: ${error.message}`);
  }
};
