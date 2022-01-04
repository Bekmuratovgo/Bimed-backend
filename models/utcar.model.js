/********************************
  UTCAR Model
********************************/

const fs = require("fs");
const path = require("path");
const { errorHandler, uploadFile } = require("../lib");

const { UTCARCollection } = require("../collections");
const BaseModel = require("./base.model");

const collection = UTCARCollection;

class UTCAR extends BaseModel {
  constructor() {}

  /********************************
    create utcar
  ********************************/

  static async create(req) {
    try {
      // 0. file valiations
      if (!req.file) throw new errorHandler(400, "upload your license");

      const props = [
        "fieldname",
        "originalname",
        "encoding",
        "mimetype",
        "destination",
        "filename",
        "path",
        "size"
      ];

      // all props exist ?
      props.forEach((prop, i) => {
        if (!Object.keys(req.file).includes(prop)) {
          throw new errorHandler(400, "upload a proper license file");
        }
      });

      //  no empty props ?
      Object.keys(req.file).forEach((k, i) => {
        if (!req.file[k]) {
          throw new errorHandler(400, "upload a proper license file");
        }
      });

      // 1.  upload the file
      const uploadedFile = await uploadFile(req);
      // get the data of the file and set it on the body object

      // 2. remove the uploaded photo from the server
      const filePath = req.file.path;
      const src = path.resolve(__dirname, "..", `${filePath}`);
      await fs.unlinkSync(src);

      // 3. append uploded file's info to the request body object
      req.body.license = { ...req.file, ...uploadedFile };

      // 4. save in the database
      const utcar = await super.create({
        item: {
          ...req.body
        },
        collection
      });

      return utcar;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    get utcar by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (e) {
      throw new errorHandler(404, `a utcar with the id: ${id} is NOT found`);
    }
  }

  /********************************
    get matching utcars
  ********************************/

  static async get(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      license = undefined,

      sortBy = undefined
    } = query;

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = ["name", "phone", "license"];
    filterOptions.forEach(filterOption => {
      if (query[filterOption]) filter[filterOption] = query[filterOption];
    });
    // / /  / / / //  / /////
    const restricted = "";
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort
    };
    // / /  / / / //  / /////
    const utcars = await super.findMany({
      filter,
      restricted,
      options,
      collection
    });
    if (!utcars) {
      throw new errorHandler(500, "FETCH selected utcars => Failed");
    } else if (!(utcars.length > 0)) {
      return [];
    }
    return utcars;
  }

  /********************************
    update utcar by id
  ********************************/

  static async updateById(req) {
    const {
      params: { id }
    } = req;

    // update utcar
    const utcar = await super.updateById({
      id,
      data: { ...req.body },
      collection
    });
    if (!utcar)
      throw new errorHandler(500, `UPDATE utcar with the id: ${id} => Failed`);

    return utcar;
  }

  /********************************
    delete utcar by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(500, `DELETE utcar with the id: ${id} => Failed`);
    }
  }

  /********************************
    delete maching utcars
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      name = undefined,
      phone = undefined,
      license = undefined,
      sortBy = undefined
    } = query;

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = ["name", "phone", "license"];
    filterOptions.forEach(filterOption => {
      if (query[filterOption]) filter[filterOption] = query[filterOption];
    });
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort
    };
    // / /  / / / //  / /////
    const utcars = await super.deleteMany({
      filter,
      options,
      collection
    });
    if (!utcars) {
      throw new errorHandler(500, "DELETE selected utcars => Failed");
    } else if (!(utcars.length > 0)) {
      throw new errorHandler(404, "No utcars to delete");
    }

    return utcars;
  }

  //
}

module.exports = UTCAR;
